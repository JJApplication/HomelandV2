import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import { BLOG } from './constants'

// 外链重定向组件，用于将站内路由跳转到外部博客地址。
function ExternalRedirect() {
  useEffect(() => {
    window.location.replace(BLOG)
  }, [])

  return null
}

// 应用入口组件，负责页面路由与公共框架布局。
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[100dvh] flex flex-col bg-bg-primary text-text-primary">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/projects" element={<Projects />} /> */}
            <Route path="/blog" element={<ExternalRedirect />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
