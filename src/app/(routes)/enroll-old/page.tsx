/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";

export default function RegisterFace() {
  const videoRef = useRef<HTMLVideoElement>(null) as any;
  const canvasRef = useRef<HTMLCanvasElement>(null) as any;
  const [isCaptured, setIsCaptured] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Initialize webcam
  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            checkVideoDimensions();
          };
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        alert("Unable to access the webcam. Please check permissions.");
      });
  };

  // Ensure video dimensions are valid
  const checkVideoDimensions = () => {
    if (videoRef.current) {
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      if (videoWidth && videoHeight) {
        setIsVideoReady(true);
      } else {
        requestAnimationFrame(checkVideoDimensions);
      }
    }
  };

  const captureFace = async () => {
    if (name.trim().length < 3) {
      alert("Please enter a valid name (at least 3 characters).");
      return;
    }

    if (!videoRef.current || !isVideoReady) {
      alert("Webcam is still loading. Please wait and try again.");
      return;
    }

    if (!canvasRef.current) {
      alert("Canvas is not ready. Please try again.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure video dimensions are valid
    if (!video.videoWidth || !video.videoHeight) {
      alert("Video dimensions are not ready. Please wait.");
      return;
    }

    // Configure canvas dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      alert("Failed to get canvas context.");
      return;
    }

    // Draw the video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );

    if (!imageBlob) {
      alert("An error occurred while capturing the image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageBlob);

    setIsLoading(true);

    fetch("http://127.0.0.1:5000/register-face", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          alert("Face registered successfully!");
        } else {
          alert(data.error || "An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
        setIsCaptured(true);
      });
  };

  // Reset the process
  const resetCapture = () => {
    setIsCaptured(false);
    setName("");
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track: any) => track.stop());
    }
    setIsVideoReady(false);
    startWebcam();
  };

  // useEffect(() => {
  //   startWebcam();
  //   const videoElement = videoRef.current;
  //   return () => {
  //     if (videoElement?.srcObject) {
  //       const tracks = videoElement.srcObject.getTracks();
  //       tracks.forEach((track: any) => track.stop());
  //     }
  //   };
  // }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register Face</h1>

        {!isCaptured ? (
          <div id="video-container" className="mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-md border"
              aria-label="Webcam feed"
            />
          </div>
        ) : (
          <div id="canvas-container" className="mb-4">
            <canvas
              ref={canvasRef}
              className="w-full rounded-md border"
              aria-label="Captured image preview"
            />
          </div>
        )}

        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Enter your name"
        />
        <button
          id="capture-btn"
          onClick={captureFace}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          disabled={isLoading || !isVideoReady}
        >
          {isLoading ? "Processing..." : "Enroll"}
        </button>
        {isCaptured && (
          <button
            id="reset-btn"
            onClick={resetCapture}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition mt-4"
          >
            Enroll again
          </button>
        )}
      </div>
    </div>
  );
}
