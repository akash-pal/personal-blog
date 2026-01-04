# Kubernetes Cheatsheet: Namespace, Deployment, and Application

This document provides a list of common `kubectl` commands for creating and managing fundamental Kubernetes resources like Namespaces, Deployments, and Services.

---

## 1. Managing Namespaces

Namespaces are used in Kubernetes to divide cluster resources between multiple users.

*   **Create a namespace:**

    ```bash
    kubectl create namespace <namespace-name>
    ```
    *Example:*
    ```bash
    kubectl create namespace blog-frontend
    ```

*   **List all namespaces:**

    ```bash
    kubectl get namespaces
    ```

*   **Describe a namespace:**

    ```bash
    kubectl describe namespace <namespace-name>
    ```

*   **Delete a namespace:**

    **Warning:** This will delete all resources within the namespace.

    ```bash
    kubectl delete namespace <namespace-name>
    ```

---

## 2. Managing Deployments

A Deployment provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

Deployments are typically defined in YAML files.

*   **Example `deployment.yaml`:**

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: my-app-deployment
      labels:
        app: my-app
    spec:
      replicas: 2
      selector:
        matchLabels:
          app: my-app
      template:
        metadata:
          labels:
            app: my-app
        spec:
          containers:
          - name: my-app-container
            image: nginx:latest # Replace with your container image
            ports:
            - containerPort: 80
    ```

*   **Create or update a deployment from a YAML file:**

    The `apply` command is idempotent. It creates the resource if it doesn't exist, or updates it if it does.

    ```bash
    kubectl apply -f deployment.yaml --namespace <namespace-name>
    ```

*   **List all deployments in a namespace:**

    ```bash
    kubectl get deployments --namespace <namespace-name>
    ```

*   **Get detailed information about a deployment:**

    ```bash
    kubectl describe deployment <deployment-name> --namespace <namespace-name>
    ```

*   **Scale a deployment (change the number of replicas):**

    ```bash
    kubectl scale deployment <deployment-name> --replicas=3 --namespace <namespace-name>
    ```

*   **Delete a deployment:**

    ```bash
    # By name
    kubectl delete deployment <deployment-name> --namespace <namespace-name>

    # From the file that created it
    kubectl delete -f deployment.yaml --namespace <namespace-name>
    ```

---

## 3. Exposing Your Application with Services

A Service is an abstract way to expose an application running on a set of Pods as a network service.

*   **Example `service.yaml` (LoadBalancer):**

    This creates an external load balancer to expose your service to the internet.

    ```yaml
    apiVersion: v1
    kind: Service
    metadata:
      name: my-app-service
    spec:
      type: LoadBalancer
      selector:
        app: my-app # This must match the labels on your pods
      ports:
        - protocol: TCP
          port: 80 # Port on the load balancer
          targetPort: 80 # Port on the container
    ```

*   **Create or update a service:**

    ```bash
    kubectl apply -f service.yaml --namespace <namespace-name>
    ```

*   **List all services in a namespace:**

    ```bash
    kubectl get services --namespace <namespace-name>
    ```

*   **Delete a service:**

    ```bash
    kubectl delete service <service-name> --namespace <namespace-name>
    ```
---

## 4. Kubernetes "Applications"

In Kubernetes, an "application" isn't a single resource. It's a collection of resources working together, such as a `Deployment`, a `Service`, `ConfigMap`s, `Secret`s, etc.

While you can manage these resources manually with `kubectl`, modern GitOps workflows use tools like **Argo CD** to manage them as a single unit called an `Application`. The Argo CD `Application` custom resource points to your Git repository, and Argo CD automatically syncs all the manifests (your Deployment, Service, etc.) to the cluster.

For commands related to managing the Argo CD application itself (like syncing, checking history, and debugging), please refer to the `ARGOCD_CHEATSHEET.md` document.
