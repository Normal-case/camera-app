import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@mui/material"

export default function Home() {

  const [timer, setTimer] = useState(undefined)
  const videoRef = useRef(null)

  useEffect(() => {
    getCam((stream) => {
      setTimer(true)
      videoRef.current.srcObject = stream
    })
  }, [])

  const startOrStop = () => {
    if(timer) {
      const s = videoRef.current.srcObject
      s.getTrack().forEach((track) => {track.stop()})
    } else {
      getCam((stream) => {
      setTimer(true)
      videoRef.current.srcObject = stream
    })
    setTimer(!timer)
    }
  }

  const getCam = (callback) => {
    try {
      const constraints = {
        'video': {facingMode: {exact: 'environment'}},
        'audio': false,

      }
      navigator.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
      navigator.mediaDevices.getUserMedia(constraints)
        .then(callback)
    } catch (error) {
      console.log(error)
      return undefined
    }
  }

  const Styles = {
    Video: {width:'100%', height:'100%', background:'rgba(245, 240, 215, 0.5)'},
    None: {display: 'none'}
  }

  return (
    <>
      <video ref={videoRef} autoPlay style={Styles.Video} />
      <Button color='warning' onClick={() => startOrStop()}>{timer ? 'Stop':'Start'}</Button>
    </>
  )
}
