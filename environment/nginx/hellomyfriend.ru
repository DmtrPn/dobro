upstream dobro_server {
    server                      127.0.0.1:3000;
    keepalive                   16;
}

server {
    listen       80;
    listen       443 ssl;
    server_name  hellomylove.ru www.hellomylove.ru;

    return 301 https://hellomyfriend.ru$request_uri;

    ssl_certificate /etc/letsencrypt/live/hellomylove.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hellomylove.ru/privkey.pem; # managed by Certbot
}

server {
    listen 80;

    server_name hellomyfriend.ru;

    return 301 https://$host$request_uri;
}

server {
    listen                      443 ssl;
    server_name                 hellomyfriend.ru;

    access_log                  /var/log/nginx/hellomyfriend.access.log combined;
    error_log                   /var/log/nginx/v.error.log warn;

    charset                     utf-8;
    client_max_body_size        100M;
    client_body_buffer_size     100M;

    gzip            on;
    gzip_types      text/plain text/css application/json application/x-javascript application/xml+rss text/javascript application/javascript;

    ssl_certificate /etc/letsencrypt/live/hellomyfriend.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/hellomyfriend.ru/privkey.pem; # managed by Certbot

    location /api/ {
        proxy_set_header        X-Real-IP $remote_addr;
        proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header        Host $http_host;
        proxy_set_header        X-NginX-Proxy true;

        proxy_pass              http://dobro_server;
        proxy_redirect          off;
    }

    location /static/ {
        add_header              Cache-Control no-cache;
        root                    /opt/dobro/public;
    }

    location / {
        add_header              Cache-Control no-store;
        root                    /opt/dobro/public;
        try_files               /index.html =404;
    }
}
