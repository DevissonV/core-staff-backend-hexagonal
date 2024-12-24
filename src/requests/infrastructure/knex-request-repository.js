import db from '../../core/database/database.js'; 
import RequestRepository from '../domain/request-repository.js';

class KnexRequestRepository extends RequestRepository {
  async getAll({ limit, page, filters }) {
    const offset = (page - 1) * limit;
    const query = db('requests').limit(limit).offset(offset);

    if (filters.code) {
      query.where('code', 'like', `%${filters.code}%`);
    }

    if (filters.status) {
      query.where('status', '=', filters.status);
    }

    const total = await db('requests').count('* as count').first();
    const data = await query;

    return {
      data,
      total: total.count,
      page,
      totalPages: Math.ceil(total.count / limit),
    };
  }

  async getById(id) {
    return await db('requests').where({ id }).first();
  }

  async create(request) {
    return await db('requests').insert(request).returning('*');
  }

  async update(id, request) {
    return await db('requests').where({ id }).update(request).returning('*');
  }

  async delete(id) {
    return await db('requests').where({ id }).del();
  }
}

export default KnexRequestRepository;
