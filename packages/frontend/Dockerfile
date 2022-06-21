FROM node:latest
ADD ./backend.zip /tmp/
RUN unzip /tmp/backend.zip
EXPOSE 7001
CMD cd "/tmp/backend";npm run dev;