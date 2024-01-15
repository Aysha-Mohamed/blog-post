import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import './styles.css'
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];

    // if (file) {
    //     setSelectedImage(file);
    //     setOldImageUrl(URL.createObjectURL(file));
    // }

    const file = e.target.files?.[0]
    if (file) {
      getBase64Image(file).then((base64) => {
        setSelectedImage(base64)
        setOldImageUrl('data:image/png;base64,' + base64)
      })
    }
  }
  useEffect(() => {
    if (filteredBlog && filteredBlog['imgUrl']) {
      setOldImageUrl(filteredBlog['imgUrl'])
    }
  }, [filteredBlog])

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

          // // Update filteredBlog to match the new title
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
  }
  return (
    <>
      {/* <Toolbar variant="regular" className='toolbar' sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Link to={'/'} style={{textDecoration:'none',textDecorationColor:'transparent'}} className="logo">
                <Typography variant="h5" component="h1" className="logo">Blog Post</Typography>
                </Link>
              
            </Toolbar> */}
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
