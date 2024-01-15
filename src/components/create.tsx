import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import getBase64Image from './base64.js'
import { HeaderCreatePage } from './header.tsx'

interface Item {
  id: number
  title: string
  content: string
  createdAt: string
  imgUrl: string | null
}

interface CreateBlogProps {
  data: Item[]
  setData: React.Dispatch<React.SetStateAction<Item[]>>
  setIsCreateBlog: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateBlog: React.FC<CreateBlogProps> = ({
  data,
  setData,
  setIsCreateBlog,
}) => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [helperTextTitle, setHelperTextTitle] = useState('')
  const [helperTextContent, setHelperTextContent] = useState('')
  const [newContent, setNewContent] = useState('')
  const [imageValidationMessage, setImageValidationMessage] = useState<
    string | null
  >(null)

<<<<<<< HEAD
  const MAX_IMAGE_SIZE_MB = 1.6
  
=======
  const MAX_IMAGE_SIZE_MB = 3
>>>>>>> 286b60faa15e00f0e6b98da9ea06ee2e81fab4a3

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitleValue = e.target.value
    setNewTitle(newTitleValue)
    newTitleValue.trim() === ''
      ? (setTitleError(true), setHelperTextTitle('Title is required'))
      : (setTitleError(false), setHelperTextTitle(''))
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContentValue = e.target.value
    setNewContent(newContentValue)
    newContentValue.trim() === ''
      ? (setContentError(true), setHelperTextContent('Content is required'))
      : (setContentError(false), setHelperTextContent(''))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      try {
        // Check image size before processing
        await validateImageSize(file)

        // If size is within limits, proceed with processing
        getBase64Image(file).then((base64) => {
          setSelectedImage(base64)
          setImageValidationMessage('Image size succeeded')
        })
      } catch (error) {
        setImageValidationMessage(
          'Image size exceeds the maximum allowed size of 1.5 MB',
        )
        // Display an error message to the user, e.g., set a state to show an error message
      }
    }
  }

  const validateImageSize = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const fileSizeMB = file.size / (1024 * 1024)

      if (fileSizeMB > MAX_IMAGE_SIZE_MB) {
        reject(
          new Error(
            `Image size exceeds the maximum allowed size of ${MAX_IMAGE_SIZE_MB} MB`,
          ),
        )
      } else {
        resolve()
      }
    })
  }

  const handleCreateNewBlog = () => {
    let titleMiss = false
    let contentMiss = false

    if (newTitle.trim() === '') {
      titleMiss = true
      setTitleError(true)
      setHelperTextTitle('Title is required')
    } else {
      titleMiss = false
      setTitleError(false)
      setHelperTextTitle('')
    }
    if (newContent.trim() === '') {
      contentMiss = true
      setContentError(true)
      setHelperTextContent('Content is required')
    } else {
      contentMiss = false
      setContentError(false)
      setHelperTextContent('')
    }

    if (!titleMiss && !contentMiss) {
      const lastItem = data[data.length - 1]

      const newBlog = {
        id: lastItem ? lastItem.id + 1 : 1,
        title: newTitle,
        content: newContent,
        createdAt: new Date().toISOString(),
        imgUrl: selectedImage ? 'data:image/png;base64,' + selectedImage : null,
      }
      const newData = [...data, newBlog]
      setData(newData)

      localStorage.setItem('items', JSON.stringify(newData))
      navigate(`/${encodeURIComponent(newBlog.id)}`)

      // Reset form and close create blog section
      setSelectedImage(null)
      setNewTitle('')
      setNewContent('')
      setIsCreateBlog(false)
      setImageValidationMessage(null) // Reset image validation message
    }
  }

  const handleCancelNewBlog = () => {
    setSelectedImage(null)
    setIsCreateBlog(false)
    setImageValidationMessage(null) // Reset image validation message
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    const imageInput = document.getElementById('imageInput') as HTMLInputElement
    if (imageInput) {
      imageInput.value = '' // Reset the input value
    }
    setImageValidationMessage(null) // Reset image validation message
  }

  return (
    <>
      <HeaderCreatePage handleCancelNewBlog={handleCancelNewBlog} />

      <Box sx={{ padding: '30px' }}>
        <Stack spacing={2}>
          <Typography variant="button">Create a New Blog Post</Typography>

          <TextField
            id="newTitle"
            label="Blog Title"
            variant="outlined"
            value={newTitle}
            required
            onChange={handleTitleChange}
            error={titleError}
            helperText={helperTextTitle}
          />
          <TextField
            id="newContent"
            required
            variant="outlined"
            label="Blog Content"
            multiline
            rows={9}
            value={newContent}
            onChange={handleContentChange}
            error={contentError}
            helperText={helperTextContent}
          />
          <Typography variant="subtitle2">Choose Image:</Typography>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="imageInput"
          />
          {selectedImage && (
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Selected Image Preview"
              className="blog-new-image"
            />
          )}

          {imageValidationMessage ? (
            <Typography
              color={
                imageValidationMessage.includes('succeeded')
                  ? 'success'
                  : 'error'
              }
            >
              {imageValidationMessage}
            </Typography>
          ) : null}

          <Box>
            {' '}
            <Button
              onClick={handleRemoveImage}
              color="secondary"
              variant="contained"
            >
              Remove Image
            </Button>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleCreateNewBlog}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelNewBlog}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default CreateBlog