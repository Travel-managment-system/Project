import Vehicles from './vehicles';
import Packages from './packages';
import Hotels from './hotels';
// import NavBar2 from './NavBar2';


const HomePage = () => {
const token=sessionStorage.getItem('token');
    console.log(token);

    return (
        <div>
         
{/* <p>home page </p> */}
<Packages></Packages>
<Vehicles></Vehicles>
<Hotels></Hotels>
        </div>
    );
    
    
};

export default HomePage;