import RequestService from '../domain/request-service.js';

class DeleteRequest {
  constructor(requestRepository) {
    this.requestService = new RequestService(requestRepository);
  }

  async execute(id) {
    return await this.requestService.deleteRequest(id);
  }
}

export default DeleteRequest;
