/** @format */

import { baseService } from "./baseService";

export class TaskTypeJiraService extends baseService {
  constructor() {
    super();
  }

  getAllTaskType = () => {
    return this.get(`TaskType/getAll`);
  };
}

export const taskTypeJiraService = new TaskTypeJiraService();
