import EmployeeService from '../domain/employee-service.js';

class GetEmployeeById {
  constructor(employeeRepository) {
    this.employeeService = new EmployeeService(employeeRepository);
  }

  async execute(id) {
    return await this.employeeService.getEmployeeById(id);
  }
}

export default GetEmployeeById;
