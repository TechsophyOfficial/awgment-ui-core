#!/bin/sh
set -xe
# WEB_ROOT=/usr/share/nginx/html

mkdir $WEB_ROOT/model || true

rm -rf nginx.conf || true
cat >> nginx.conf << EOF
server {
  listen 80;
  root $WEB_ROOT;
  server_name $HOSTNAME;

 error_page  404             /model/index.html;

  location ~ ^/model/((?!(static|(.*\..*))).)+$ {
    root $WEB_ROOT/model;
    try_files /model/index.html =404;
  }
}
EOF

./env2Json.sh > $WEB_ROOT/model/config.json

nginx -c nginx.conf  -g "daemon off;"
