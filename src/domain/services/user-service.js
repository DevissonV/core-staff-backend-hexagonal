import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/user-repository.js';
import { envs } from '../../infrastructure/config/envs.js';

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = { ...userData, password: hashedPassword };
    return await this.userRepository.create(user);
  }

  async loginUser(username, password) {
    const user = await this.userRepository.getByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      envs.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    return { token, role: user.role };
  }

  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }
}

export default UserService;