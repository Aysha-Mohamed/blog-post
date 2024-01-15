import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import getBase64Image from './base64'
import { HeaderDetailsEditPage } from './header'

interface Item {
  id: number
  title: string
  content: string
  createdAt: string
  imgUrl: string | null
}

interface BlogEditProps {
  filteredBlog: Item
  blogItemsJSON: string | null
  blogId: string | undefined
  setBlogItemsJSON: React.Dispatch<React.SetStateAction<string | null>>
  setFilteredBlog: React.Dispatch<React.SetStateAction<Item | undefined>>
  setIsEditBlog: React.Dispatch<React.SetStateAction<boolean>>
}

const BlogEdit: React.FC<BlogEditProps> = ({
  filteredBlog,
  blogItemsJSON,
  blogId,
  setBlogItemsJSON,
  setFilteredBlog,
  setIsEditBlog,
}) => {
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      try {
        // Check image size before processing
        await validateImageSize(file)

        // If size is within limits, proceed with processing
        getBase64Image(file).then((base64) => {
          setSelectedImage(base64)
          setOldImageUrl('data:image/png;base64,' + base64)
        })
        setImageError(null)
      } catch (error) {
        console.error('Image size validation failed:', error)
        //  setImageError(error.message || 'Error validating image size');
        setImageError((error as Error).message || 'Error validating image size')
      }
    }
  }

  useEffect(() => {
    if (filteredBlog && filteredBlog['imgUrl']) {
      setOldImageUrl(filteredBlog['imgUrl'])
    }
  }, [filteredBlog])

  const validateImageSize = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const fileSizeMB = file.size / (1024 * 1024)
      const MAX_IMAGE_SIZE_MB = 5 // Set your desired maximum image size in megabytes

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

  const handleSave = () => {
    if (filteredBlog) {
      const titleInput = document.getElementById(
        'title',
      ) as HTMLTextAreaElement | null
      const contentInput = document.getElementById(
        'content',
      ) as HTMLTextAreaElement | null

      if (titleInput && contentInput) {
        // Create a copy of the filteredBlog with the updated values
        const updatedBlog: Item = {
          ...filteredBlog,
          title: titleInput.value || '',
          content: contentInput.value || '',
          imgUrl: selectedImage
            ? 'data:image/png;base64,' + selectedImage
            : null,
        }

        // Update the local storage
        if (blogItemsJSON) {
          const updatedBlogItems = JSON.parse(blogItemsJSON).map(
            (item: Item) => (item.id === Number(blogId) ? updatedBlog : item),
          )

          localStorage.setItem('items', JSON.stringify(updatedBlogItems))
          setBlogItemsJSON(JSON.stringify(updatedBlogItems))

          // Update filteredBlog to match the new title
          setFilteredBlog(updatedBlog)

          // Switch back to non-edit mode
          setIsEditBlog(false)
        }
      }
    }
  }

  const handleCancel = () => {
    setIsEditBlog(false)
    if (filteredBlog && filteredBlog['imgUrl']) {
      setOldImageUrl(filteredBlog['imgUrl'])
    }
  }

  const handleRemoveImage = () => {
    setOldImageUrl(null)
    setSelectedImage(null)
    const imageInput = document.getElementById('imageInput') as HTMLInputElement
    if (imageInput) {
      imageInput.value = '' // Reset the input value
    }
    setImageError(null)
  }

  return (
    <>
      <HeaderDetailsEditPage />
      <Box sx={{ padding: '30px' }}>
        <Stack spacing={2}>
          <TextField
            id="title"
            label="Blog Title"
            defaultValue={filteredBlog.title}
            variant="outlined"
          />
          <TextField
            id="content"
            label="Blog Content"
            className="text-field-content"
            defaultValue={filteredBlog.content}
            variant="outlined"
            multiline
            rows={20}
            fullWidth
          />
          {oldImageUrl && (
            <img
              src={oldImageUrl}
              alt={filteredBlog.title}
              style={{ maxWidth: '100%', maxHeight: '200px' }}
              className="blog-edit-image"
            />
          )}

          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageError && (
            <Typography variant="caption" color="error">
              {imageError}
            </Typography>
          )}
          <Box>
            {' '}
            <Button
              onClick={handleRemoveImage}
              size="small"
              color="secondary"
              variant="contained"
            >
              Remove Image
            </Button>
          </Box>

          <Stack direction={'row'} spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              size="large"
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancel}
              size="large"
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default BlogEdit
