TODO
get docker working

    one big table, with edit delete, search

    https://dev.to/thwani47/building-a-crud-app-with-react-query-typescript-and-axios-2d0j

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
npm test                                    // todo
```

And see a coverage report with

```
npm run coverage                             // todo
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

# TODO


pass date with this???
https://www.baeldung.com/spring-date-parameters
https://www.npmjs.com/package/react-datepicker


https://dev.to/dcodeyt/creating-beautiful-html-tables-with-css-428l

get tests running
get coverage working
get eslint plugins working (as stated above)

error
loading
no records..
