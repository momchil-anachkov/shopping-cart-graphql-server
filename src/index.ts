
import * as graphQlTools from 'graphql-tools';

import { ApolloServer } from 'apollo-server-express';
import { connectionUtil } from './database/connection-util';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

import app from './app';

const schema = graphQlTools.makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

(async () => {
  try {
    await connectionUtil.connected;
    const server = new ApolloServer({ schema });
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
    );
    // TODO: Figure out why it errors
  } catch (error) {
    console.log('app error', error);
  }
})();

// connectionUtil.connected
//   .then(() => {
//     // Create a server with the supplied schema
//     const server = new ApolloServer({ schema });
//     server.applyMiddleware({ app });
//     app.listen({ port: 4000 }, () =>
//       console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
//     );
//   })
//   .catch((error) => {
//     console.log('app-error', error);
//   });



