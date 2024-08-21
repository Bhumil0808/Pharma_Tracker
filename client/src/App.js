import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import {} from 'react-bootstrap'
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search';
import Signup from "./components/Signup";
import Login from './components/Login';
import Update from "./components/Update";
import Upload from "./components/Upload";
import LoginState from './controller/loginstate'

function App() {
  return (
    <LoginState>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Search></Search>} />
          <Route exact path='/Signup' element={<Signup></Signup>} />
          <Route exact path='/Login' element={<Login></Login>} />
          <Route exact path='/Update' element={<Update></Update>} />
          <Route exact path='/Upload' element={<Upload></Upload>} />
        </Routes>
      </BrowserRouter>
    </LoginState>
  )
}

export default App;

