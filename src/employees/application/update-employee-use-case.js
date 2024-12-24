import EmployeeService from '../domain/employee-service.js';

class UpdateEmployee {
  constructor(employeeRepository) {
    this.employeeService = new EmployeeService(employeeRepository);
  }

  async execute(id, employeeData) {
    return await this.employeeService.updateEmployee(id, employeeData);
  }
}

export default UpdateEmployee;
