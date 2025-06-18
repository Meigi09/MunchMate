import { Routes, Route } from "react-router";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import CustomerDashboard from "./pages/customer/Customer";

import MunchMateLanding from "./pages/LandingPage";
import RestaurantDashboard from "./pages/restaurants/Restaurants";
import Layout from "./pages/Layout";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          // auth routes
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          // customer and restaurant routes
          <Route index element={<MunchMateLanding />} />
          <Route element={<RequireAuth />}>
            <Route path="/restaurants" element={<RestaurantDashboard />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/customers" element={<CustomerDashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;