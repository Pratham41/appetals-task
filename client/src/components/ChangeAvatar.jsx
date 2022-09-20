import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Loader from "./Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/actions/user";

const ChangeAvatar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingLogin, error: errorLogin, userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, userData } = userUpdate;

  const [imageData, setImageData] = useState("");
  const [uploading, setUploading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      update(
        userInfo.email,
        userInfo.name,
        userInfo.mobile,
        imageData
      )
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImageData(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (userInfo) {
      setImageData(userInfo.avatar);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userData) {
      setImageData(userData.avatar);
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
          <Form.Group controlId="File Input" className="my-2">
            <Form.Label>File Input</Form.Label>
            <Form.Control
              type="file"
              placeholder="Enter name"
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
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

export default ChangeAvatar;
