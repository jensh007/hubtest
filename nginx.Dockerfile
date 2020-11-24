FROM eu.gcr.io/sap-gcp-k8s-wm-live/securityapprovedbaseimages/alpine:3.12.0

# Install and run NGINX
RUN apk add --no-cache --update nginx \ 
    && rm /etc/nginx/conf.d/default.conf \ 
    && mkdir /run/nginx \
    && printf "\ndaemon off;" >> /etc/nginx/nginx.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# Needs to run as superuser
# server is executed as nginx user
# configured in /etc/nginx/nginx.config
CMD ["nginx"]