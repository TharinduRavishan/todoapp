import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../api/resources/user/user.model';

mongoose.Promise = global.Promise;

export default {
  connect() {
    mongoose.connect('mongodb://localhost/my_todo', { useNewUrlParser: true });
    this.createFakeAdmin();
  },

  async createFakeAdmin() {
    const admin = {
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin', 10),
      firstName: 'Admin',
      lastName: 'User',
    };
    const found = await User.find({ email: 'admin@gmail.com' });
    if (found.length === 0) {
      await User.create(admin);
    }
  },
};
