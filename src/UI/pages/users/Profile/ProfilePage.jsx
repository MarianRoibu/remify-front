import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import Navbar from "../../../components/navBar.jsx/NavBar";
import fetchManyImageById from "../../../../api/images/getMayById";
import fetchManyGifById from "../../../../api/gifs/getManygifById";
import { NavLink } from "react-router-dom";
import { Logout } from "../../../components/navBar.jsx/components/Logout";


const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30vh;
`;

const ProfileImage = styled.img`
  z-index: 5;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  font-size: 18px;
  color: #333;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  margin-top: 32px;
`;

const ImageItem = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const GifItem = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProfilePage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [images, setImages] = useState([]);
  const [gifs, setGifs] = useState([]);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const imageResponse = await fetchManyImageById(user.images, token);
        setImages(imageResponse.data);
        const gifResponse = await fetchManyGifById(user.gifs, token);
        setGifs(gifResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [getAccessTokenSilently, user]);

  return (
    <>
      <Navbar />
      <ProfileContainer>
        <ProfileImage src={user.img.secure_url} alt="Profile" />
        <ProfileDetails>
          <div>Email: {user.email}</div>
          <div>Name: {user.name}</div>
          <div>Username: {user.username}</div>
        </ProfileDetails>
        <Logout />
      </ProfileContainer>
      <ImageGallery>
        {images && images.length && images.map((image) => (
            <NavLink to={`/imagefull/${image._id}`}>
          <ImageItem key={image._id} src={image.img.secure_url} alt="userImg" />
          </NavLink>
        ))}
        {gifs && gifs.length && gifs.map((gif) => (
        <NavLink to={`/giffull/${gif._id}`}>
          <GifItem key={gif._id} src={gif.gif.secure_url} alt="userGif" />
        </NavLink>
        ))}
      </ImageGallery>
    </>
  );
};

export { ProfilePage };