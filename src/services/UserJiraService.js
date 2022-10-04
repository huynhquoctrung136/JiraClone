/** @format */

import { baseService } from "./baseService";

export class userJiraService extends baseService {
  constructor() {
    super();
  }
  //SignIn Jira
  signInJira = (userLogin) => {
    return this.post(`/users/signin`, userLogin);
  };

  //getUser Jira
  getUserJira = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  //addUserProject
  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  //removeUserProject
  //userProject bao gom userId,projectId
  removeUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  //getUserByProjectId
  getUserByProjectId=(idProject)=>{
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  }

}

export const userjiraService = new userJiraService();
