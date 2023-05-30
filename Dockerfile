FROM nginx:1.20.1-alpine
RUN mkdir -p /usr/share/nginx/html/model
COPY build/. /usr/share/nginx/html/model
RUN chown -R nginx:nginx /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
