import { Outlet } from 'react-router-dom'
import {
  Toolbar,
  Typography,
  useMediaQuery,
  Autocomplete,
  Stack,
} from '@mui/material'

import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import BlogLogo from '../assets/icon-blog.png'

interface Item {
  id: number
  title: string
  content: string
  createdAt: string
  imgUrl: string | null
}

interface HeaderProps {
  handlePage: () => void
  allBlogItems: Item[]
  searchTerm: string | null
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setCountOfPagination: React.Dispatch<React.SetStateAction<number>>
  currentBlogItems: Item[]
}

export const Header: React.FC<HeaderProps> = ({
  handlePage,
  allBlogItems,
  searchTerm,
  setSearchTerm,
  setPage,
  setCountOfPagination,
  currentBlogItems,
}) => {
  const isMobile = useMediaQuery('(max-width:767px)')
  return (
    <>
      <Toolbar
        variant="regular"
        className="toolbar"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          sx={{ width: '100%' }}
          justifyContent={'space-between'}
          alignItems={isMobile ? 'flex-start' : 'center'}
        >
          <Typography
            variant="h6"
            component="h1"
            className="logo"
            letterSpacing={2}
            onClick={handlePage}
          >
            {' '}
            <img
              src={BlogLogo}
              className="logo-img"
              alt="blog logo"
              width={'10%'}
            />
            Blog Post
          </Typography>
          <Autocomplete
            className="searchBar"
            options={allBlogItems.map((option) => option.title)}
            id="blog-search-id"
            value={searchTerm}
            // clearOnBlur={false}
            onChange={(
              _: React.ChangeEvent<NonNullable<unknown>>,
              newValue: string | null,
            ) => {
              if (newValue !== null) {
                setSearchTerm(newValue)
                setPage(1)
                setCountOfPagination(Math.ceil(currentBlogItems.length / 5))
              } else {
                setSearchTerm(null)
                setCountOfPagination(Math.ceil(allBlogItems.length / 5))
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by Blog Title"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
            clearIcon={null}
          />
        </Stack>
      </Toolbar>

      <Outlet />
    </>
  )
}

interface HeaderCreatePageProps {
  handleCancelNewBlog: () => void | null
}

export const HeaderCreatePage: React.FC<HeaderCreatePageProps> = ({
  handleCancelNewBlog,
}) => {
  return (
    <Toolbar
      variant="regular"
      className="toolbar"
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Typography
        variant="h6"
        letterSpacing={2}
        component="h1"
        className="logo"
        onClick={handleCancelNewBlog}
      >
        <img
          src={BlogLogo}
          className="logo-img"
          alt="blog logo"
          width={'10%'}
        />
        Blog Post
      </Typography>
    </Toolbar>
  )
}

export const HeaderDetailsEditPage = () => {
  return (
    <Toolbar
      variant="regular"
      className="toolbar"
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Typography
          variant="h6"
          letterSpacing={2}
          component="h1"
          className="logo"
        >
          <img
            src={BlogLogo}
            className="logo-img"
            alt="blog logo"
            width={'10%'}
          />
          Blog Post
        </Typography>
      </Link>
    </Toolbar>
  )
}
