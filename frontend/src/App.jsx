import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WorkInProgress from "./pages/WorkInProgress";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminEquipments from "./pages/admin/AdminEquipments";
import AdminRentals from "./pages/admin/AdminRentals";

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Routes publiques avec header et footer */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/vehicle/:id" element={<VehicleDetails />} />
                  <Route path="/booking/:id" element={<Booking />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/en-travaux" element={<WorkInProgress />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Route de connexion admin (sans header/footer) */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Routes admin protégées (avec leur propre layout) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vehicles"
          element={
            <ProtectedRoute>
              <AdminVehicles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipments"
          element={
            <ProtectedRoute>
              <AdminEquipments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rentals"
          element={
            <ProtectedRoute>
              <AdminRentals />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
