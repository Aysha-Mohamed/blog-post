import Item from "./item-interface"
interface HeaderProps {
    handlePage: () => void
    allBlogItems: Item[]
    searchTerm: string | null
    setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>
    setPage: React.Dispatch<React.SetStateAction<number>>
    setCountOfPagination: React.Dispatch<React.SetStateAction<number>>
    currentBlogItems: Item[]
  }

export default HeaderProps;