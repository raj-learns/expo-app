const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Stats {
    goals: Int
    assists: Int
    matches: Int
  }

  type Team {
    name: String
  }

  type Player {
    id: ID
    name: String
    age: Int
    position: String
    stats: Stats
    team: Team
  }

  type Query {
    players: [Player]
  }
`);

const playersData = [
  {
    id: "1",
    name: "Lionel Messi",
    age: 36,
    position: "Forward",
    stats: { goals: 30, assists: 12, matches: 28 },
    team: { name: "PSG" },
  },
  {
    id: "2",
    name: "Cristiano Ronaldo",
    age: 38,
    position: "Forward",
    stats: { goals: 25, assists: 8, matches: 30 },
    team: { name: "Manchester United" },
  },
  // Add more players as you like
];

const root = {
  players: () => playersData,
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Mock GraphQL server running at http://localhost:${PORT}/graphql`);
});
