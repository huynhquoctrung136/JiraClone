/** @format */

import { Fragment } from "react";
import { Route } from "react-router-dom";
import MenuJira from "../../components/Jira/MenuJira";
import ModalJira from "../../components/Jira/ModalJira/ModalJira";
import SidebarJira from "../../components/Jira/SidebarJira";

export const JiraTemplate = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <div className="jira">
              <SidebarJira />
              <MenuJira />
              <Component {...propsRoute} />
              <ModalJira />
            </div>
          </Fragment>
        );
      }}
    />
  );
};
