import Item from "./item-interface"

interface BlogEditProps {
    filteredBlog: Item
    blogItemsJSON: string | null
    blogId: string | undefined
    setBlogItemsJSON: React.Dispatch<React.SetStateAction<string | null>>
    setFilteredBlog: React.Dispatch<React.SetStateAction<Item | undefined>>
    setIsEditBlog: React.Dispatch<React.SetStateAction<boolean>>
  }

export default BlogEditProps;