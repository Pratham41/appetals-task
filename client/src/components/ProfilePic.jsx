import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilePic = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { userData } = userUpdate;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setImage(userInfo.avatar);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setImage(userData.avatar);
    }
  }, [userData]);

  return (
    <>
      {userInfo && userInfo?.avatar ? (
        <img src={image} style={{borderRadius:"25px"}} alt="" height="45%" width="45%" />
      ) : (
        <i className="fa-solid fa-user-tie fa-5x"></i>
      )}

      <h4 className="mt-2"> {name.toUpperCase()} </h4>
    </>
  );
};

export default ProfilePic;
