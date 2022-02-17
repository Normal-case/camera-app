import React, { useEffect, useRef, useState } from 'react'

export default function Video() {
  const refSelectVideo = useRef(null)
  const refVideo = useRef(null)

  useEffect(() => {
    listDevices()
    startWebcam()
  }, [])

  const listDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      devices.forEach(device => {
        console.log(device)
        switch (device.kind) {
          case 'audioinput':
            break
          case 'videoinput':
            refSelectVideo.current.appendChild(device.deviceId)
        }
      })
    } catch (error) {
      console.log(error)
      return undefined
    }
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
