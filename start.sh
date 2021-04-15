docker load -i hilton-backend.tar -t hilton-backend
docker run -d --name mongo -p 27017:27017 mongo:latest
docker run -d --link mongo:mongo -p 7001:7001 hilton-backend