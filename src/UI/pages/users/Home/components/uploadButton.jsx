import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import styled from "styled-components";

const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #007bff;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const UploadButton = ({ to, text }) => {
  const { isAuthenticated } = useAuth0();



 return isAuthenticated ? (
  <NavLink to="upload" activeClassName="active">
  <Button>{text}</Button>
    </NavLink>
  ) : null;
};

export default UploadButton;
