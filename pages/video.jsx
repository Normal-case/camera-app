import React, { useEffect, useRef, useState } from 'react';

export default function Video() {
  const refSelectVideo = useRef(null);
  const refVideo = useRef(null);

  useEffect(() => {
    listDevices();
    startWebcam();
  }, []);

  const listDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const cameras = devices.filter((device) => device.kind == 'videoinput');
    cameras.forEach((camera) => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.text = camera.label;
      refSelectVideo.current.appendChild(option);
    });
  };

  const getParams = (video) => {
    return {
      video: { deviceId: video ? { exact: video } : undefined },
    };
  };

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices
      .getUserMedia(getParams(refSelectVideo.current.value))
      .then(
        (stream) => (refVideo.current.srcObject = stream),
        (error) => console.log(error),
      );
  };
  return (
    <>
      <div>
        <select ref={refSelectVideo} onChange={(e) => startWebcam()} />
      </div>
      <video ref={refVideo} autoPlay />
    </>
  );
}
