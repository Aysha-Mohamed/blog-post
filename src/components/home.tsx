import React, { useEffect } from 'react'
import { useState } from 'react'
import SeedData from '../assets/seed-data.json'
import BlogPagination from './pagination'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import CreateBlog from './create'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import './styles.css'
import { useMediaQuery } from '@mui/material'
import { Header } from './header'

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 'auto',
  display: 'flex',
}))

const generateExcerpt = (content: string, maxLength: number = 150): string => {
  return content.length > maxLength
    ? content.substring(0, maxLength) + '...'
    : content
}

const Home: React.FC = () => {
  interface Item {
    id: number
    title: string
    content: string
    createdAt: string
    imgUrl: string | null
  }

  const [data, setData] = useState(SeedData)
  const [isCreateBlog, setIsCreateBlog] = useState(false)
  const isMobile = useMediaQuery('(max-width:767px)')

  useEffect(() => {
    const storedData = localStorage.getItem('items')

    console.log('hey')
    if (storedData === null) {
      // If the item is not present in localStorage, set default data or handle it as needed
      const defaultData = data
      setData(defaultData)
      localStorage.setItem('items', JSON.stringify(defaultData))
    } else {
      // If the item is present, parse and set the data

      setData(JSON.parse(storedData))
    }
  }, [])

  const itemsPerPage = 5
  const [countOfPagination, setCountOfPagination] = useState(1)

  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const [lastBlogIndex, setLastBlogIndex] = useState(page * itemsPerPage)
  useEffect(() => {
    setLastBlogIndex(page * itemsPerPage)
  }, [page])

  const [firstBlogIndex, setFirstBlogIndex] = useState(
    lastBlogIndex - itemsPerPage,
  )
  useEffect(() => {
    setFirstBlogIndex(lastBlogIndex - itemsPerPage)
  }, [lastBlogIndex])
  const allBlogItems = data

  useEffect(() => {
    setCountOfPagination(Math.ceil(allBlogItems.length / 5))
  }, [allBlogItems.length])

  const filteredBlogItems = searchTerm
    ? allBlogItems.filter(
        (item) => item.title.toLowerCase() === searchTerm.toLowerCase(),
      )
    : allBlogItems

  const currentBlogItems = filteredBlogItems.slice(
    firstBlogIndex,
    lastBlogIndex,
  )
  console.log('currentBlogItems', currentBlogItems)

  const handleCreate = () => {
    console.log('create a new blog')
    setIsCreateBlog(true)
  }

  const handlePage = () => {
    setPage(1)
    setSearchTerm(null)
    setCountOfPagination(Math.ceil(allBlogItems.length / 5))
    // setPage(1)
  }

  return (
    <>
      {isCreateBlog ? (
        <CreateBlog
          data={data}
          setData={setData}
          setIsCreateBlog={setIsCreateBlog}
        />
      ) : (
        <>
          <Fab
            color="primary"
            aria-label="create"
            onClick={handleCreate}
            className="fabIcon"
          >
            <AddIcon />
          </Fab>
          <Header
            handlePage={handlePage}
            allBlogItems={allBlogItems}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setPage={setPage}
            setCountOfPagination={setCountOfPagination}
            currentBlogItems={currentBlogItems}
          />

          <Box sx={{ width: '100%' }} padding="20px">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 0 }}
              justifyContent="center"
            >
              {currentBlogItems.map((item: Item) => (
                <Link
                  to={`${encodeURIComponent(item.id)}`}
                  className="blogCards"
                  key={item.id}
                >
                  <Grid
                    item
                    xs={10}
                    key={item.id}
                    justifyContent="center"
                    alignContent="center"
                    className="grid-item-blog"
                  >
                    <GridItem>
                      {isMobile ? (
                        <Stack width={'100%'} justifyContent={'center'}>
                          <h2>{item.title}</h2>
                          {item.imgUrl !== null && (
                            <img
                              className="blogImage"
                              src={item.imgUrl}
                              alt={item.title}
                            />
                          )}
                          <h3 className="blog-para">
                            {generateExcerpt(item.content)}
                          </h3>
                        </Stack>
                      ) : (
                        <>
                          {item.imgUrl !== null && (
                            <img
                              className="blogImage"
                              src={item.imgUrl}
                              alt={item.title}
                            />
                          )}
                          <Stack
                            direction={'column'}
                            justifyContent={'center'}
                            width={'100%'}
                          >
                            <h2>{item.title}</h2>

                            <h3 className="blog-para">
                              {generateExcerpt(item.content)}
                            </h3>
                          </Stack>
                        </>
                      )}
                    </GridItem>
                  </Grid>
                </Link>
              ))}
            </Grid>
          </Box>

          <BlogPagination
            page={page}
            handlePageChange={handlePageChange}
            count={countOfPagination}
          />
        </>
      )}
    </>
  )
}

export default Home
