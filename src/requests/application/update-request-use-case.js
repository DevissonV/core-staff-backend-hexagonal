import RequestService from '../domain/request-service.js';

class UpdateRequest {
  constructor(requestRepository) {
    this.requestService = new RequestService(requestRepository);
  }

  async execute(id, requestData) {
    return await this.requestService.updateRequest(id, requestData);
  }
}

export default UpdateRequest;
