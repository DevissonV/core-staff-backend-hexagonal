import EmployeeService from '../../../domain/services/employee-service.js';

class DeleteEmployee {
  constructor(employeeRepository) {
    this.employeeService = new EmployeeService(employeeRepository);
  }

  async execute(id) {
    return await this.employeeService.deleteEmployee(id);
  }
}

export default DeleteEmployee;