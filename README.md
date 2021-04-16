# hilton-test
### build frontend

```bash
$ cd frontend
$ npm i
$ npm run build
$ rm -rf ../backend/app/public/*
$ cp -r build/* ../backend/app/public/
```

### start locally

```bash
$ cd backend
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### start from docker
```bash
$ cd backend
$ zip -r source.zip app config .autod.conf.js app.js index.js jsconfig.json package.json
$ docker build -t hilton-backend .
$ docker run docker run -d --name mongo -p 27017:27017 mongo:latest
$ docker run -d --link mongo:mongo -p 7001:7001 hilton-backend
```

**docker build may failed due to it contains "npm install" which would throw network exception. docker build is repeatable, it your failed, please try again.**

### account
employee: 
    username: admin
    password: admin

guest: please register you account

### unit test (after install dependencies)
```bash
$ cd backend
$ npm run cov
```
![test coverage](unit-test-coverage.png 'test coverage')

### tech stack
- [x] Use Node.js stack to complete this test 
- [x] Data should be persisted to a NoSQL database, using mongodb
- [x] Build RESTful Endpoints
- [ ] Build GraphQL Endpoints (not familiar with GraphQL, and time limits)
- [x] Unit-test code, for backend, time limits for frontend unit test.
- [x] A SPA(Single Page Application) to interact with the backend and show how the API works. 
- [x] Solution for building and deploying the project
- [x] Basic Authentication

### plus feature
- [ ] Couchbase
- [ ] cucumber
- [x] Docker
- [x] React
- [ ] TypeScript
- [x] ant design react
- [x] Egg.js

### project structure
**Backend follows Egg.js convention**

**Frontend follows create react app, and have executed command "eject"**