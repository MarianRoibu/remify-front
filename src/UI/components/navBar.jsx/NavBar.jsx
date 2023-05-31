import React from "react";
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react';
import ProfileButton from "../../pages/users/Home/components/profileButton";
import { store } from "../../../utils/store";
import UploadButton from "../../pages/users/Home/components/uploadButton";
import SearchBar from "../SearchBar/SearchBar";


const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 70px;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  margin-top: 1vh;
  & > :first-child {
    margin-right: 2vh;
}

  & > :last-child {
    margin-top: 0.2vh;
    margin-right: 2vh;
    
  }
`;

const NavLink = styled.li`
    
    font-size: 2rem;
    margin-right: 2vh;
  &:first-child {
    margin-right: 20vh;
  }

  a {
    color: #333333;
    text-decoration: none;
    position: relative;

    &:hover {
      color: #35bcbf;
    }
  }
`;

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

const AuthButtons = styled.div`
  display: flex;
`;

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const user = store.getState().user.data;

  console.log(user);

  return (
    <NavbarContainer>
      <Logo href="/">Remify</Logo>
      <NavLinks>
      <NavLink>
           <SearchBar />
           </NavLink>  
        {!isAuthenticated ? (
          <AuthButtons>
            <Button onClick={loginWithRedirect}>Login</Button>
          </AuthButtons>
        ) : (
            <>    
            <NavLink>
            <UploadButton text="upload" />
          </NavLink>
          <NavLink>
            <ProfileButton />
          </NavLink>
           
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;