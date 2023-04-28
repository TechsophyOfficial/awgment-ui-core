#!/bin/sh
set -xe
# WEB_ROOT=/usr/share/nginx/html

mkdir $WEB_ROOT || true

rm -rf nginx.conf || true
cat >> nginx.conf << EOF
server {
  listen 80;
  root $WEB_ROOT;
  server_name $HOSTNAME;

 error_page  404             /index.html;

  location ~ ^/((?!(static|(.*\..*))).)+$ {
    root $WEB_ROOT;
    try_files /index.html =404;
  }
}
EOF

./env2Json.sh > $WEB_ROOT/config.json

nginx -c nginx.conf  -g "daemon off;"
