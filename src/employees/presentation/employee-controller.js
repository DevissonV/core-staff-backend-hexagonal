import KnexEmployeeRepository from '../infrastructure/knex-employee-repository.js';
import CreateEmployee from '../application/create-employee-use-case.js';
import GetEmployeeById from '../application/get-employee-by-id-use-case.js';
import UpdateEmployee from '../application/update-employee-use-case.js';
import DeleteEmployee from '../application/delete-employee-use-case.js';
import { validatePagination } from '../../core/utils/validations/pagination-validation.js';
import { successResponse, errorResponse } from '../../core/utils/response/response.js';

const employeeRepository = new KnexEmployeeRepository();
const createEmployee = new CreateEmployee(employeeRepository);
const getEmployeeById = new GetEmployeeById(employeeRepository);
const updateEmployee = new UpdateEmployee(employeeRepository);
const deleteEmployee = new DeleteEmployee(employeeRepository);

class EmployeeController {
  async getAll(req, res) {
    try {
      const { limit, page, name, minSalary, hireDate } = req.query;
      const filters = { name, minSalary, hireDate };
      const pagination = validatePagination({ limit, page });

      const employees = await employeeRepository.getAll({
        ...pagination,
        filters,
      });
      return successResponse(res, employees, 200, true);
    } catch (error) {
      return errorResponse(res, error.message, 400);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const employee = await getEmployeeById.execute(id);
      if (!employee) {
        return errorResponse(res, 'Employee not found', 404);
      }
      return successResponse(res, employee);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async create(req, res) {
    try {
      const newEmployee = await createEmployee.execute(req.body);
      return successResponse(res, newEmployee, 201);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedEmployee = await updateEmployee.execute(id, req.body);
      return successResponse(res, updatedEmployee);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await deleteEmployee.execute(id);
      return successResponse(res, { message: 'Employee deleted successfully' });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

export default new EmployeeController();
