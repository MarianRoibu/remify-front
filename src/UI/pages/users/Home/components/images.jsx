import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import fetchImagesAll from "../../../../../api/images/getAll";

function ImageGallery() {
  const { getAccessTokenSilently } = useAuth0();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = await getAccessTokenSilently();
        const fetchedImages = await fetchImagesAll(token);
        setImages(fetchedImages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [getAccessTokenSilently]);

  return (
    <div>
      {isLoading ? (
        <p>Loading images...</p>
      ) : (
        <div>
          {images.map((image) => (
            <img key={image._id} src={image.img.secure_url} alt={image.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
