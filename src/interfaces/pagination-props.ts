interface BlogPaginationProps {
    page: number
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void
    count: number
  }
export default BlogPaginationProps;  