import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import fetchGifsAll from "../../../../../api/gifs/getAll";

function GifGallery() {
  const { getAccessTokenSilently } = useAuth0();
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const token = await getAccessTokenSilently();
        const fetchedGifs = await fetchGifsAll(token);
        setGifs(fetchedGifs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchGifs();
  }, [getAccessTokenSilently]);

  return (
    <div>
      {isLoading ? (
        <p>Loading images...</p>
      ) : (
        <div>
          {gifs.map((gif) => (
            <img key={gif._id} src={gif.gif.secure_url} alt={gif.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GifGallery;
