const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    hello: String
    baby(id: ID!): Baby
  }

  type Baby {
    babystats: [ DailyStat ]
  }

  type DailyStat {
    date: String
    pOz: Float
    bOz: Float  
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello, world!";
    },
    baby: (root, { id }) => {
      const { Payload } = require('../assets/payload')
      return Payload
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

exports.handler = server.createHandler();