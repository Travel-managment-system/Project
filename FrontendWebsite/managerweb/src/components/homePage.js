import Vehicles from './vehicles';
import Packages from './packages';
import Hotels from './hotels';

const HomePage = () => {
const token=sessionStorage.getItem('token');
    console.log(token);

    return (
        <div>
            <Packages></Packages>
            <hr></hr>
            <Hotels></Hotels>
            <hr></hr>
            <Vehicles></Vehicles>
        </div>
    );
    
    
};

export default HomePage;