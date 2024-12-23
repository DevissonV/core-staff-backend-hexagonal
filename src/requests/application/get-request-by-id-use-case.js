import RequestService from '../domain/request-service.js';

class GetRequestById {
  constructor(requestRepository) {
    this.requestService = new RequestService(requestRepository);
  }

  async execute(id) {
    return await this.requestService.getRequestById(id);
  }
}

export default GetRequestById;
