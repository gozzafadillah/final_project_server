const UserRepository = require("../repository/user.repo");
const { generateAccessToken } = require("../utlis/jwt.util");
const bcrypt = require("bcryptjs");

class UserBusiness {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(user) {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await this.userRepository.store(user);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async profile(id) {
    try {
      const user = await this.userRepository.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(user) {
    try {
      const userFound = await this.userRepository.getuserByEmail(user.email);
      if (!userFound) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(user.password, userFound.password);
      if (!isMatch) {
        throw new Error("Wrong password");
      }
      const tokens = generateAccessToken({ userId: userFound._id });
      return tokens;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserBusiness;
