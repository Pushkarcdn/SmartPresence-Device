"use client";

import React, { useRef, useState, useEffect } from "react";

const CamScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setMediaStream(stream);
      } catch (err) {
        setError("Unable to access the webcam. Please check your permissions.");
        console.error("Error accessing webcam", err);
      }
    };

    enableVideoStream();
  }, []);

  useEffect(() => {
    if (
      videoRef.current &&
      mediaStream &&
      videoRef.current.srcObject !== mediaStream
    ) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [videoRef, mediaStream]);

  useEffect(() => {
    const canvas = document.createElement("canvas");

    const captureAndSendImage = async () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png");

        try {
          const response = await fetch("http://127.0.0.1:5000/identify-face", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
          });

          const data = await response.json();
          console.log("API Response:", data);
        } catch (err) {
          console.error("Error sending image to API:", err);
        }
      }
    };

    const intervalId = setInterval(() => {
      captureAndSendImage();
    }, 2000); // Capture and send every 2 seconds

    return () => {
      clearInterval(intervalId);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-96 h-96 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-2xl bg-black"
          />
        </div>
      )}
    </div>
  );
};

export default CamScreen;
