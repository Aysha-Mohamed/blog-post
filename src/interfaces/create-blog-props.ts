
import Item from "./item-interface"

interface CreateBlogProps {
    data: Item[]
    setData: React.Dispatch<React.SetStateAction<Item[]>>
    setIsCreateBlog: React.Dispatch<React.SetStateAction<boolean>>
  }

export default CreateBlogProps;