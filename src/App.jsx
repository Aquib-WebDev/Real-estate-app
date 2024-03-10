import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import About from "./components/About"
import Profile from "./components/Profile"
import Header from "./components/Header"

const App = () => {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/sign-in" element = {<SignIn/>}/>
        <Route path="/sign-up" element = {<SignUp/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="/profile" element = {<Profile/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App