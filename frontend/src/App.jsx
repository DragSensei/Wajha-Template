import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import { CartProvider } from './lib/CartContext';

import LoginForm from './features/auth/components/LoginForm';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import AdminRoute from './features/auth/components/AdminRoute';

import AdminLayout from './features/admin/components/AdminLayout';
import DashboardOverview from './features/admin/components/DashboardOverview';
import ProductManager from './features/admin/components/ProductManager';
import OrderManager from './features/admin/components/OrderManager';
import PromoManager from './features/admin/components/PromoManager';
import SettingsManager from './features/admin/components/SettingsManager';

import PublicStore from './features/inventory/components/PublicStore';
import StoreInventory from './features/inventory/components/StoreInventory';
import CartDrawer from './features/cart/components/CartDrawer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CartDrawer />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<PublicStore />} />
            <Route path="/store" element={<StoreInventory />} />
            
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<DashboardOverview />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="orders" element={<OrderManager />} />
              <Route path="promo" element={<PromoManager />} />
              <Route path="settings" element={<SettingsManager />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
