import React from "react";
import LogoLight2x from "../../images/logo2x.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import LogoSmall from "../../images/logo png.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`/admin/`} className="logo-link">
      <img className="logo-small logo-img logo-img-small" src={LogoSmall} alt="logo" />
    </Link>
  );
};

export default Logo;
