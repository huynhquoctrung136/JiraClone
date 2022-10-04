/** @format */

import {
  FileAddOutlined,
  SearchOutlined,
  AntDesignOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_FORM_CREATE_TASK } from "../../redux/constants/DrawerJiraConstanst";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";
const { Header, Sider, Content } = Layout;

export default function SidebarJira() {
  const [state, setState] = useState({
    collapsed: false,
  });

  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const dispatch = useDispatch();
  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={state.collapsed}
          style={{ height: "100%" }}
        >
          <div className="text-left pl-2 m-3" onClick={toggle}>
            <AntDesignOutlined
              style={{ cursor: "pointer", color: "#f4f5f7", fontSize: 30 }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: (
                  <FileAddOutlined
                    style={{
                      cursor: "pointer",
                      color: "#f4f5f7",
                      fontSize: 20,
                    }}
                  />
                ),
                label: "Create Task",
                onClick: () => {
                  dispatch({
                    type: OPEN_FORM_CREATE_TASK,
                    title: "Create Task",
                    Component: <FormCreateTask />,
                  });
                },
              },
              {
                key: "2",
                icon: (
                  <SearchOutlined
                    style={{
                      cursor: "pointer",
                      color: "#f4f5f7",
                      fontSize: 20,
                    }}
                  />
                ),
                label: "Search Task",
              },
            ]}
          />
        </Sider>
      </Layout>
    </>
  );
}
