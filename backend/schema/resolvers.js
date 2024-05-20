import Todo from './../models/todo.model.js';

const resolvers = {
  Query: {
    todos: async () => {
      try {
        return await Todo.find();
      } catch (error) {
        throw new Error("Error retrieving todos: " + error.message);
      }
    },
    todo: async (_, { id }) => {
      try {
        return await Todo.findById(id);
      } catch (error) {
        throw new Error("Error retrieving todo: " + error.message);
      }
    },
  },
  Mutation: {
    createTodo: async (_, { input }) => {
      try {
        const newTodo = new Todo({
          title: input.title,
          description: input.description,
          status: input.status,
        });
        return await newTodo.save();
      } catch (error) {
        throw new Error("Error creating todo: " + error.message);
      }
    },
    updateTodo: async (parent, { input }) => {
      try {
        return await Todo.findByIdAndUpdate(
          input.id,
          {
            title: input.title,
            description: input.description,
            status: input.status,
            updatedAt: Date.now(),
          },
          { new: true }
        );
      } catch (error) {
        throw new Error("Error updating todo: " + error.message);
      }
    },
    deleteTodo: async (parent, { id }) => {
      try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
          throw new Error("Todo not found");
        }
        return true;
      } catch (error) {
        throw new Error("Error deleting todo: " + error.message);
      }
    },
  },
};

export default resolvers;
