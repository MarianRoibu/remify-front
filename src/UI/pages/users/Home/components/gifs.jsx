import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import fetchGifsAll from "../../../../../api/gifs/getAll";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 10vh auto;
  grid-gap: 10px;
  max-width: 720px;
`;

const GifContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const Gif = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;


function GifGallery() {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const fetchedGifs = await fetchGifsAll();
        setGifs(fetchedGifs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchGifs();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading content...</p>
      ) : (
        <GalleryContainer>
          {gifs.map((gif) => (
            <div>
            <NavLink to={`/giffull/${gif._id}`}>
            <GifContainer key={gif._id}>
              <Gif src={gif.gif.secure_url} alt={gif.title} />
            </GifContainer>
            </NavLink>
            <p>{gif.title}</p>
            <p>{gif.artist}</p>
            </div>
          ))}
        </GalleryContainer>
      )}
    </div>
  );
}

export default GifGallery;