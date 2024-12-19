class Request {
  constructor({ id, code, description, summary, employee_id }) {
    this.id = id;
    this.code = code;
    this.description = description;
    this.summary = summary;
    this.employee_id = employee_id;
  }
}

export default Request;