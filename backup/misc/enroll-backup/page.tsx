/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const CamScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setMediaStream(stream);
      } catch (err: any) {
        setError(`Unable to access the webcam: ${err.message}`);
        console.error("Error accessing webcam", err);
      } finally {
        setLoading(false);
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
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      // Set canvas dimensions to match the video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame to the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the image as a data URL and set it to the captured image state
        const image = canvas.toDataURL("image/png");
        setCapturedImage(image);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {loading && !error ? (
        <p>Loading webcam...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="relative w-full max-w-sm aspect-w-1 aspect-h-1">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-2xl bg-black"
            />
          </div>
          <button
            onClick={captureImage}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Capture
          </button>
          {capturedImage && (
            <div className="mt-4">
              <p className="mb-2 text-center">Captured Image:</p>
              <Image
                width={1200}
                height={1200}
                src={capturedImage}
                alt="Captured"
                className="rounded-lg"
              />
            </div>
          )}
        </>
      )}

      {/* Hidden canvas for capturing the video frame */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
};

export default CamScreen;
