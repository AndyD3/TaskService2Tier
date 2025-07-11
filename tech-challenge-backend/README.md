# Tech challenge backend
Very basic back end for tech challenge. This back end is utilised by a front end.

## Steps to run
1. Build the project using
   `mvn clean install`
2. Run using `mvn spring-boot:run`
3. The web application is accessible via http://localhost:8080 with JSON tasks available at http://localhost:8080/api/tasks

## Docker:

Build locally
```
docker build -t tech-challenge-be:latest . 
```
Run locally:
```
docker run -p 8080:8080 -t -i tech-challenge-be:latest
```

//TODOS
possible DTOs and repo objects see
   https://medium.com/learnwithnk/best-practices-in-spring-boot-project-structure-layers-of-microservice-versioning-in-api-cadf62bd3459

how to test service correctly??
how to test web layer correctly??
proper errors...



## Author (name and email removed as possibly identifying)
https://github.com/AndyD3




//todo remove
https://medium.com/@pratik.941/building-rest-api-using-spring-boot-a-comprehensive-guide-3e9b6d7a8951
