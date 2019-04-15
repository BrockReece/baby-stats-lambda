const { ApolloServer, gql } = require("apollo-server-lambda");
const { RESTDataSource } = require('apollo-datasource-rest');

class BabyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.babystats.org/api/';
  }
}

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
    baby: async (root, { id }, { dataSources }) => {
      const { Payload } = await dataSources.BabyAPI.get('babystats', { user: id })
      return Payload
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
        BabyAPI: new BabyAPI()
    }
  }
});

exports.handler = server.createHandler();