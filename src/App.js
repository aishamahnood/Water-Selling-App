import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import AddProduct from './pages/admin/Products/AddProduct';
import AddCategory from './pages/admin/AddCategory';
import E404 from './pages/admin/404';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './Components/Layout';
import Orders from './pages/admin/Orders/Order'; // Update the path to the Order component
import Login from './pages/auth/Login';
import VendorProfile from './pages/admin/VendorProfile';
import EditVendorProfile from "./pages/admin/EditVendorProfile"; // Adjust the path
import OrderDetails from './pages/admin/Orders/OrderDetails'; // Update the path to the OrderDetails component

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
            <Route path="/orders" element={<Layout><Orders /></Layout>} />
            <Route path="/vendor/:id" element={<Layout><VendorProfile /></Layout>} />
            <Route path="/edit-vendor" element={<EditVendorProfile />} />
            <Route path="/orders/:orderId" element={<OrderDetails />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
