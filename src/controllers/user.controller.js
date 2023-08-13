const UserBusiness = require("../business/user.business");

class UserController {
  constructor() {
    this.userBusiness = new UserBusiness();
  }

  async getUsers(_, res) {
    const users = await this.userBusiness.getAllUsers();
    res.json(users);
  }

  async getUser(req, res) {
    const { id } = req.params;
    const user = await this.userBusiness.getUserById(id);
    res.json(user);
  }

  async createUser(req, res) {
    try {
      const { body: user } = req;
      const createdUser = await this.userBusiness.createUser(user);
      const response = {
        message: "User created successfully",
      };
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { body: user } = req;
      const tokens = await this.userBusiness.login(user);
      const response = {
        tokens,
        user: {
          email: user.email,
        },
      };
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
