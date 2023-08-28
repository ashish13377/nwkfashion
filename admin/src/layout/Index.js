import React ,{ useEffect, useState} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import axios from "axios";
import { serverAPI } from "..";
import FileManagerProvider from "../pages/app/file-manager/components/Context";

const Layout = ({title, ...props}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const getRootUser = async () => {
    try {
      const res = await axios.get(`${serverAPI}admin/is-login`, {
        withCredentials: true
      });
      if(res.status === 200){
        setUserData(res.data.user)
      }else{
        navigate("/admin/auth-login")
      }
    } catch (error) {
      navigate("/admin/auth-login")

      console.log(error);
    }
  };

  useEffect(() => {
    getRootUser();
  }, [userData])

  return (
    <FileManagerProvider>
      <Head title={!title && 'Loading'} />
      <AppRoot>
        <AppMain>
          <Sidebar fixed />
          <AppWrap>
            <Header fixed />
              <Outlet />
            <Footer />
          </AppWrap>
        </AppMain>
      </AppRoot>
    </FileManagerProvider>
  );
};
export default Layout;
