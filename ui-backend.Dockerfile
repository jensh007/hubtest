FROM docker.wdf.sap.corp:51505/securityapprovedbaseimages/golang:1.14.10-alpine3.12 as builder

WORKDIR /app

RUN apk add git --no-cache
RUN go get github.com/go-delve/delve/cmd/dlv

COPY go.mod go.sum ./
COPY pkg/ pkg/
COPY cmd/ui-backend/ ./cmd/ui-backend
COPY cmd/apprepository-controller/ cmd/apprepository-controller/

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GO111MODULE=on go build -a -o ui-backend cmd/ui-backend/main.go

FROM docker.wdf.sap.corp:51505/securityapprovedbaseimages/alpine:3.12.1
WORKDIR /app

# Create appuser
ENV USER=appuser
ENV UID=10001
ENV GID=23456
# See https://stackoverflow.com/a/55757473/12429735RUN
# and https://medium.com/@chemidy/create-the-smallest-and-secured-golang-docker-image-based-on-scratch-4752223b7324
RUN adduser \
--disabled-password \
--gecos "" \
--home "/nonexistent" \
--shell "/sbin/nologin" \
--no-create-home \
--uid "${UID}" \
"$USER"

COPY --from=builder app/ui-backend /
COPY --from=builder /go/bin/dlv /dlv

# Use an unprivileged user.
USER appuser:appuser

CMD ["/ui-backend"]