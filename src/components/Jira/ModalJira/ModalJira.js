/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Editor } from "@tinymce/tinymce-react";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/StatusJiraConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/PriorityJiraConstants";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODEL,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
} from "../../../redux/constants/TaskJiraConstanst";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/TaskTypeJiraConstants";
import { Select } from "antd";

export default function ModalJira(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusJiraReducer);
  const { arrPriority } = useSelector((state) => state.PriorityJiraReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeJiraReducer);
  const { projectDetail } = useSelector((state) => state.ProjectJiraReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);
  const dispatch = useDispatch();

  const [size, setSize] = React.useState("default");
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
  }, []);

  // console.log("taskDetailModal", taskDetailModal);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            {" "}
            <Editor
              name="description"
              apiKey="your-api-key"
              initialValue={taskDetailModal.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            <div className="mt-3 mb-3 ">
              <button
                className="btn btn-danger mr-2"
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODEL,
                    name: "description",
                    value: content,
                  });
                  setVisibleEditor(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn btn-outline-info"
                onClick={() => {
                  dispatch({
                    type: HANDLE_CHANGE_POST_API_SAGA,
                    actionType: CHANGE_TASK_MODEL,
                    name: "description",
                    value: historyContent,
                  });
                  setVisibleEditor(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODEL,
      name,
      value,
    });
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title d-flex">
              <i className="fa fa-bookmark" />
              <select
                className="ml-3"
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {arrTaskType.map((taskType, index) => {
                  return (
                    <option value={taskType.id}>{taskType.taskType}</option>
                  );
                })}
              </select>

              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt='xyz'"
                style={{ cursor: "pointer" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img src={"/assets/img/avatar_1.jfif"} alt="xyz" />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div
                          className="display-comment"
                          style={{ display: "flex" }}
                        >
                          <div className="avatar">
                            <img src={"/assets/img/avatar_1.jfif"} alt="xyz" />
                          </div>
                          <div>
                            <p style={{ marginBottom: 5 }}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{ marginBottom: 5 }}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{ color: "#929398" }}>Edit</span>•
                              <span style={{ color: "#929398" }}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      // const action = {
                      //   type: UPDATE_STATUS_TASK_SAGA,
                      //   taskUpdateStatus: {
                      //     taskId: taskDetailModal.taskId,
                      //     statusId: e.target.value,
                      //     projectId: taskDetailModal.projectId,
                      //   },
                      // };
                      // console.log("taskupdatestatus", {
                      //   taskId: taskDetailModal.taskId,
                      //   statusId: e.target.value,
                      // });

                      // dispatch(action);
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option value={status.statusId} key={index}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness.map((user, index) => {
                        return (
                          <div className="col-7  mt-1 mb-2">
                            <div
                              key={index}
                              className="item"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <div
                                  style={{ display: "inline-block" }}
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: REMOVE_USER_ASSIGN,
                                      userId: user.id,
                                    });
                                  }}
                                >
                                  <i
                                    className="fa fa-times"
                                    style={{ marginLeft: 5 }}
                                  />
                                </div>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div
                        className="col-5  mt-3"
                        style={{ alignItems: "center" }}
                      >
                        <Select
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index != -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          mode="multiple"
                          size={size}
                          placeholder="Please select"
                          optionFilterProp="label"
                          value="+ Add more"
                          onChange={(values) => {}}
                          onSelect={(value) => {
                            if (value == "0") {
                              return;
                            }
                            let userSelect = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelect = {
                              ...userSelect,
                              id: userSelect.userId,
                            };
                            console.log(userSelect);
                            dispatch({
                              type: HANDLE_CHANGE_POST_API_SAGA,
                              actionType: CHANGE_ASSIGNESS,
                              userSelect,
                            });
                          }}
                          style={{ width: "100%" }}
                        >
                          {children}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
