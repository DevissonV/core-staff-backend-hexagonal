import EmployeeService from '../../../domain/services/employee-service.js';

class CreateEmployee {
  constructor(employeeRepository) {
    this.employeeService = new EmployeeService(employeeRepository);
  }

  async execute(employeeData) {
    return await this.employeeService.createEmployee(employeeData);
  }
}

export default CreateEmployee;