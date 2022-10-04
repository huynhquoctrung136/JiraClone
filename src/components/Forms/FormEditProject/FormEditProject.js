/** @format */
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../redux/constants/DrawerJiraConstanst";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { EDIT_PROJECT_LIST_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/ProjectJiraConstants";

function FormEditProject(props) {
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

  const { arrCategory } = useSelector((state) => state.ProjectCategoryReducer);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT,
      submitFunction: handleSubmit,
    });
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  return (
    <>
      <form className="container-fluid" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <p className="font-weight-bold">Project Id</p>
              <input
                onChange={handleChange}
                value={values.id}
                disabled
                className="form-control"
                name="id"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p className="font-weight-bold">Project Name</p>
              <input
                value={values.projectName}
                className="form-control"
                name="projectName"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <p className="font-weight-bold">Project Category</p>
              <select
                onChange={handleChange}
                className="form-control"
                name="categoryId"
                value={values.categoryId}
              >
                {arrCategory?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.projectCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <p className="font-weight-bold">Description</p>
              <Editor
                name="description123"
                apiKey="your-api-key"
                initialValue={values.description}
                value={values.description}
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
          </div>
        </div>
      </form>
    </>
  );
}

const editProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },

  validationSchema: Yup.object().shape({}),

  // Custom sync validation
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type:EDIT_PROJECT_LIST_SAGA,
      projectUpdate:values
    })
  },
  displayName: "EditProject Jira",
})(FormEditProject);

const mapStateToProps = (state) => {
  return {
    projectEdit: state.ProjectJiraReducer.projectEdit,
  };
};

export default connect(mapStateToProps)(editProjectFormik);
