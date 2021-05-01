import bcrypt from 'bcrypt';
import User from '../user/user.model';
import AuthToken from './auth.model';
const SUCCESS = 'SUCCESS';

export default {
  async login(req, res) {
    try {
      const postBody = req.body;

      if (!postBody.email) {
        return res.status(500).send({ error: 'email is required' });
      }
      if (!postBody.password) {
        return res.status(500).send({ error: 'password is required' });
      }

      const foundUser = await User.find({ email: postBody.email });
      if (foundUser.length === 0) {
        return res.status(500).send({
          error: 'There is no user with this email address',
        });
      }

      const foundPassword = foundUser[0].password;
      const matched = await bcrypt.compare(postBody.password, foundPassword);

      if (!matched) {
        return res.status(500).send({
          error: 'you have entered a wrong password',
        });
      }

      const token = await bcrypt.hash(foundUser[0].firstName, 10);
      const authInput = {
        token: token,
        userId: foundUser[0]._id,
      };
      await AuthToken.findOneAndUpdate(
        { userId: foundUser[0]._id },
        authInput,
        { upsert: true }
      );
      res.send({
        status: SUCCESS,
        message: 'Logged in successfully',
        data: {
          token: token,
          user: {
            id: foundUser[0]._id,
            email: foundUser[0].email,
          },
        },
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};
