import React, { useState, useEffect } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverAPI } from "../../../..";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverAPI}admin/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        // Store the JWT token in local storage
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getRootUser = async () => {
    try {
      const res = await axios.get(`${serverAPI}admin/is-login`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserData(res.data.user);
      } else {
        navigate("/dashboard/auth-login");
      }
    } catch (error) {
      navigate("/dashboard/auth-login");

      console.log(error);
    }
  };

  useEffect(() => {
    getRootUser();
  }, [userData]);
  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">Administrator</div>
            <div className="user-name dropdown-indicator">{userData.name}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>AB</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{userData.name}</span>
              <span className="sub-text">{userData.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            {/* <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
          </LinkList>
        </div>
        <div className="dropdown-inner" onClick={handleLogout}>
          <LinkList>
            <Icon name="signout"></Icon>
            <span style={{ cursor: "pointer" }}>Sign Out</span>
          </LinkList>
        </div>
      </DropdownMenu>
      <ToastContainer />
    </Dropdown>
  );
};

export default User;
