import React from "react";
import { Fragment } from "react";
import { Box, Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { signInJiraAction } from "../../redux/actions/UserJiraAction";

function LoginPage(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <Fragment>
      <Box maxWidth={400}>
        <Typography
          align="center"
          sx={{
            fontSize: 60,
            fontWeight: "900",
            background: "linear-gradient(225deg, #D665FF 0%, #4C6FFF 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            textShadow: "0px 27px 54px rgba(75, 77, 237, 0.2)",
          }}
          component="h1"
        >
          LOGIN
        </Typography>
        <Typography
          textTransform="uppercase"
          fontWeight="bold"
          color="black"
          component="h1"
          variant="h5"
          marginTop={4}
        >
          ĐĂNG NHẬP
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            name="email"
            fullWidth
            size="small"
            margin="normal"
            label="Email"
            variant="outlined"
            helperText="e.g. name@gmail.com"
          />

          <TextField
            onChange={handleChange}
            name="password"
            fullWidth
            type="password"
            size="small"
            margin="normal"
            label="Password"
            variant="outlined"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "end",
            }}
            mt={3}
          >
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "rgb(102,117,223)",
                color: "#fff",
              }}
            >
              Đăng Nhập
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            mt={5}
          >
            <IconButton
              style={{
                background: "rgb(102,117,223)",
                color: "#fff",
                marginLeft: "5px",
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              style={{
                background: "rgb(102,117,223)",
                color: "#fff",
                marginLeft: "5px",
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              style={{
                background: "rgb(102,117,223)",
                color: "#fff",
                marginLeft: "5px",
              }}
            >
              <GoogleIcon />
            </IconButton>
          </Box>
        </form>
      </Box>
    </Fragment>
  );
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required!")
      .email("email is invalid!"),
    password: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password  have max 32 characters"),
  }),

  // Custom sync validation
  handleSubmit: ({email,password}, { props, setSubmitting }) => {
    
    setSubmitting(true);
    props.dispatch(signInJiraAction(email,password));

  },
  displayName: "Login Jira",
})(LoginPage);

export default connect()(LoginWithFormik);
