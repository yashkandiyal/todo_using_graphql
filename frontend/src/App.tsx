// src/App.js
import { FormEvent, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { motion } from "framer-motion";

const GET_TODOS = gql`
  query Query {
    todos {
      description
      status
      title
      id
    }
  }
`;

const ADD_TODO = gql`
  mutation Mutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      status
      description
    }
  }
`;

const TOGGLE_TODO_COMPLETION = gql`
  mutation ToggleTodoCompletion($id: ID!) {
    toggleTodoCompletion(id: $id) {
      id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

const App = () => {
  const [text, setText] = useState("");
  const { loading, error, data } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [toggleTodoCompletion] = useMutation(TOGGLE_TODO_COMPLETION, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo({
      variables: { text, status: "PENDING" },
    });
    setText("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="border rounded py-2 px-3 mr-2"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Todo
        </button>
      </form>
      <div>
        {data?.todos.map((todo: any, index: number) => (
          <motion.li
            key={index}
            className={`p-2 mb-2 border-b ${
              todo.status === "COMPLETED" ? "line-through" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <input
              type="checkbox"
              name=""
              id=""
              className="mr-2"
              value={todo.status}
              placeholder="-"
            />
            <span
              onClick={() =>
                toggleTodoCompletion({ variables: { id: todo.id } })
              }
              className="cursor-pointer">
              {todo.description}
            </span>
            <button
              onClick={() => deleteTodo({ variables: { id: todo.id } })}
              className="ml-2 bg-red-500 text-white py-1 px-2 rounded">
              Delete
            </button>
          </motion.li>
        ))}
      </div>
    </div>
  );
};

export default App;
