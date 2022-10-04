/** @format */

import { Fragment } from "react";
import { Route } from "react-router-dom";
import { Box, CssBaseline, Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export const UserLoginTemplate = (props) => {
  const { Component, ...restProps } = props;
  const theme = createTheme();
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <ThemeProvider theme={theme}>
              <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={7}
                  md={5}
                  sx={{
                    backgroundImage: `url(/assets/img/banner.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                      t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Grid item xs={12} sm={5} md={7} component={Paper} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Component {...propsRoute} />
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
          </Fragment>
        );
      }}
    />
  );
};
