import Todo from "./todo.model";
const SUCCESS = "SUCCESS";

export default {
  //Create a todo
  async createTodo(req, res) {
    try {
      const todo = await Todo.create(req.body);
      return res.send({ message: SUCCESS, data: todo });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Update todo
  async updateTodo(req, res) {
    try {
      const todo = {
        title: req.body.title,
        isCompleted: req.body.isCompleted,
      };
      const updateTodo = await Todo.findOneAndUpdate(
        { _id: req.body._id },
        todo,
        { new: true }
      );
      if (updateTodo) {
        return res.send({ message: SUCCESS, data: updateTodo });
      } else {
        return res.send({ message: FAILED });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Delete user by Id
  async deleteTodo(req, res) {
    try {
      const deleteTodo = await Todo.findByIdAndRemove(req.query.id);
      if (deleteTodo) {
        return res.send({ message: SUCCESS });
      } else {
        return res.status({ message: FAILED });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Get all todos
  async findTodos(req, res) {
    try {
      const todos = await Todo.find();
      return res.send({ message: SUCCESS, date: todos });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //put completed todos
  async completedTodos(req, res) {
    try {
      const todos = {
        asignedUser: req.body.asignedUser,
        completedAt: req.body.completedAt,
      };
      const completedTodo = await Todo.findOneAndUpdate(
        { _id: req.body._id },
        todos,
        { new: true }
      );
      if (completedTodo) {
        return res.send({ message: SUCCESS, data: updateTodo });
      } else {
        return res.send({ message: FAILED });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
