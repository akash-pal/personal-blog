I'd built a tiny demo app, CI to push images to GHCR, and deployed to my K3s cluster with ArgoCD.

Highlights:
- Built `app` (Node/Express) with a `Dockerfile`.
- GitHub Actions workflow builds and pushes images to `ghcr.io`.
- ArgoCD `Application` points to `k8s/app` manifests.
- Example `ClusterSecretStore` + `ClusterExternalSecret` show how Vault can provide secrets.

How it felt:
- There's a satisfying clarity owning the full pipeline — from code to cluster.
- More responsibility: you must operate Vault, ArgoCD, and K3s, but you get control and portability.

If you want, I can:
- Wire image tags through ArgoCD (ImageUpdater/Helm Kustomize).
- Add a simple Helm chart or Kustomize with image placeholders.
- Show exact commands to bootstrap External Secrets Operator + Vault auth.

Reference docker file
https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

Pushing from CLI
Personal access tokens (classic) - package:write permission scope
```
export CR_PAT=<token>
export IMAGE=personal-blog
export OWNER=akash-pal
export TAG=latest
docker build -t $IMAGE:$TAG -f Dockerfile .
docker tag $IMAGE:$TAG ghcr.io/$OWNER/$IMAGE:$TAG
echo $CR_PAT | docker login ghcr.io -u $OWNER --password-stdin
docker push ghcr.io/$OWNER/$IMAGE:$TAG
```