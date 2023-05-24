import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_DATA_USER } from "../../../../utils/reducers/user";
import { store } from "../../../../utils/store";
import { Skeleton } from "antd";
import postUser from "../../../../api/users/postUser";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const SectionText = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    color: #777;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContainerInputs = styled.div`
  margin-bottom: 20px;

  label {
    font-size: 16px;
    font-weight: 600;
  }

  input {
    width: 300px;
    height: 40px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 8px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #35bcbf;
    }
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: 14px;
  margin-top: 8px;
`;

const PrivacyPolicySpan = styled.span`
  font-size: 14px;
  color: #777;
  margin-top: 16px;
`;

const ContainerFinishButton = styled.div`
  margin-top: 20px;
`;

const FinishButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  transition: width 0.3s ease;
  background-color: white;
  color: black;

`;

function Register() {
    const navigate = useNavigate();
    const { user, getAccessTokenSilently, isLoading: isLoadingUser } = useAuth0();
  
    const [error, setError] = useState({ status: "unset", msg: "" });
  
    
  
    const [userData, setUserData] = useState({
      name: user?.name || "",
      email: user?.email,
      picture: user?.picture || "",
      sub: user?.sub,
      username: ""
    });
  
    const handleUsername = (ev) => {
      if (ev.nativeEvent.data === "-" && userData.username.includes("-")) {
        return;
      }
  
      const regex = /[^a-z0-9-]/g;
  
      const username = ev.target.value.replace(regex, "");
  
      setUserData({
        ...userData,
        username: username
      });
    };
  
    const handleSubmit = async (ev) => {
      ev.preventDefault();
  
  
      const token = await getAccessTokenSilently();
  
      const createUser = await postUser(userData, token);
  
      console.log(createUser);
  
      if (createUser.status) {
        setError(createUser);
        return;
      }
  
      store.dispatch(ADD_DATA_USER(createUser));
  
      navigate("/");
    };
  
    return isLoadingUser ? (
      <Skeleton />
    ) : (
      <Container>
      <Form onSubmit={handleSubmit}>
        <SectionText>
          <h1>Hi {user?.name?.split(" ")[0]}!</h1>
          <p>Tell us a little about you</p>
        </SectionText>
        <ContainerInputs>
          <label htmlFor="username">Write your Username</label> <br/>
          <Input
            id="username"
            type="text"
            value={userData.username}
            maxLength={20}
            onChange={(ev) => handleUsername(ev)}
            required
          />
        </ContainerInputs>
        {!error.status && <ErrorMessage>{error.msg}</ErrorMessage>}
        <PrivacyPolicySpan>
          By clicking continue you accept our Terms and Conditions.
        </PrivacyPolicySpan>
        <ContainerFinishButton>
          <FinishButton type="submit">Finish</FinishButton>
        </ContainerFinishButton>
      </Form>
    </Container>
    );
  }
  
  export { Register };