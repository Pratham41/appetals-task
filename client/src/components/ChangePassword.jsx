import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../redux/actions/user";
import Loader from "./Loader";

const ChangePassword = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  const updatePassword = useSelector((state) => state.updatePassword);
  const { loading, error, userUpdatedData } = updatePassword;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword === retypeNewPassword) {
      dispatch(
        updateUserPassword(
          userInfo.email,
          userInfo.name,
          userInfo.mobile,
          userInfo.avatar,
          currentPassword,
          newPassword
        )
      );
    }
  };

  useEffect(() => {}, [userInfo]);

  useEffect(() => {
    if(userUpdatedData){
      setCurrentPassword("");
      setNewPassword("")
      setRetypeNewPassword("")
    }
  }, [userUpdatedData]);

  return (
    <>
      <FormContainer>
        {error && <h4 variant="danger">{error}</h4>}
        {loading && <Loader />}
        {errorLogin && <h4 variant="danger">{errorLogin}</h4>}
        {loadingLogin && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="new password" className="my-2">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="retype new password" className="my-2">
            <Form.Label>Retype New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype new password"
              value={retypeNewPassword}
              onChange={(e) => setRetypeNewPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="my-2 btn btn-primary">
            Save
          </Button>
          <Button type="button" className="my-2 ms-2 btn btn-danger">
            Cancel
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ChangePassword;
