import db from '../../core/database/database.js'; 
import UserRepository from '../domain/user-repository.js';

class KnexUserRepository extends UserRepository {
  async getByUsername(username) {
    return await db('users').where({ username }).first();
  }

  async create(user) {
    return await db('users').insert(user).returning('*');
  }

  async delete(id) {
    return await db('users').where({ id }).del();
  }
}

export default KnexUserRepository;
