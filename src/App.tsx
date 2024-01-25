import Home from './components/home'
import { Route, Routes } from 'react-router-dom'
import BlogDetail from './components/details'

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Header />} > */}
        <Route index element={<Home />} />
        <Route path="/:blogId" element={<BlogDetail />} />
        {/* </Route> */}
      </Routes>
    </>
  )
}

export default App
