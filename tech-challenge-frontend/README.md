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

Eslint and Prettify have been added along with the plugins so issues should be highlighted in a correctly configured IDE. These can be ran from the command line.

You can run eslint on the source with the following command

```
npm run lint
```

You can prettify the code with

```
npm run format
```