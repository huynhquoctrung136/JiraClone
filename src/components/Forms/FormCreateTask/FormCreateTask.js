/** @format */

import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useEffect } from "react";
import { Select, Slider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/ProjectJiraConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/PriorityJiraConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/TaskTypeJiraConstants";
import { GET_USER_BY_PROJECT_ID_SAGA, GET_USER_SAGA } from "../../../redux/constants/UserConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { CREATE_TASK_SAGA } from "../../../redux/constants/TaskJiraConstanst";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/StatusJiraConstants";
import { SET_SUBMIT_CREATE_TASK } from "../../../redux/constants/DrawerJiraConstanst";

function FormCreateTask(props) {
  //Do kết nối với withformik => component có các props
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;

  //Lay du lieu tu redux
  const { arrProject } = useSelector((state) => state.ProjectJiraReducer);
  const { arrPriority } = useSelector((state) => state.PriorityJiraReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeJiraReducer);
  const { arrUser } = useSelector((state) => state.UserJiraReducer);
  const { arrStatus } = useSelector((state) => state.StatusJiraReducer);
  //Ham bien doi option cho the select
  const userOptions = arrUser.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const dispatch = useDispatch();

  //TimeTracking
  const [timeTracking, setTimetracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const [size, setSize] = React.useState("default");
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  //Hook
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_USER_SAGA,
      keyWord: "",
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type:SET_SUBMIT_CREATE_TASK,
      submitFunction:handleSubmit
    })
  }, []);

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p className="font-weight-bold">Project</p>
          <select
            name="projectId"
            className="form-control"
            onChange={(e)=>{
              //dispatch giá trị làm thay đổi arrUser
              let{value}=e.target;
              dispatch({
                type:GET_USER_BY_PROJECT_ID_SAGA,
                idProject:value
              })
              //cập nhật giá trị cho prkojectId
              setFieldValue("projectId",e.target.value);
            }}
          >
            {arrProject.map((project, index) => {
              return (
                <option key={index} value={project.id}>
                  {project.projectName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Task Name</p>
          <input
            name="taskName"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Status</p>
          <select
            className="form-control"
            name="statusId"
            onChange={handleChange}
          >
            {arrStatus.map((status, index) => {
              return (
                <option key={index} value={status.statusId}>
                  {status.statusName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p className="font-weight-bold">Priority</p>
              <select
                name="priorityId"
                className="form-control"
                onChange={handleChange}
              >
                {arrPriority.map((priority, index) => {
                  return (
                    <option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <p className="font-weight-bold">Task type</p>
              <select
                className="form-control"
                name="typeId"
                onChange={handleChange}
              >
                {arrTaskType.map((taskType, index) => {
                  return (
                    <option key={index} value={taskType.id}>
                      {taskType.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <p className="font-weight-bold">Assignees</p>
              <Select
                mode="multiple"
                size={size}
                options={userOptions}
                placeholder="Please select"
                optionFilterProp="label"
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                onSelect={(value) => {
                  console.log(value);
                }}
                style={{ width: "100%" }}
              >
                {children}
              </Select>
              <div className="row mt-3">
                <div className="col-12">
                  <p className="font-weight-bold">Original Estimate</p>
                  <input
                    type="number"
                    min="0"
                    name="originalEstimate"
                    defaultValue="0"
                    className="form-control"
                    height="30"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <p className="font-weight-bold">Time tracking</p>
              <Slider
                defaultValue={30}
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
              />
              <div className="row">
                <div className="col-6 text-left">
                  {timeTracking.timeTrackingSpent}h logged
                </div>
                <div className="col-6 text-right">
                  {timeTracking.timeTrackingRemaining}h remaining
                </div>
              </div>
              <div className="row" style={{ marginTop: 5 }}>
                <div className="col-6">
                  <p>Time spent</p>
                  <input
                    type="number"
                    defaultValue="0"
                    min="0"
                    className="form-control"
                    name="timeTrackingSpent"
                    onChange={(e) => {
                      setTimetracking({
                        ...timeTracking,
                        timeTrackingSpent: e.target.value,
                      });
                      setFieldValue("timeTrackingSpent", e.target.value);
                    }}
                  />
                </div>

                <div className="col-6">
                  <p>Time remaining</p>
                  <input
                    type="number"
                    defaultValue="0"
                    min="0"
                    className="form-control"
                    name="timeTrackingRemaining"
                    onChange={(e) => {
                      setTimetracking({
                        ...timeTracking,
                        timeTrackingRemaining: e.target.value,
                      });
                      setFieldValue("timeTrackingRemaining", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <p className="font-weight-bold">Description</p>
          <Editor
            name="description"
            apiKey="your-api-key"
            initialValue=""
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
            onEditorChange={handleEditorChange}
          />
        </div>
      </form>
    </>
  );
}

const createTaskFormik = withFormik({
  //Ham lay gia tri mac dinh dau tien
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProject, arrPriority, arrTaskType, arrStatus } = props;
    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },

  validationSchema: Yup.object().shape({}),

  // Custom sync validation
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_TASK_SAGA,
      newTask: values,
    });
    console.log("newTask", values);
  },
  displayName: "CreateTask Jira",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectJiraReducer.arrProject,
    arrPriority: state.PriorityJiraReducer.arrPriority,
    arrTaskType: state.TaskTypeJiraReducer.arrTaskType,
    arrStatus: state.StatusJiraReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(createTaskFormik);
