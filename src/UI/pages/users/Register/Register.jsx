import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_DATA_USER } from "../../../../utils/reducers/user";
import { store } from "../../../../utils/store";
import { Skeleton } from "antd";
import postUser from "../../../../api/users/postUser";

function Register() {
    const navigate = useNavigate();
    const { user, getAccessTokenSilently, isLoading: isLoadingUser } = useAuth0();
  
    const [error, setError] = useState({ status: "unset", msg: "" });
  
    const [isArtist, setIsArtist] = useState(false);
  
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
  
      isArtist &&
        setUserData({
          ...userData,
          role: 2
        });
  
      const token = await getAccessTokenSilently();
  
      const createUser = await postUser(userData, token);
  
      console.log(createUser);
  
      if (!createUser.status) {
        setError(createUser);
        return;
      }
  
      store.dispatch(ADD_DATA_USER(createUser));
  
      navigate("/");
    };
  
    return isLoadingUser ? (
      <Skeleton />
    ) : (
      <div className="container-upload">
        <form onSubmit={handleSubmit}>
          <div className="section-text">
            <h1>Hi {user?.name?.split(" ")[0]}!</h1>
            <p>Tell us a little about you</p>
          </div>
          <div className="container-inputs">
            <label htmlFor="username">Write your Username</label>
            <input
              id="username"
              type="text"
              value={userData.username}
              maxLength={20}
              onChange={(ev) => handleUsername(ev)}
              required
            />
          </div>
          <div className="container-inputs">
            <label htmlFor="isArtist">Are you an artist?</label>
            <div className="container-buttons-artist">
              <button
                className={isArtist ? "active" : ""}
                type="button"
                onClick={() => setIsArtist(true)}
              >
                Yes
              </button>
              <button
                className={!isArtist ? "active" : ""}
                type="button"
                onClick={() => setIsArtist(false)}
              >
                No
              </button>
            </div>
          </div>
          {!error.status && <p className="error-message">{error.msg}</p>}
          <span className="privacy-policy-span">
            By clicking continue you accept our Terms and Conditions.
          </span>
          <div className="container-finish-button">
            <button className="button-upload-album" type="submit">
              Finish
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export { Register };