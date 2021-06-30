const Neo4jTempDB = require('@neo4j-labs/temp-dbs').default;
const neo4j = require("neo4j-driver");

let neo4jSystemDriver;
let session;
let tempDb;
let database;

beforeAll(async () => {
  tempDb = new Neo4jTempDB(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD
    )
  );
  neo4jSystemDriver = tempDb.getSystemDriver();
  session = neo4jSystemDriver.session({ database: "system" });

  database = await tempDb.createDatabase();

  process.env.NEO4J_DATABASE = database;

  result = await tempDb.runCypherOnDatabase(database, "3.5",`
    CREATE (TheMatrix:Movie {title:'The Matrix', released:1999, tagline:'Welcome to the Real World'})
    CREATE (Keanu:Person {name:'Keanu Reeves', born:1964})
    CREATE (Carrie:Person {name:'Carrie-Anne Moss', born:1967})
    CREATE (Laurence:Person {name:'Laurence Fishburne', born:1961})
    CREATE (Hugo:Person {name:'Hugo Weaving', born:1960})
    CREATE (LillyW:Person {name:'Lilly Wachowski', born:1967})
    CREATE (LanaW:Person {name:'Lana Wachowski', born:1965})
    CREATE (JoelS:Person {name:'Joel Silver', born:1952})
    CREATE
    (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrix),
    (Carrie)-[:ACTED_IN {roles:['Trinity']}]->(TheMatrix),
    (Laurence)-[:ACTED_IN {roles:['Morpheus']}]->(TheMatrix),
    (Hugo)-[:ACTED_IN {roles:['Agent Smith']}]->(TheMatrix),
    (LillyW)-[:DIRECTED]->(TheMatrix),
    (LanaW)-[:DIRECTED]->(TheMatrix),
    (JoelS)-[:PRODUCED]->(TheMatrix)

    CREATE (Emil:Person {name:"Emil Eifrem", born:1978})
    CREATE (Emil)-[:ACTED_IN {roles:["Emil"]}]->(TheMatrix)

    CREATE (TheMatrixReloaded:Movie {title:'The Matrix Reloaded', released:2003, tagline:'Free your mind'})
    CREATE
    (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrixReloaded),
    (Carrie)-[:ACTED_IN {roles:['Trinity']}]->(TheMatrixReloaded),
    (Laurence)-[:ACTED_IN {roles:['Morpheus']}]->(TheMatrixReloaded),
    (Hugo)-[:ACTED_IN {roles:['Agent Smith']}]->(TheMatrixReloaded),
    (LillyW)-[:DIRECTED]->(TheMatrixReloaded),
    (LanaW)-[:DIRECTED]->(TheMatrixReloaded),
    (JoelS)-[:PRODUCED]->(TheMatrixReloaded)

    CREATE (TheMatrixRevolutions:Movie {title:'The Matrix Revolutions', released:2003, tagline:'Everything that has a beginning has an end'})
    CREATE
    (Keanu)-[:ACTED_IN {roles:['Neo']}]->(TheMatrixRevolutions),
    (Carrie)-[:ACTED_IN {roles:['Trinity']}]->(TheMatrixRevolutions),
    (Laurence)-[:ACTED_IN {roles:['Morpheus']}]->(TheMatrixRevolutions),
    (Hugo)-[:ACTED_IN {roles:['Agent Smith']}]->(TheMatrixRevolutions),
    (LillyW)-[:DIRECTED]->(TheMatrixRevolutions),
    (LanaW)-[:DIRECTED]->(TheMatrixRevolutions),
    (JoelS)-[:PRODUCED]->(TheMatrixRevolutions)

    CREATE (TheDevilsAdvocate:Movie {title:"The Devil's Advocate", released:1997, tagline:'Evil has its winning ways'})
    CREATE (Charlize:Person {name:'Charlize Theron', born:1975})
    CREATE (Al:Person {name:'Al Pacino', born:1940})
    CREATE (Taylor:Person {name:'Taylor Hackford', born:1944})
    CREATE
    (Keanu)-[:ACTED_IN {roles:['Kevin Lomax']}]->(TheDevilsAdvocate),
    (Charlize)-[:ACTED_IN {roles:['Mary Ann Lomax']}]->(TheDevilsAdvocate),
    (Al)-[:ACTED_IN {roles:['John Milton']}]->(TheDevilsAdvocate),
    (Taylor)-[:DIRECTED]->(TheDevilsAdvocate)

    CREATE (AFewGoodMen:Movie {title:"A Few Good Men", released:1992, tagline:"In the heart of the nation's capital, in a courthouse of the U.S. government, one man will stop at nothing to keep his honor, and one will stop at nothing to find the truth."})
    CREATE (TomC:Person {name:'Tom Cruise', born:1962})
    CREATE (JackN:Person {name:'Jack Nicholson', born:1937})
    CREATE (DemiM:Person {name:'Demi Moore', born:1962})
    CREATE (KevinB:Person {name:'Kevin Bacon', born:1958})
    CREATE (KieferS:Person {name:'Kiefer Sutherland', born:1966})
    CREATE (NoahW:Person {name:'Noah Wyle', born:1971})
    CREATE (CubaG:Person {name:'Cuba Gooding Jr.', born:1968})
    CREATE (KevinP:Person {name:'Kevin Pollak', born:1957})
    CREATE (JTW:Person {name:'J.T. Walsh', born:1943})
    CREATE (JamesM:Person {name:'James Marshall', born:1967})
    CREATE (ChristopherG:Person {name:'Christopher Guest', born:1948})
    CREATE (RobR:Person {name:'Rob Reiner', born:1947})
    CREATE (AaronS:Person {name:'Aaron Sorkin', born:1961})
    CREATE
    (TomC)-[:ACTED_IN {roles:['Lt. Daniel Kaffee']}]->(AFewGoodMen),
    (JackN)-[:ACTED_IN {roles:['Col. Nathan R. Jessup']}]->(AFewGoodMen),
    (DemiM)-[:ACTED_IN {roles:['Lt. Cdr. JoAnne Galloway']}]->(AFewGoodMen),
    (KevinB)-[:ACTED_IN {roles:['Capt. Jack Ross']}]->(AFewGoodMen),
    (KieferS)-[:ACTED_IN {roles:['Lt. Jonathan Kendrick']}]->(AFewGoodMen),
    (NoahW)-[:ACTED_IN {roles:['Cpl. Jeffrey Barnes']}]->(AFewGoodMen),
    (CubaG)-[:ACTED_IN {roles:['Cpl. Carl Hammaker']}]->(AFewGoodMen),
    (KevinP)-[:ACTED_IN {roles:['Lt. Sam Weinberg']}]->(AFewGoodMen),
    (JTW)-[:ACTED_IN {roles:['Lt. Col. Matthew Andrew Markinson']}]->(AFewGoodMen),
    (JamesM)-[:ACTED_IN {roles:['Pfc. Louden Downey']}]->(AFewGoodMen),
    (ChristopherG)-[:ACTED_IN {roles:['Dr. Stone']}]->(AFewGoodMen),
    (AaronS)-[:ACTED_IN {roles:['Man in Bar']}]->(AFewGoodMen),
    (RobR)-[:DIRECTED]->(AFewGoodMen),
    (AaronS)-[:WROTE]->(AFewGoodMen)

    CREATE (PaulBlythe:Person {name:'Paul Blythe'})
    CREATE (AngelaScope:Person {name:'Angela Scope'})
    CREATE (JessicaThompson:Person {name:'Jessica Thompson'})
    CREATE (JamesThompson:Person {name:'James Thompson'})
   `, { database });
});

test("can search movies by title", async () => {
  const api = require("../src/neo4jApi");
  const movies = await api.searchMovies("Matrix");
  expect(movies.length).toBe(3);
});

test("can get movie by title", async () => {
  const api = require("../src/neo4jApi");
  const movie = await api.getMovie("The Matrix");
  expect(movie.title).toBe("The Matrix");
});

afterAll(async () => {
  await tempDb.cleanDatabase(database);
  const api = require("../src/neo4jApi");
  await api.driver.close();
});
