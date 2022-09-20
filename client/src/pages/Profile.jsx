import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import ChangeAvatar from "../components/ChangeAvatar";
import ChangePassword from "../components/ChangePassword";
import PersonalInfo from "../components/PersonalInfo";
import ProfilePic from "../components/ProfilePic";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [key, setKey] = useState("Personal Info");

  let navigate = useNavigate(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Container className="shadow my-4 py-4">
        <Row>
          <Col
            className="d-flex flex-column justify-content-center align-items-center"
            xs={12}
            md={6}
            lg={3}
          >
            <ProfilePic />
          </Col>
          <Col xs={12} md={6} lg={9}>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="Personal Info" title="Personal Info">
                <PersonalInfo />
              </Tab>
              <Tab eventKey="Change Avatar" title="Change Avatar">
                <ChangeAvatar />
              </Tab>
              <Tab eventKey="Change Password" title="Change Password">
                <ChangePassword />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
