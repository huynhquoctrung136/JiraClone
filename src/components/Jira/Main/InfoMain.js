/** @format */

import React from "react";
import ReactHtmlParser from "react-html-parser";
export default function InfoMain(props) {
  const { projectDetail } = props;

  const renderAvatar = () => {
    return projectDetail.members?.map((item, index) => {
      return (
        <div key={index} className="avatar">
          <img src={item.avatar} alt={item.avatar} />
        </div>
      );
    });
  };
  return (
    <>
      <h3>{projectDetail.projectName}</h3>
      <section>{ReactHtmlParser(projectDetail.description)}</section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          {renderAvatar()}
        </div>
        <div style={{ marginLeft: "20px" }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: "20px" }} className="text">
          Recently Updated
        </div>
      </div>
    </>
  );
}
