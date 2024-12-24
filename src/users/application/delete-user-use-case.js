import UserService from '../domain/user-service.js';

class DeleteUser {
  constructor(userRepository) {
    this.userService = new UserService(userRepository);
  }

  async execute(id) {
    return await this.userService.deleteUser(id);
  }
}

export default DeleteUser;
