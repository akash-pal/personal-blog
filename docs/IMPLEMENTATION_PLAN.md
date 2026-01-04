# Implementation Plan - Automate Local Kubernetes Setup

The goal is to simplify the creation of the local Kubernetes cluster and the deployment of the `personal-blog` application, which currently requires running many manual commands.

## User Review Required

> [!IMPORTANT]
> The setup script will require your **GitHub Username** and a **Personal Access Token (PAT)** with `read:packages` (for GHCR) and `repo` (for git write-back) scopes. The script will prompt you for these securely.

## Proposed Changes

### Automation Scripts

#### [NEW] [scripts/setup-cluster.sh](scripts/setup-cluster.sh)
- A Bash script that performs the following steps:
    1.  Checks prerequisites (`kind`, `kubectl`).
    2.  Creates a Kind cluster using `k8s/kind-config.yaml`.
    3.  Installs Argo CD and waits for it to be ready.
    4.  Prompts for GitHub credentials and creates the `ghcr-creds` and `repo-creds` secrets in the `argocd` namespace.
    5.  Installs Argo CD Image Updater.
    6.  Applies `argocd-image-updater-cm.yaml` and `argocd-image-updater-registries-cm.yaml`.
    7.  Creates the `blog-frontend` namespace.
    8.  Applies `application.yaml`.
    9.  Prints final instructions (admin password command, port-forward command).

#### [NEW] [Makefile](Makefile)
- A generic Makefile to wrap the script for ease of use.
    - `make up`: Runs `scripts/setup-cluster.sh`.
    - `make down`: Runs `kind delete cluster`.
    - `make port-forward`: Runs the `kubectl port-forward` command for Argo CD.
    - `make password`: Prints the Argo CD admin password.

## Verification Plan

### Manual Verification
1.  Run `make up`.
2.  Provide GitHub credentials when prompted.
3.  Verify the cluster is created and Argo CD is running.
4.  Verify the application is syncing in Argo CD.
5.  Run `make down` to clean up.
