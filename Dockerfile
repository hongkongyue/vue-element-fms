FROM registry.cn-hangzhou.aliyuncs.com/eptison/nginx-layui

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./dist/ /usr/share/nginx/html/

