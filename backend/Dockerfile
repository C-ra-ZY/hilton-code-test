FROM node:latest
RUN mkdir /tmp/backend
ADD ./source.zip /tmp/backend
RUN cd /tmp/backend;unzip ./source.zip
RUN chmod 777 -R /tmp/backend
RUN cd /tmp/backend;npm i --registry https://registry.npm.taobao.org
EXPOSE 7001
CMD cd "/tmp/backend";npm run dev;
# ENTRYPOINT [ "bash" ]