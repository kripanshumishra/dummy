import logo from './logo.svg';
import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Login from './screen/admin/Login';
import PersistentUser from './screen/admin/PersistentUser';
import ProductUpload from './screen/admin/ProductUpload';
import CategoryForm from './screen/admin/CategoryForm';

function App() {
  return (
    <div className="App">
        
      <Routes>
        <Route path='admin/login' element={<Login/>} />
        <Route path='/' element={<PersistentUser />} >
          <Route index element={<div>
            <h1>this is home page for admin</h1>
            <nav>
              
        <Link to="/product/add">  Add product </Link> |{" "}
        <Link to="/category/add"> Add category </Link>
      </nav>
          </div>}/>
          <Route path='/product/add' element={<ProductUpload/>} />
          <Route path='/category/add' element={<CategoryForm/>} />
          {/* <Route path='delete' element={} />
          <Route path='update' element={} />  */}
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
