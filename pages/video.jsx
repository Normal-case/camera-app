import React, { useEffect, useRef, useState } from 'react'

export default function Video() {
  const listDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    devices.forEach(device => {
      console.log(device)
    })
  }
  return <>video page</>
}
