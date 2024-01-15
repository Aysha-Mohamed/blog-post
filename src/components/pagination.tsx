import { Box, Pagination } from '@mui/material'
import React from 'react'
interface BlogPaginationProps {
  page: number
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void
  count: number
}

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
