import UserService from '../../../domain/services/user-service.js';

class LoginUser {
  constructor(userRepository) {
    this.userService = new UserService(userRepository);
  }

  async execute(username, password) {
    return await this.userService.loginUser(username, password);
  }
}

export default LoginUser;