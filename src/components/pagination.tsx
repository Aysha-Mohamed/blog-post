import { Box, Pagination } from '@mui/material'
import React from 'react'
import BlogPaginationProps from '../interfaces/pagination-props'


const BlogPagination: React.FC<BlogPaginationProps> = ({
  page,
  handlePageChange,
  count,
}) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      sx={{ paddingTop: '5%', paddingBottom: '5%' }}
    >
      <Pagination count={count} page={page} onChange={handlePageChange} />
    </Box>
  )
}

export default BlogPagination
