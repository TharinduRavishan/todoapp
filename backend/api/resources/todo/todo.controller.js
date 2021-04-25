import Todo from './todo.model';
const SUCCESS = 'SUCCESS';

export default {
  //Create a todo
  async createTodo(req, res) {
    try {
      const requestBody = req.body;

      if (!requestBody.title) {
        return res.status(500).send({ error: 'title is required' });
      }
      if (!requestBody.assignedUser) {
        return res.status(500).send({ error: 'assigned user is required' });
      }
      const todo = await Todo.create(requestBody);
      return res.send({ message: SUCCESS, data: todo });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Update todo
  async updateTodo(req, res) {
    try {
      const requestBody = req.body;

      if (!requestBody.title) {
        return res.status(500).send({ error: 'title is required' });
      }
      if (!requestBody.assignedUser) {
        return res.status(500).send({ error: 'assigned user is required' });
      }

      const updateTodo = await Todo.findOneAndUpdate(
        { _id: req.body._id },
        requestBody,
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
  async list(req, res) {
    try {
      let query = {}
      const assignedUser = req.query.userId
      const id = req.query.id;

      if (assignedUser) {
        query = { assignedUser: assignedUser };
      }

      if (id) {
        query = { _id: id }
      }

      const found = await Todo.find(query).sort({ createdAt: 'DESC'});
      return res.send({ message: SUCCESS, date: found });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //put completed todo
  async completeTodo(req, res) {
    try {
      const id = req.body.id;
      const todo = {
        isCompleted: true,
        completedAt: new Date().toISOString(),
      };
      await Todo.findOneAndUpdate({ _id: id }, todo, {
        new: true,
      });
      return res.send({ message: SUCCESS });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
