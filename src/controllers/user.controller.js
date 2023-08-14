const UserBusiness = require("../business/user.business");
const { verifyToken } = require("../utlis/jwt.util");

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
      await this.userBusiness.createUser(user);
      const response = {
        message: "User created successfully",
      };
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async profile(req, res) {
    try {
      // get token from authorization header
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      // check token
      const jwt = verifyToken(token);
      // check user
      const id = jwt.userId;
      const { email, username, _id, img } = await this.userBusiness.profile(id);
      const response = {
        message: "Get user successfully",
        user: { email, username, _id, img },
      };
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
