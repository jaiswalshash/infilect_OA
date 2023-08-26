import React, { useState } from "react";
import Image from "../components/ImageViewer";
import i1 from "../assets/Image1.jpg";
import i2 from "../assets/Image2.jpg";
import i3 from "../assets/Image3.webp";
import i4 from "../assets/Image4.jpg";
import i5 from "../assets/Image5.jpg";
import left from "../assets/left.png";
import right from '../assets/right.png';
import "./main.css";

const Main = () => {
  // List of images with their IDs and sources
  const images = [
    { imageID: "Image 1", image: i1 },
    { imageID: "Image 2", image: i2 },
    { imageID: "Image 3", image: i3 },
    { imageID: "Image 4", image: i4 },
    { imageID: "Image 5", image: i5 },
  ];

  // State to keep track of the currently displayed image index
  const [currentImageIndex, setCurrentImageIndex] = useState(4);

  // State to trigger the reset of the Image component
  const [resetImage, setResetImage] = useState(false);

  // Function to handle clicking the 'Previous' button
  const handlePrevClick = () => {
    // Update the current image index, considering loop-around
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );

    // Trigger a reset of the Image component
    setResetImage(true);
  };

  // Function to handle clicking the 'Next' button
  const handleNextClick = () => {
    // Update the current image index, considering loop-around
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );

    // Trigger a reset of the Image component
    setResetImage(true);
  };

  // Function to reset the state of the Image component
  const resetImageComponent = () => {
    setResetImage(false);
  };

  return (
    <>
      {/* Display the currently selected image */}
      <Image
        key={images[currentImageIndex].imageID} // Use key to force re-render
        imageID={images[currentImageIndex].imageID}
        image={images[currentImageIndex].image}
        reset={resetImage}
        resetImageComponent={resetImageComponent}
      />

      {/* Button to navigate to the previous image */}
      <div className="icon-left">
        <img width={90} src={left} onClick={handlePrevClick} />
      </div>

      {/* Button to navigate to the next image */}
      <div className="icon-right">
        <img width={90} src={right} onClick={handleNextClick} />
      </div>
    </>
  );
};

export default Main;
