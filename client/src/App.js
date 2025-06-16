import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Account from "./pages/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import SingleProduct from "./components/SingleProduct";
import AddProduct from "./components/AddProduct";
import ModifyProduct from "./components/ModifyProduct";
import { AuthProvider } from "./context/AuthContext";
import Unauthorized from "./components/Unauthorized";
import AdminRoute from "./Routes/ProtectedRoute";
import AllUsers from "./components/AllUsers";
import { lazy, Suspense } from "react";
const Homepage = lazy(() => import("./pages/Homepage"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/products" element={<Product />}></Route>
            <Route path="/product/:id" element={<SingleProduct />}></Route>
            <Route
              path="/addproduct/"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/modifyproduct"
              element={
                <AdminRoute>
                  <ModifyProduct />
                </AdminRoute>
              }
            ></Route>

            <Route path="/account" element={<Account />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
            </Route>
            <Route path="/userdata" element={<AllUsers />}></Route>
            <Route path="/unauthorized" element={<Unauthorized />}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
