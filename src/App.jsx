import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import About from './pages/About'

// 应用入口组件，负责页面路由与公共框架布局。
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] flex flex-col bg-bg-primary text-text-primary">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
