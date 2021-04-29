import bcrypt from "bcrypt";
import User from "./user.model";
const SUCCESS = "SUCCESS";

export default {
  //Create a user {
  async createUser(req, res) {
    try {
      const postBody = req.body;

      if (!postBody.firstName) {
        return res.status(500).send({ error: "first name is required" });
      }
      if (!postBody.lastName) {
        return res.status(500).send({ error: "last name is required" });
      }
      if (!postBody.email) {
        return res.status(500).send({ error: "email is required" });
      }
      if (!postBody.password) {
        return res.status(500).send({ error: "password is required" });
      }

      const foundUser = await User.find({ email: postBody.email });
      if (foundUser.length > 0) {
        return res.status(500).send({
          error:
            "There is a user with current email. Please use different email address",
        });
      }
      const encryptedPassword = await bcrypt.hash(postBody.password, 10);
      const userInput = {
        firstName: postBody.firstName,
        lastName: postBody.lastName,
        email: postBody.email,
        password: encryptedPassword,
      };
      await User.create(userInput);
      res.send({ status: SUCCESS, message: "User is created successfully" });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Update user
  async updateUser(req, res) {
    try {
      const requestBody = req.body;

      if (!requestBody.firstName) {
        return res.status(500).send({ error: "firstName is required" });
      }
      if (!requestBody.lastName) {
        return res.status(500).send({ error: "lastName is required" });
      }

      const updateUser = await User.findOneAndUpdate(
        { _id: req.body._id },
        requestBody,
        { new: true }
      );
      if (updateUser) {
        return res.send({ message: SUCCESS, date: updateUser });
      } else {
        return res, send({ message: FAILED });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Delete user by Id
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findByIdAndRemove(req.query.id);
      if (deleteUser) {
        return res.send({ message: SUCCESS });
      } else {
        return res.status({ message: FAILED });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  //Get all users
  async list(req, res) {
    try {
      let query = {};
      const assignedUser = req.query.userId;
      const id = req.query.id;

      if (assignedUser) {
        query = { assignedUser: assignedUser };
      }

      if (id) {
        query = { _id: id };
      }

      const found = await User.find(query).sort({ createdAt: "DESC" });
      return res.send({ message: SUCCESS, date: found });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
