import { Link, useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect, useState, useRef } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import BlogEdit from './edit'
import { Typography } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import './styles.css'
import { HeaderDetailsEditPage } from './header'

interface Item {
  id: number
  title: string
  content: string
  createdAt: string
  imgUrl: string | null
}
const BlogDetail = () => {
  const { blogId } = useParams()
  const [blogItemsJSON, setBlogItemsJSON] = useState<string | null>(null)
  const [isEditBlog, setIsEditBlog] = useState(false)
  const isMobile = useMediaQuery('(max-width:767px)')
  const [isDeleted, setIsDeleted] = useState(false)
  const blogItemsRef = useRef<Item[]>([])

  //let blogItems: [] = [];
  const [filteredBlog, setFilteredBlog] = useState<Item | undefined>(undefined)

  let deletedBlog: [] = []

  useEffect(() => {
    setBlogItemsJSON(localStorage.getItem('items'))
    setIsDeleted(false)
  }, [])

  const handleDelete = () => {
    if (blogItemsJSON) {
      deletedBlog = JSON.parse(blogItemsJSON).filter(
        (item: Item) => item.id !== Number(blogId),
      )
    }
    localStorage.setItem('items', JSON.stringify(deletedBlog))
    setBlogItemsJSON(localStorage.getItem('items'))
    setIsDeleted(true)
  }

  const handleEdit = () => {
    setIsEditBlog(true)
  }

  useEffect(() => {
    if (blogItemsJSON) {
      try {
        //  blogItems = JSON.parse(blogItemsJSON).map((item: Item) => item);
        blogItemsRef.current = JSON.parse(blogItemsJSON).map(
          (item: Item) => item,
        )

        //  setFilteredBlog(blogItems.find((item: Item) => item.id === Number(blogId)));
        setFilteredBlog(
          blogItemsRef.current.find((item: Item) => item.id === Number(blogId)),
        )
      } catch (error) {
        console.error(' parsing JSON from local storage:', error)
      }
    }
  }, [blogItemsJSON, blogId])

  return (
    <div>
      {isEditBlog && filteredBlog ? (
        <BlogEdit
          filteredBlog={filteredBlog}
          blogItemsJSON={blogItemsJSON}
          blogId={blogId}
          setBlogItemsJSON={setBlogItemsJSON}
          setFilteredBlog={setFilteredBlog}
          setIsEditBlog={setIsEditBlog}
        />
      ) : (
        <>
          <HeaderDetailsEditPage />
          <Box sx={{ width: '100%', textAlign: 'center', padding: '30px' }}>
            {!isDeleted ? (
              isMobile ? (
                <Stack direction="row" spacing={1} justifyContent={'flex-end'}>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    size="large"
                    onClick={handleEdit}
                  >
                    <EditNoteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="large"
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<EditNoteIcon />}
                    onClick={handleEdit}
                    color="success"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                    color="error"
                  >
                    Delete
                  </Button>
                </Stack>
              )
            ) : (
              ''
            )}

            {filteredBlog ? (
              <>
                <h1 id="blog-title">{filteredBlog.title}</h1>
                {filteredBlog.imgUrl !== null && (
                  <img
                    src={filteredBlog.imgUrl}
                    alt={filteredBlog.title}
                    className="detail-blog-image"
                  />
                )}
                <Typography textAlign={isMobile ? 'center' : 'left'}>
                  {filteredBlog.content}
                </Typography>
              </>
            ) : (
              <>
                <p>Blog Deleted Successfully</p>
                <p>
                  Go to <Link to={'/'}>Home</Link>
                </p>
              </>
            )}
          </Box>
        </>
      )}
    </div>
  )
}

export default BlogDetail
