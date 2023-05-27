import './App.css';
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import {Create} from "./components/create"
import {Read} from "./components/read";
import {Update} from "./components/update";
import {SignUp} from "./components/signUp";
import {Login} from "./components/logIn";

function App() {
  return (
    <div className="container">
        <BrowserRouter>
            <Routes>
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/" element={<Login />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path="/read" element={<Read />} />
                <Route exact path="/update" element={<Update />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
