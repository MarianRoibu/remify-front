import React from "react";
import { NavLink } from "react-router-dom";

const UploadButton = ({ to, text }) => {
  return (
    <NavLink to="upload" activeClassName="active">
      <button>{text}</button>
    </NavLink>
  );
};

export default UploadButton;
