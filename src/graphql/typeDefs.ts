import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type CatalogueItem {
    id: String!,
    name: String!,
    description: String!,
    image: String!,
    price: Float!,
  }

  type ShoppingCart {
    id: String!,
    items: [ShoppingCartItem]
  }

  type ShoppingCartItem {
    item: CatalogueItem!,
    amount: Int!,
  }

  type Query {
    hello: String!,
    goodbye: String!,
    catalogue: [CatalogueItem]!,
    shoppingCart: ShoppingCart!,
  }

  type Mutation {
    addItemToCart(itemId: String!): ShoppingCart,
    removeItemFromCart(itemId: String!): ShoppingCart,
    setItemAmount(itemId: String!, itemAmount: Int!): ShoppingCart,
    checkout(NO_ARGS: String = {}): ShoppingCart
  }
`;
