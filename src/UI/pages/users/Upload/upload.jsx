import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import postImage from "../../../../api/images/postImage";
import { store } from "../../../../utils/store";

export function ImageUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const user = store.getState().user.data;

  const handleImageUpload = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    const data = {
      owner: user._id,
      imageTitle: event.target.imageTitle.value,
      artist: event.target.artist.value,
      imgMeme: event.target.imgMeme.files,
      release: event.target.release.value,
    };

    const token = await getAccessTokenSilently();
    const response = await postImage(data, token);
    console.log(response);

    setIsUploading(false);
  };

  if (isUploading) {
    return (
      <div>
        <p>Uploading image...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleImageUpload}>
      <label htmlFor="imageTitle">Image Title</label>
      <input type="text" id="imageTitle" name="imageTitle" />

      <label htmlFor="artist">Artist</label>
      <input type="text" id="artist" name="artist" />

      <label htmlFor="imgMeme">Image File</label>
      <input type="file" id="imgMeme" name="imgMeme" accept="image/*" />

      <label htmlFor="release">Release</label>
      <input type="date" id="release" name="release" />

      <button type="submit">Upload</button>
    </form>
  );
}
