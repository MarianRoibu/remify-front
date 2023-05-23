import React from "react"
import { Logout } from "./components/Logout"
import ImageGallery from "./components/images"
import UploadButton from "./components/uploadButton"

export function HomePage() {
    return (
        <div>
        <h1>Home</h1>
        <Logout />
        <ImageGallery />
        <UploadButton text="upload" />
        </div>
    )
}