import { useNavigate } from "react-router-dom";

const Navbar =() =>{
const navigate = useNavigate();
    const logoutsession = () =>{
        sessionStorage.removeItem('token');
     navigate('/');
    }
    
    return(
        <div>
<nav>
    <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/packages">Packages</a></li>
        <li><a href="/vehicles">Vehicles</a></li>
        <li><a href="/hotels">Hotels</a></li>
       {/* button css baki */}
        <button className="btn btn-danger" 
        onClick={logoutsession}>Logout</button>
    </ul>

</nav>

        </div>
        
    )
}
export default Navbar;
