import bcrypt from 'bcrypt';
import User from './user.model';
const SUCCESS = 'SUCCESS';

export default {
  //Create a user {
  async createUser(req, res) {
    const postBody = req.body;

    if (!postBody.firstName) {
      return res.status(500).send({ error: 'first name is required' });
    }
    if (!postBody.lastName) {
      return res.status(500).send({ error: 'last name is required' });
    }
    if (!postBody.email) {
      return res.status(500).send({ error: 'email is required' });
    }
    if (!postBody.password) {
      return res.status(500).send({ error: 'password is required' });
    }

    const foundUser = await User.find({ email: postBody.email });
    if (foundUser.length > 0) {
      return res.status(500).send({
        error:
          'There is a user with current email. Please use different email address',
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
    res.send({ status: SUCCESS, message: 'User is created successfully' });
  },
};
