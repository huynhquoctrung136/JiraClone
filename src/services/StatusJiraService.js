/** @format */

import { baseService } from "./baseService";

export class StatusJiraService extends baseService {
  constructor() {
    super();
  }

  getAllStatus = () => {
    return this.get(`Status/getAll`);
  };
}

export const statusJiraService = new StatusJiraService();
