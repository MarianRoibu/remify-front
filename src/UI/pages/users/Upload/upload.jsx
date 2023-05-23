import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import postImage from "../../../../api/images/postImage";
import postGif from "../../../../api/gifs/postGif";
import { store } from "../../../../utils/store";

export function ImageUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const user = store.getState().user.data;
  const [uploadType, setUploadType] = useState("image");

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

  const handleGifUpload = async (event) => {
    event.preventDefault();
    setIsUploading(true);

    const data = {
      owner: user._id,
      gifTitle: event.target.gifTitle.value,
      artist: event.target.gifArtist.value,
      gifMeme: event.target.gifMeme.files,
      release: event.target.gifRelease.value,
    };
    console.log('this is the data gif:', data);
    const token = await getAccessTokenSilently();
    const response = await postGif(data, token);
    console.log(response);

    setIsUploading(false);
  };

  const handleUploadTypeChange = (event) => {
    setUploadType(event.target.value);
  };

  if (isUploading) {
    return (
      <div>
        <p>Uploading image...</p>
      </div>
    );
  }

  return (
    <div>
      <label>
        Select upload type:
        <select value={uploadType} onChange={handleUploadTypeChange}>
          <option value="">Choose</option>
          <option value="image">Image</option>
          <option value="gif">GIF</option>
        </select>
      </label>

      {uploadType === "image" && (
        <form onSubmit={handleImageUpload}>
          <label htmlFor="imageTitle">Image Title</label>
          <input type="text" id="imageTitle" name="imageTitle" />

          <label htmlFor="artist">Artist</label>
          <input type="text" id="artist" name="artist" />

          <label htmlFor="imgMeme">Image File</label>
          <input type="file" id="imgMeme" name="imgMeme" accept="image/*" />

          <label htmlFor="release">Release</label>
          <input type="date" id="release" name="release" />

          <button type="submit">Upload Image</button>
        </form>
      )}

      {uploadType === "gif" && (
        <form onSubmit={handleGifUpload}>
          <label htmlFor="gifTitle">GIF Title</label>
          <input type="text" id="gifTitle" name="gifTitle" />

          <label htmlFor="gifArtist">Artist</label>
          <input type="text" id="gifArtist" name="gifArtist" />

          <label htmlFor="gifMeme">GIF File</label>
          <input type="file" id="gifMeme" name="gifMeme" accept="image/*" />

          <label htmlFor="gifRelease">Release</label>
          <input type="date" id="gifRelease" name="gifRelease" />

          <button type="submit">Upload GIF</button>
        </form>
      )}
    </div>
  );
}