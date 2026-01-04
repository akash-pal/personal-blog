#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting local Kubernetes cluster setup...${NC}"

# Check prerequisites
if ! command -v kind &> /dev/null; then
    echo -e "${RED}Error: kind is not installed.${NC}"
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}Error: kubectl is not installed.${NC}"
    exit 1
fi

# Create Kind cluster
if kind get clusters | grep -q "kind"; then
    echo -e "${YELLOW}Cluster 'kind' already exists. Skipping creation.${NC}"
else
    echo -e "${BLUE}Creating Kind cluster...${NC}"
    kind create cluster --config k8s/kind-config.yaml
fi

# Install Argo CD
echo -e "${BLUE}Installing Argo CD...${NC}"
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for Argo CD to be ready
echo -e "${BLUE}Waiting for Argo CD to be ready (this may take a minute)...${NC}"
kubectl wait --for=condition=available deployment/argocd-server -n argocd --timeout=300s
kubectl wait --for=condition=available deployment/argocd-repo-server -n argocd --timeout=300s
kubectl rollout status statefulset/argocd-application-controller -n argocd --timeout=300s

# Setup Secrets
echo -e "${YELLOW}--- GitHub Credentials for Argo CD ---${NC}"
echo -e "${YELLOW}These are required for the Image Updater to pull images from GHCR and push changes back to Git.${NC}"
read -p "Enter GitHub Username: " GITHUB_USER
read -s -p "Enter GitHub Personal Access Token (PAT): " GITHUB_TOKEN
echo ""

if [ -n "$GITHUB_USER" ] && [ -n "$GITHUB_TOKEN" ]; then
    echo -e "${BLUE}Creating 'ghcr-creds' secret...${NC}"
    kubectl create secret docker-registry ghcr-creds \
      --namespace=argocd \
      --docker-server=ghcr.io \
      --docker-username="$GITHUB_USER" \
      --docker-password="$GITHUB_TOKEN" \
      --dry-run=client -o yaml | kubectl apply -f -

    echo -e "${BLUE}Creating 'repo-creds' secret...${NC}"
    kubectl create secret generic repo-creds -n argocd \
      --from-literal=type=git \
      --from-literal=url=https://github.com/akash-pal/personal-blog \
      --from-literal=username="$GITHUB_USER" \
      --from-literal=password="$GITHUB_TOKEN" \
      --dry-run=client -o yaml | kubectl apply -f -
    kubectl label secret repo-creds -n argocd "argocd.argoproj.io/secret-type=repository" --overwrite
else
    echo -e "${RED}Skipping secret creation. You will need to create 'ghcr-creds' and 'repo-creds' manually for the application to work.${NC}"
fi

# Install Argo CD Image Updater
echo -e "${BLUE}Installing Argo CD Image Updater...${NC}"
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/config/install.yaml

# Apply Configurations
echo -e "${BLUE}Applying Argo CD Image Updater configurations...${NC}"
kubectl apply -f argocd-image-updater-cm.yaml -n argocd
kubectl apply -f argocd-image-updater-registries-cm.yaml -n argocd
# Note: image-updater.yaml is a Custom Resource that might depend on the CRD being established.
# The install.yaml above installs the CRD.
kubectl apply -f image-updater.yaml

# Create Application Namespace
echo -e "${BLUE}Creating application namespace 'blog-frontend'...${NC}"
kubectl create namespace blog-frontend --dry-run=client -o yaml | kubectl apply -f -

# Apply Application
echo -e "${BLUE}Deploying 'personal-blog' application...${NC}"
kubectl apply -f application.yaml

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${BLUE}To get the initial admin password:${NC}"
echo "kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath=\"{.data.password}\" | base64 --decode && echo"
echo -e "${BLUE}To access the UI:${NC}"
echo "kubectl port-forward svc/argocd-server -n argocd 8080:443"
