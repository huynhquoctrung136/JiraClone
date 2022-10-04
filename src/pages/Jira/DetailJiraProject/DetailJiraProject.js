/** @format */

import React, { useEffect } from "react";
import ContentMain from "../../../components/Jira/Main/ContentMain";
import HeaderMain from "../../../components/Jira/Main/HeaderMain";
import InfoMain from "../../../components/Jira/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../../redux/constants/ProjectJiraConstants";

export default function DetailJiraProject(props) {
  const { projectDetail } = useSelector((state) => state.ProjectJiraReducer);
  //console.log("projectDetail", projectDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch({ type: GET_PROJECT_DETAIL_SAGA, projectId });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
