.PHONY: up down port-forward password

up:
	@echo "Setting up local Kubernetes cluster..."
	@./scripts/setup-cluster.sh

down:
	@echo "destroying local Kubernetes cluster..."
	@kind delete cluster

port-forward:
	@echo "Port forwarding Argo CD server to localhost:8080..."
	@kubectl port-forward svc/argocd-server -n argocd 8080:443

password:
	@echo "Argo CD Admin Password:"
	@kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode && echo
