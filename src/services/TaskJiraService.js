/** @format */

import { baseService } from "./baseService";

export class TaskJiraService extends baseService {
  constructor() {
    super();
  }

  //createTask
  createTask = (newTask) => {
    return this.post(`Project/createTask`, newTask);
  };

  //getTaskDetail
  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };

  //updateStatusTask
  updateStatusTask = (taskStatusUpdate) => {
    return this.put(`Project/updateStatus`, taskStatusUpdate);
  };

  //update Task
  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
}

export const taskJiraService = new TaskJiraService();
