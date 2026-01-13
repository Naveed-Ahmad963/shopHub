import Toaster from "./config/Toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NotFound from "./pages/404";
import Login from "../src/features/auth/Login";
import Register from "../src/features/auth/Register";
import ForgotPassword from "../src/features/auth/ForgotPasswprd"; // ✅ NEW
import ResetPassword from "../src/features/auth/ResetPassword"; // ✅ NEW
import Profile from "./features/auth/Profile";
import ProductDetail from "./features/products/ProductDetail";
import Cart from "./features/cart/Cart";
import Checkout from "./features/orders/Checkout";
import OrderDetail from "./features/orders/OrderDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyOrders from "./features/orders/OrderList";

// Admin Pages
import Dashboard from "./features/admin/Dashboard";
import ManageProducts from "./features/admin/ManageProducts";
import ManageOrders from "./features/admin/ManageOrders";
import ManageCategories from "./features/admin/ManageCategories";
import ManageUsers from "./features/admin/ManageUsers";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />{" "}
              {/* ✅ NEW */}
              <Route
                path="/reset-password/:resetToken"
                element={<ResetPassword />}
              />{" "}
              {/* ✅ NEW */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/orders" element={<MyOrders />} />
              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
                  </ProtectedRoute>
                }
              />
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute adminOnly>
                    <ManageProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute adminOnly>
                    <ManageOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute adminOnly>
                    <ManageCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute adminOnly>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
