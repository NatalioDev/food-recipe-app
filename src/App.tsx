import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Details from "./pages/Details/Details"
import Favorites from "./pages/Favorites/Favorites"
import Navbar from "./components/Navbar"


function App() {
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
        <Navbar/>
          <Routes>
            <Route path="/"  element={<Home/>}/>
            <Route path="/recipe-item/:id"  element={<Details/>}/>
            <Route path="/favorites"  element={<Favorites/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App
