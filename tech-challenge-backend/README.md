# Tech challenge backend
Very basic back end for tech challenge. This back end is utilised by a front end.

## Steps to run
1. Build the project using
   `mvn clean install`
2. Run using `mvn spring-boot:run`
3. The web application is accessible via http://localhost:8080 with JSON tasks available at http://localhost:8080/api/tasks

## API documentation
When running the application the swagger documentation of the API can be found at 
'http://localhost:8080/swagger-ui/index.html'

## Docker:

Build locally
```
docker build -t tech-challenge-be:latest . 
```
Run locally:
```
docker run -p 8080:8080 -t -i tech-challenge-be:latest
```

## Author (name and email removed as possibly identifying)
https://github.com/AndyD3