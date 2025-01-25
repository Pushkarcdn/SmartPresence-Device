/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import config from "@/config";
import hitApi from "@/lib/axios";
import React, { useRef, useState, useEffect } from "react";

const CamScreen = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio: ", error);
      });
    } else {
      console.error("Audio ref is null");
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const [failedText, setFailedText] = useState<string | null>(null);
  const [data, setData] = useState<any>();

  const makePresent = async (id: string) => {
    try {
      const res = await hitApi(`/record-presence/${id}`);
      if (res?.success) {
        setData(res);
        playAudio();
        setTimeout(() => {
          setData(null);
        }, 1000);
      } else {
      }
    } catch (err) {
      console.error("Error making present!", err);
    }
  };

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        setMediaStream(stream);
      } catch (err) {
        console.error("Error accessing webcam", err);
        setFailedText(
          "Unable to access the webcam. Please check your permissions."
        );
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

        if (data) return;

        try {
          let res = (await fetch(`${config.PYTHON_BE_URL}/api/identify-face`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
          })) as any;

          res = await res.json();

          if (res?.success) {
            if (res.unique_id) {
              makePresent(res.unique_id);
            }
          } else {
          }
        } catch (err) {
          console.error("Error sending image.", err);
        }
      }
    };

    const intervalId = setInterval(() => {
      if (data) return;
      captureAndSendImage();
    }, 1000);

    return () => {
      clearInterval(intervalId);
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  return (
    <div className="w-full flex flex-col items-center component-px component-py min-h-[80vh] gap-5 col-span-5">
      <div className="relative w-full flex flex-col items-center justify-center text-center gap-6">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-2xl bg-black max-w-[800px] max-h-[60vh] object-cover object-center"
        />

        {failedText && (
          <p className="bg-red-100 py-3 px-6 rounded-lg text-red-500 text-sm">
            {failedText}
          </p>
        )}

        <audio ref={audioRef} src="/audio/thank-you.mp3" className="hidden" />

        {data?.success && (
          <div className="flex flex-col gap-3 text-cenetr">
            <p className="text-green-600 bg-green-100 py-2.5 px-6 rounded-lg">
              Thank you!
            </p>

            <p>
              {data.data.firstName} {data.data.lastName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CamScreen;
