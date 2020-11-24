FROM eu.gcr.io/sap-gcp-k8s-wm-live/securityapprovedbaseimages/alpine:3.12.0

RUN apk add --no-cache curl && curl -o /bin/kubectl -L https://storage.googleapis.com/kubernetes-release/release/v1.17.4/bin/linux/amd64/kubectl && chmod 744 /bin/kubectl