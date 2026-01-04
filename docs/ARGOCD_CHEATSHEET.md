# Argo CD Command Cheatsheet

This document provides a list of common and useful commands for managing and debugging Argo CD and the Argo CD Image Updater within this project.

## Connecting to Argo CD

Before running most `argocd` CLI commands, you need to log in to your Argo CD instance.

1.  **Get the Argo CD initial admin password:**

    ```bash
    kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode && echo
    ```

2.  **Port-forward to the Argo CD server:**

    ```bash
    kubectl port-forward svc/argocd-server -n argocd 8080:443
    ```

3.  **Login using the CLI:**

    ```bash
    argocd login localhost:8080 --username admin --password <your-password-from-step-1> --insecure
    ```

## Managing Applications

Commands to inspect and manage the `personal-blog` application.

*   **List all applications:**

    ```bash
    argocd app list
    ```

*   **Get detailed status of the application:**

    ```bash
    argocd app get personal-blog
    ```

*   **Manually trigger a sync:**

    ```bash
    argocd app sync personal-blog
    ```

*   **View sync history and deployed revisions:**

    ```bash
    argocd app history personal-blog
    ```

## Debugging and Logs

Checking logs is the first step when troubleshooting issues.

*   **Argo CD API Server logs:**

    ```bash
    kubectl logs -n argocd -l app.kubernetes.io/name=argocd-server
    ```

*   **Repository Server logs (for Git-related issues):**

    ```bash
    kubectl logs -n argocd -l app.kubernetes.io/name=argocd-repo-server
    ```

*   **Application Controller logs (for sync-related issues):**

    ```bash
    kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller
    ```

*   **Image Updater logs (for image checking and write-back issues):**

    This is the most important log for your image update workflow.

    ```bash
    # First, get the pod name
    kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-image-updater

    # Then, view the logs. Use -f to tail them in real-time.
    kubectl logs -f <image-updater-pod-name> -n argocd
    ```

## Managing Secrets

Correct secrets are crucial for authentication.

*   **Create secret for GitHub Container Registry (`ghcr.io`):**

    This is the fix for the "unauthorized" error you encountered. You need a GitHub Personal Access Token (PAT) with `read:packages` scope.

    ```bash
    # Replace <your-github-username> and <your-github-pat>
    kubectl create secret docker-registry ghcr-creds \
      --namespace=argocd \
      --docker-server=ghcr.io \
      --docker-username=<your-github-username> \
      --docker-password=<your-github-pat>
    ```

*   **Add Git repository credentials:**

    The Image Updater needs to push changes back to your Git repository. Argo CD needs credentials for this. You can add a repository and its credentials using the `argocd repo add` command, or by creating a secret manually.

    Example of creating a secret for a private repository:

    ```bash
    # Replace <your-github-username> and <your-github-pat>
    # The PAT needs `repo` scope for write-back
    kubectl create secret generic repo-creds -n argocd \
      --from-literal=type=git \
      --from-literal=url=https://github.com/akash-pal/personal-blog \
      --from-literal=username=<your-github-username> \
      --from-literal=password=<your-github-pat>
    ```
    Then you would label this secret so Argo CD can use it: `kubectl label secret repo-creds -n argocd "argocd.argoproj.io/secret-type=repository"`
