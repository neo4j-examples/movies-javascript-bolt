## Neo4j Movies Example Application - The neo4j-javascript-driver Edition

### Stack

* [neo4j-javascript-driver](https://github.com/neo4j/neo4j-javascript-driver) - Neo4j JS driver
* Neo4j-Server
* Frontend: ES6, jquery, bootstrap, [d3.js](http://d3js.org/)
* Webpack for building web assets


### Setup

```bash
$ npm install
```

### Run locally

Start your local Neo4j Server ([Download & Install](http://neo4j.com/download)), open the [Neo4j Browser](http://localhost:7474). Then install the Movies data-set with `:play movies`, click the statement, and hit the triangular "Run" button.

And finally let's run the App inside the Webpack Dev Server:

```bash
# run in developement mode (refreshes the app on source code changes)
$ npm run dev

# builds the release version with client assets in "build" directory
$ npm run build
```

When running in "dev" mode navigate to http://localhost:8080/webpack-dev-server/ to see the application.

After executing `npm run build` command open local file "build/index.html" in your browser.
