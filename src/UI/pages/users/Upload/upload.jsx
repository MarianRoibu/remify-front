import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import postImage from "../../../../api/images/postImage";
import postGif from "../../../../api/gifs/postGif";
import { store } from "../../../../utils/store";
import styled from "styled-components";
import Navbar from "../../../components/navBar.jsx/NavBar";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;

`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: black;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  appearance: none;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
`;

const Option = styled.option`
  background-color: #fff;
  color: #000;
`;


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
    <>
    <Navbar />
    <FormContainer>
      <Label>
      Select upload type:
          <Select value={uploadType} onChange={handleUploadTypeChange}>
            <Option value="image">Image</Option>
            <Option value="gif">GIF</Option>
          </Select>
      </Label>

      {uploadType === "image" && (
        <Form onSubmit={handleImageUpload}>
          <Label htmlFor="imageTitle">Image Title</Label>
          <Input type="text" id="imageTitle" name="imageTitle" />

          <Label htmlFor="artist">Artist</Label>
          <Input type="text" id="artist" name="artist" />

          <Label htmlFor="imgMeme">Image File (JPG, JPEG, PNG)</Label>
          <Input
            type="file"
            id="imgMeme"
            name="imgMeme"
            accept=".jpg, .jpeg, .png"
          />

          <Label htmlFor="release">Release</Label>
          <Input type="date" id="release" name="release" />

          <Button type="submit">Upload Image</Button>
        </Form>
      )}

      {uploadType === "gif" && (
        <Form onSubmit={handleGifUpload}>
          <Label htmlFor="gifTitle">GIF Title</Label>
          <Input type="text" id="gifTitle" name="gifTitle" />

          <Label htmlFor="gifArtist">Artist</Label>
          <Input type="text" id="gifArtist" name="gifArtist" />

          <Label htmlFor="gifMeme">GIF File (GIF)</Label>
          <Input
            type="file"
            id="gifMeme"
            name="gifMeme"
            accept=".gif"
          />

          <Label htmlFor="gifRelease">Release</Label>
          <Input type="date" id="gifRelease" name="gifRelease" />

          <Button type="submit">Upload GIF</Button>
        </Form>
      )}
    </FormContainer>
    </>
  );
}