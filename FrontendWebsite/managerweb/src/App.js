// import Login from "../login";
import HomePage from "./components/homePage";
import { Route, Routes } from 'react-router-dom';
import Login from "../src/pages/login";
import Register from "./pages/register";

import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPackages from "./components/addPackages";
function App() {
  return (<><Routes>
              <Route index element={<Login/>} />
            <Route  path="/" element={<Login></Login>} />  
            <Route path="/register" element={<Register/>}/>    
            <Route  path="/home" element={<HomePage></HomePage>} />
            <Route path="/addPackage" element={<AddPackages></AddPackages>} />
            </Routes>
            <ToastContainer/>
            
            </>
            
  );
}

export default App;
