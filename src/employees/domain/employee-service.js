import { validateEmployee } from '../../core/utils/validations/employee-validation.js';

class EmployeeService {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async getAllEmployees({ limit, page, filters }) {
    if (limit < 1 || page < 1) {
      throw new Error('Limit and page must be positive integers');
    }

    return await this.employeeRepository.getAll({ limit, page, filters });
  }

  async getEmployeeById(id) {
    const employee = await this.employeeRepository.getById(id);
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async createEmployee(employeeData) {
    validateEmployee(employeeData);
    return await this.employeeRepository.create(employeeData);
  }

  async updateEmployee(id, employeeData) {
    const existingEmployee = await this.employeeRepository.getById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }

    validateEmployee(employeeData);
    return await this.employeeRepository.update(id, employeeData);
  }

  async deleteEmployee(id) {
    const existingEmployee = await this.employeeRepository.getById(id);
    if (!existingEmployee) {
      throw new Error(`Employee with ID ${id} not found`);
    }

    await this.employeeRepository.delete(id);
  }
}

export default EmployeeService;
