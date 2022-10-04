/** @format */

import { baseService } from "./baseService";

export class PriorityJiraService extends baseService {
  constructor() {
    super();
  }

  getAllPriority = () => {
    return this.get(`Priority/getAll`);
  };
}

export const priorityJiraService = new PriorityJiraService();
