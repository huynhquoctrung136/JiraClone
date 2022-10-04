import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../../redux/constants/ProjectJiraConstants";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

function CreateProject(props) {
  const { handleChange, handleSubmit, setFieldValue } = props;

  const { arrCategory } = useSelector((state) => state.ProjectCategoryReducer);
  const dispatch = useDispatch();
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  return (
    <>
      <div className="container mt-3">
      <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
            <li className="breadcrumb-item">Project</li>
            <li className="breadcrumb-item">CyberLearn</li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Project
            </li>
          </ol>
        </nav>
      </div>
        <h3>Create Project</h3>
        <form onSubmit={handleSubmit} onChange={handleChange}>
          <div className="form-group">
            <p>Name</p>
            <input className="form-control" name="projectName" />
          </div>
          <div className="form-group">
            <p>Description</p>

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
          <div className="form-group">
            <select
              name="categoryId"
              className="form-control"
              onChange={handleChange}
            >
              {arrCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn btn-outline-primary" type="submit">
            Create Project
          </button>
        </form>
      </div>
    </>
  );
}

const createProjectFormik = withFormik({
  //Ham lay gia tri mac dinh dau tien
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrCategory[0]?.id,
    };
  },

  validationSchema: Yup.object().shape({}),

  // Custom sync validation
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },
  displayName: "CreateProject Jira",
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    arrCategory: state.ProjectCategoryReducer.arrCategory,
  };
};

export default connect(mapStateToProps)(createProjectFormik);
