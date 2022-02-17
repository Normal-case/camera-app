import React, { useEffect } from 'react'

export default function device() {
  useEffect(() => {
    testDevice()
  }, [])

  const testDevice = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('Not support enumerateDevice')
      return
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {
          console.log(
            device.kind + ': ' + device.label + ' id = ' + device.deviceId
          )
        })
      })
      .catch(function (error) {
        console.log(error.name + ': ' + error.message)
      })
  }
  return <>test page</>
}
