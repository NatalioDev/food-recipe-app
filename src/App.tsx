import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Details from "./pages/Details/Details"
import Favorites from "./pages/Favorites/Favorites"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/details/:id"  element={<Details/>}/>
        <Route path="/favorites"  element={<Favorites/>}/>
      </Routes>
    </Router>
  )
}

export default App
