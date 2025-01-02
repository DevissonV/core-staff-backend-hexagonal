import KnexRequestRepository from '../infrastructure/knex-request-repository.js';
import CreateRequest from '../application/create-request-use-case.js';
import GetRequestById from '../application/get-request-by-id-use-case.js';
import UpdateRequest from '../application/update-request-use-case.js';
import DeleteRequest from '../application/delete-request-use-case.js';
import { successResponse, errorResponse } from '../../core/utils/response/response.js';
import { validatePagination } from '../../core/utils/validations/pagination-validation.js';


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
      const pagination = validatePagination({ limit, page });

      const requests = await requestRepository.getAll({
        ...pagination,
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
