import RequestService from '../../../domain/services/request-service.js';

class CreateRequest {
  constructor(requestRepository) {
    this.requestService = new RequestService(requestRepository);
  }

  async execute(requestData) {
    return await this.requestService.createRequest(requestData);
  }
}

export default CreateRequest;