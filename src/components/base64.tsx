const getBase64Image = (file: File) => {
  return new Promise<string | null>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const img = new Image()
      img.src = String(reader.result)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        ctx!.drawImage(img, 0, 0)

        const dataURL = canvas.toDataURL('image/png')
        resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ''))
      }
    }
    reader.readAsDataURL(file)
  })
}

export default getBase64Image
