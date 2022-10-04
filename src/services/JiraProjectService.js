/**
 * /* eslint-disable no-useless-constructor
 *
 * @format
 */

import { baseService } from "./baseService";
export class JiraProjectService extends baseService {
  constructor() {
    super();
  }
  //getAllProjectCategory Service
  getAllProjectCategory = () => {
    return this.get(`/ProjectCategory`);
  };

  //createProject Service
  createProject = (newProject) => {
    return this.post(`Project/createProjectAuthorize`, newProject);
  };

  //getListProject Service
  getListProject = () => {
    return this.get(`/Project/getAllProject`);
  };

  //editListProject Service
  updateListProject = (projectUpdate) => {
    return this.put(
      `/Project/updateProject?projectId=${projectUpdate.id}`,
      projectUpdate
    );
  };

  //deleteListProject Service
  deleteListProject = (idProject) => {
    return this.delete(`/Project/deleteProject?projectId=${idProject}`);
  };

  //getProjectDetail Service
  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
  
  //getAllProject
  getAllProject = () => {
    return this.get(`/Project/getAllProject`);
  };
}

export const jiraprojectService = new JiraProjectService();
