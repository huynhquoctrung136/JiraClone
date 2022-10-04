/** @format */
import React, { useRef, useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { Button, Table, Tag } from "antd";
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_PROJECT_LIST_SAGA,
  EDIT_PROJECT_LIST,
  GET_PROJECT_LIST_SAGA,
} from "../../../redux/constants/ProjectJiraConstants";
import { OPEN_FORM_EDIT_PROJECT } from "../../../redux/constants/DrawerJiraConstanst";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import { Popconfirm, Avatar, Popover, AutoComplete } from "antd";
import {
  ADD_USER_PROJECT_SAGA,
  GET_USER_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../../../redux/constants/UserConstants";
import { NavLink } from "react-router-dom";

const ProjectManagement = (props) => {
  const searchRef = useRef(null);
  const [value, setValue] = useState("");

  // Lay du lieu ve tu Reducer cua Component
  const { projectList } = useSelector((state) => state.ProjectJiraReducer);
  const { userSearch } = useSelector((state) => state.UserJiraReducer);

  //Dispatch du lieu len Reducer de cap nhat lai du lieu
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_PROJECT_LIST_SAGA });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
      render: (text, record, index) => {
        return (
          <NavLink
            to={`/projectdetail/${record.id}`}
            className="text-primary"
            activeClassName="active font-weight-bold"
            style={{ textDecoration: "none" }}
          >
            {text}
          </NavLink>
        );
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "20%",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
      render: (text, record, index) => {
        let contentJSX = ReactHtmlParser(text);
        return <div>{contentJSX}</div>;
      },
    },
    {
      title: "Creator",
      key: "creator",
      width: "10%",
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
      render: (text, record, index) => {
        return <Tag color="blue">{record.creator?.name}</Tag>;
      },
    },
    {
      title: "Members",
      key: "members",
      width: "20%",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 2).map((member, index) => {
              return (
                <Popover
                  placement="top"
                  title="Members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    alt=""
                                    width="30px"
                                    height="30px"
                                    borderRadius={{ width: "15px" }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: REMOVE_USER_FROM_PROJECT_SAGA,
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    style={{ borderRadius: "5px" }}
                                    className="btn btn-danger"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar
                    style={{ marginRight: "5px" }}
                    key={index}
                    src={member.avatar}
                  ></Avatar>
                </Popover>
              );
            })}
            {record.members?.length > 2 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="right"
              title="Add members"
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: "100%" }}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);
                      dispatch({
                        type: ADD_USER_PROJECT_SAGA,
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_SAGA,
                          keyWord: value,
                        });
                      }, 300);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ marginLeft: "5px", borderRadius: "50%" }}>
                +
              </Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "10%",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                //dispatch để mở form edit
                dispatch({
                  type: OPEN_FORM_EDIT_PROJECT,
                  title: "Edit Project",
                  Component: <FormEditProject />,
                });
                //dispatch để load dữ liệu từ Form lên
                dispatch({
                  type: EDIT_PROJECT_LIST,
                  projectEditModel: record,
                });
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_LIST_SAGA,
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container mt-3">
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
            <li className="breadcrumb-item">Project</li>
            <li className="breadcrumb-item">CyberLearn</li>
            <li className="breadcrumb-item active" aria-current="page">
              Project Management
            </li>
          </ol>
        </nav>
      </div>
      <h3 className="mb-3">Project Management</h3>
      <Table rowKey={"id"} columns={columns} dataSource={projectList} />
    </div>
  );
};

export default ProjectManagement;
