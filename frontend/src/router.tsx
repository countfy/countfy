import { BrowserRouter, Routes, Route } from 'react-router-dom'

// PAGES
import Home from './pages/Home.tsx'

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home/>} />

      </Routes>
    </BrowserRouter>
  )
}
