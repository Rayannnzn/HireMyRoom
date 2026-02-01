import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OwnerLayout from '../components/layout/OwnerLayout';
import GuestLayout from '../components/layout/GuestLayout';
import Home from '../pages/Home';
import Rooms from '../pages/Rooms';
import RoomDetails from '../pages/RoomDetails';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AboutUs from '../pages/AboutUs';
import OwnerDashboard from '../pages/owner/OwnerDashboard';
import AddProperty from '../pages/owner/AddProperty';
import ManageProperties from '../pages/owner/ManageProperties';
import UploadPhotos from '../pages/owner/UploadPhotos';
import Reservations from '../pages/owner/Reservations';
import OwnerProfile from '../pages/owner/Profile';
import BookingRequests from '../pages/guest/BookingRequests';
import MyBookings from '../pages/guest/MyBookings';
import GuestProfile from '../pages/guest/GuestProfile';

// Protected Route Component
function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard
    if (user.role === 'OWNER') {
      return <Navigate to="/owner/dashboard" replace />;
    } else {
      return <Navigate to="/guest/booking-requests" replace />;
    }
  }
  
  return children;
}

// Public Layout Component
function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/rooms"
          element={
            <PublicLayout>
              <Rooms />
            </PublicLayout>
          }
        />
        <Route
          path="/rooms/:id"
          element={
            <PublicLayout>
              <RoomDetails />
            </PublicLayout>
          }
        />
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <PublicLayout>
              <AboutUs />
            </PublicLayout>
          }
        />

        {/* Owner Routes */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute requiredRole="OWNER">
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="manage-properties" element={<ManageProperties />} />
          <Route path="upload-photos" element={<UploadPhotos />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="profile" element={<OwnerProfile />} />
          <Route index element={<Navigate to="/owner/dashboard" replace />} />
        </Route>

        {/* Guest Routes */}
        <Route
          path="/guest"
          element={
            <ProtectedRoute requiredRole="GUEST">
              <GuestLayout />
            </ProtectedRoute>
          }
        >
          <Route path="booking-requests" element={<BookingRequests />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="profile" element={<GuestProfile />} />
          <Route index element={<Navigate to="/guest/booking-requests" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
