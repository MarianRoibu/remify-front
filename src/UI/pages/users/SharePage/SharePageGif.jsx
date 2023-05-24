import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import getGifById from "../../../../api/gifs/getById";
import styled from "styled-components";
import Navbar from "../../../components/navBar.jsx/NavBar";

const GifPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GifTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const GifWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

const Gif = styled.img`
  width: 100%;
`;

const ShareButton = styled.button`
  background-color: #3897f0;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  margin-top: 16px;
  cursor: pointer;
`;

export function GifPage() {
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [gif, setGif] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = await getAccessTokenSilently();
          const gifResponse = await getGifById(id, token);
          setGif(gifResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [id, getAccessTokenSilently]);
  
    const handleShare = () => {
        if (navigator.share) {
          navigator
            .share({
              title: gif.title,
              text: "Check out this image!",
              url: window.location.href
            })
            .then(() => console.log("Image shared successfully"))
            .catch((error) => console.error("Error sharing image:", error));
        } else {
          // Fallback for browsers that don't support the Web Share API
          const shareUrl = window.location.href;
          const shareTitle = gif.title;
          
          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(shareUrl)
              .then(() => {
                // Show a notification or feedback message
                console.log("URL copied to clipboard");
              })
              .catch((error) => {
                console.error("Error copying URL to clipboard:", error);
              });
          }
          
          // Create a custom share dialog
          const shareDialog = document.createElement("div");
          shareDialog.classList.add("share-dialog");
          
          const shareText = document.createElement("p");
          shareText.textContent = "Copy the URL below to share the image:";
          
          const shareInput = document.createElement("input");
          shareInput.value = shareUrl;
          shareInput.readOnly = true;
          
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy URL";
          copyButton.addEventListener("click", () => {
            if (navigator.clipboard) {
              navigator.clipboard
                .writeText(shareUrl)
                .then(() => {
                  // Show a notification or feedback message
                  console.log("URL copied to clipboard");
                })
                .catch((error) => {
                  console.error("Error copying URL to clipboard:", error);
                });
            }
          });
          
          shareDialog.appendChild(shareText);
          shareDialog.appendChild(shareInput);
          shareDialog.appendChild(copyButton);
          
          document.body.appendChild(shareDialog);
        }
      };
  
    if (!gif) {
      return <p>Loading image...</p>;
    }
  
    return (
      <>
      <Navbar />
        <GifPageContainer>
          <GifTitle>{gif.title}</GifTitle>
          <GifWrapper>
            <Gif src={gif.gif.secure_url} alt={gif.title} />
          </GifWrapper>
          <ShareButton onClick={handleShare}>Share</ShareButton>
        </GifPageContainer>
        </>
      );
    }