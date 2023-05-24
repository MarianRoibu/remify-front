import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import fetchImagesAll from "../../../../../api/images/getAll";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 10vh auto;
  grid-gap: 10px;
  max-width: 720px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await fetchImagesAll();
        setImages(fetchedImages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
    {isLoading ? (
      <p>Loading images...</p>
    ) : (
  
      <GalleryContainer>
        {images.map((image) => (
        <div>
          <NavLink to={`/imagefull/${image._id}`}>
          <ImageContainer key={image._id}>
          <Image src={image.img.secure_url} alt={image.title} />
          </ImageContainer>
          </NavLink>

          <p>{image.title}</p>
          <p>{image.artist}</p>
          </div>
        ))}
      </GalleryContainer>
    )}
  </div>
  );
};

export default ImageGallery;