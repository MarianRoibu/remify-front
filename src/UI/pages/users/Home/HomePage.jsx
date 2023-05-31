import React from "react"
import ImageGallery from "./components/images"
import GifGallery from "./components/gifs"
import Navbar from "../../../components/navBar.jsx/NavBar"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { store } from "../../../../utils/store"
import { useQuery } from "react-query"
import { ADD_DATA_USER } from "../../../../utils/reducers/user"
import getUserBySub from "../../../../api/users/getBySub"
import { useState } from "react"


export function HomePage() {
    const { isLoading: isLoadingAuth, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const reduxUser = store.getState().user;
    const [selectedOption, setSelectedOption] = useState("all");
  
    const userAction = async (user) => {
      switch (user?.status) {
        case true:
          store.dispatch(ADD_DATA_USER(user));
          if (window.location.pathname !== "/register") {
            navigate(window.location.pathname || "/");
            return;
          }
          navigate("/");
          break;
        default:
          navigate("/register");
          break;
      }
    };
  
    const { isLoading } = useQuery(
      ["user"],
      async () => {
        const token = await getAccessTokenSilently();
        const data = await getUserBySub(token);
        await userAction(data);
        return data;
      },
      {
        enabled: !reduxUser.status,
      }
    );
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div>
        <Navbar />
        <div>
          <input
            type="radio"
            id="option-all"
            name="options"
            value="all"
            checked={selectedOption === "all"}
            onChange={() => handleOptionChange("all")}
          />
          <label htmlFor="option-all">All</label>
  
          <input
            type="radio"
            id="option-images"
            name="options"
            value="images"
            checked={selectedOption === "images"}
            onChange={() => handleOptionChange("images")}
          />
          <label htmlFor="option-images">Images</label>
  
          <input
            type="radio"
            id="option-gifs"
            name="options"
            value="gifs"
            checked={selectedOption === "gifs"}
            onChange={() => handleOptionChange("gifs")}
          />
          <label htmlFor="option-gifs">GIFs</label>
        </div>
  
        {selectedOption === "all" && (
          <>
            <ImageGallery />
            <GifGallery />
          </>
        )}
  
        {selectedOption === "images" && <ImageGallery />}
  
        {selectedOption === "gifs" && <GifGallery />}
      </div>
    );
  }