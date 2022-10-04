const { default: Axios } = require("axios");
const { DOMAIN_JIRA, TOKEN } = require("../util/constants/settingSystem");

export class baseService {
  get = (url) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  };

  put = (url, model) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "PUT",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  };

  delete = (url) => {
    return Axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, //JWT
    });
  };
}
