import gql from "graphql-tag";

const typedefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTodoInput {
    title: String!
    description: String
    status: String!
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    status: String
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

export default typedefs;
