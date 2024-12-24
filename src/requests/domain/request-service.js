import { validateRequest } from '../../core/utils/validations/request-validation.js';	

class RequestService {
  constructor(requestRepository) {
    this.requestRepository = requestRepository;
  }

  async getAllRequests({ limit, page, filters }) {
    if (limit < 1 || page < 1) {
      throw new Error('Limit and page must be positive integers');
    }

    return await this.requestRepository.getAll({ limit, page, filters });
  }

  async getRequestById(id) {
    const request = await this.requestRepository.getById(id);
    if (!request) {
      throw new Error(`Request with ID ${id} not found`);
    }
    return request;
  }

  async createRequest(requestData) {
    validateRequest(requestData);
    return await this.requestRepository.create(requestData);
  }

  async updateRequest(id, requestData) {
    const existingRequest = await this.requestRepository.getById(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found`);
    }

    validateRequest(requestData);
    return await this.requestRepository.update(id, requestData);
  }

  async deleteRequest(id) {
    const existingRequest = await this.requestRepository.getById(id);
    if (!existingRequest) {
      throw new Error(`Request with ID ${id} not found`);
    }

    await this.requestRepository.delete(id);
  }
}

export default RequestService;
