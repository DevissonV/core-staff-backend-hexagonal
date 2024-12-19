import KnexRequestRepository from '../../infrastructure/database/repositories/knex-request-repository.js';
import CreateRequest from '../../application/use-cases/requests/create-request.js';
import GetRequestById from '../../application/use-cases/requests/get-request-by-id.js';
import UpdateRequest from '../../application/use-cases/requests/update-request.js';
import DeleteRequest from '../../application/use-cases/requests/delete-request.js';
import { successResponse, errorResponse } from '../../utils/response/response.js';

const requestRepository = new KnexRequestRepository();
const createRequest = new CreateRequest(requestRepository);
const getRequestById = new GetRequestById(requestRepository);
const updateRequest = new UpdateRequest(requestRepository);
const deleteRequest = new DeleteRequest(requestRepository);

class RequestController {
  async getAll(req, res) {
    try {
      const { limit, page, code, status } = req.query;
      const filters = { code, status };
      const requests = await requestRepository.getAll({
        limit: parseInt(limit, 10) || 10,
        page: parseInt(page, 10) || 1,
        filters,
      });
      return successResponse(res, requests, 200, true);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const request = await getRequestById.execute(id);
      if (!request) {
        return errorResponse(res, 'Request not found', 404);
      }
      return successResponse(res, request);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async create(req, res) {
    try {
      const newRequest = await createRequest.execute(req.body);
      return successResponse(res, newRequest, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedRequest = await updateRequest.execute(id, req.body);
      return successResponse(res, updatedRequest);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await deleteRequest.execute(id);
      return successResponse(res, { message: 'Request deleted successfully' });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

export default new RequestController();