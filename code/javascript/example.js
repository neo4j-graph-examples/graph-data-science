// npm install --save neo4j-driver
// node example.js
const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://<HOST>:<BOLTPORT>',
                  neo4j.auth.basic('<USERNAME>', '<PASSWORD>'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const query =
  `
  MATCH (c:Person{name:$name})-[r:INTERACTS]->(other)
  RETURN other.name as person
  `;

const params = {"name": "Jaime Lannister"};

const session = driver.session({database:"neo4j"});

session.run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
        console.log(record.get('person'));
    });
    session.close();
    driver.close();
  })
  .catch((error) => {
    console.error(error);
  });
