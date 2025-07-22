# Running locally

```
npm run dev
```

then in a browser go to:

```
http://localhost:3000/
```

# Running in docker

```
docker image build -t front-end .
docker run -p 3000:3000 front-end
```

then in a browser go to:

```
http://localhost:3000/
```

## working with the code

You can run the unit tests with

```
npm test
```

You can prettify the code with

```
npm run format
```