import React, { useEffect, useRef, useState } from 'react'

export default function Video() {
  const refSelectVideo = useRef(null)
  const refVideo = useRef(null)

  useEffect(() => {
    listDevices()
    // startWebcam()
  }, [])

  const listDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(device => {
      if (device.kind === 'videoinput') {
        console.log(device)
      }
    })
  }

  const getParams = video => {
    return {
      video: { deviceId: video ? { exact: video } : undefined },
    }
  }

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        getParams(refSelectVideo.current.value)
      )
      refVideo.current.srcObject = stream
    } catch (error) {
      console.log(error)
      return undefined
    }
  }
  return (
    <>
      <video ref={refVideo} autoPlay />
    </>
  )
}
