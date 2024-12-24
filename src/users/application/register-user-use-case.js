import UserService from '../domain/user-service.js';

class RegisterUser {
  constructor(userRepository) {
    this.userService = new UserService(userRepository);
  }

  async execute(userData) {
    return await this.userService.registerUser(userData);
  }
}

export default RegisterUser;
