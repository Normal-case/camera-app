if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log('enumerateDevices()를 지원하지 않습니다.')
  return
}

// camera and mic list
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
