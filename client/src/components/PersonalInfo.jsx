import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/actions/user";

const PersonalInfo = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, userData } = userUpdate;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      update(
        email,
        name,
        mobile,
        userInfo.avatar
      )
    );
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setMobile(userInfo.mobile);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setMobile(userData.mobile);
    }
  }, [userData]);

  return (
    <>
      <FormContainer>
        {error && <h4 variant="danger">{error}</h4>}
        {loading && <Loader />}
        {errorLogin && <h4 variant="danger">{errorLogin}</h4>}
        {loadingLogin && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              autoComplete="off"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="mobile" className="my-2">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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

export default PersonalInfo;
