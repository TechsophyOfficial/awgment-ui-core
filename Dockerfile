FROM nginx:1.20.1-alpine
RUN rm -rf  /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/html
COPY build/. /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
COPY env2Json.sh .
COPY run.sh .

EXPOSE 80 443
CMD ["./run.sh"]

