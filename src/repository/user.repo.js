const UserSchma = require("../models/users.model");

class UserRepository {
  constructor() {
    this.users = UserSchma;
  }

  async getAllUsers() {
    try {
      const users = await this.users.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.users.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.users.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async store(user) {
    try {
      const newUser = await this.users.create(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getuserByEmail(email) {
    try {
      const user = await this.users.findOne({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
