import KnexUserRepository from '../infrastructure/knex-user-repository.js';
import RegisterUser from '../application/register-user-use-case.js';
import LoginUser from '../application/login-user-use-case.js';
import DeleteUser from '../application/delete-user-use-case.js';
import { successResponse, errorResponse } from '../../core/utils/response/response.js';

const userRepository = new KnexUserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

class UserController {
  async register(req, res) {
    try {
      const newUser = await registerUser.execute(req.body);
      return successResponse(res, newUser, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const { token, role } = await loginUser.execute(username, password);
      return successResponse(res, { token, role });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await deleteUser.execute(id);
      return successResponse(res, { message: 'User deleted successfully' });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

export default new UserController();
