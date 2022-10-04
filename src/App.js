/** @format */

import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import { UserLoginTemplate } from "./templates/UserLoginTemplate/UserLoginTemplate";
import LoginPage from "./pages/Auth/LoginPage";
import PageNotFound from "./components/Common/PageNotFound";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent";
import { JiraTemplate } from "./templates/JiraTemplate/JiraTemplate";
import CreateProject from "./pages/Jira/CreateProject/CreateProject";
import ProjectManagement from "./pages/Jira/ProjectManagement/ProjectManagement";
import DrawerJiraHOC from "./HOC/DrawerJira/DrawerJiraHOC";
import DetailJiraProject from "./pages/Jira/DetailJiraProject/DetailJiraProject";




export const history = createBrowserHistory();
function App() {
  return (
    <Route history={history}>
      <LoadingComponent/>
      <DrawerJiraHOC/>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <UserLoginTemplate path="/login" exact Component={LoginPage} />
        <UserLoginTemplate path="/" exact Component={LoginPage} />
        <JiraTemplate path="/createproject" exact Component={CreateProject}/>
        <JiraTemplate path="/projectmanagement" exact Component={ProjectManagement}/>
        <JiraTemplate path="/projectdetail/:projectId" exact Component={DetailJiraProject}/>
        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </Route>
  );
}

export default App;
