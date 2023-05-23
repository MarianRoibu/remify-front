import React from "react"
import { Logout } from "./components/Logout"
import ImageGallery from "./components/images"
import UploadButton from "./components/uploadButton"
import GifGallery from "./components/gifs"

export function HomePage() {
    return (
        <div>
        <h1>Home</h1>
        <Logout />
        <ImageGallery />
        <GifGallery />
        <UploadButton text="upload" />
        </div>
    )
}