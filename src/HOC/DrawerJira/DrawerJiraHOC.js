/** @format */

import { Button, Drawer, Space } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/constants/DrawerJiraConstanst";

const DrawerJiraHOC = (value) => {
  const { visible, ComponentContentDrawer, callBackSubmit,title } = useSelector(
    (state) => state.DrawerReducer
  );
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="submit" name={value.toString()}>
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
};
export default DrawerJiraHOC;
