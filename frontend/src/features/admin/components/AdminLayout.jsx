import { Outlet, Link } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin" className="block p-2 rounded hover:bg-gray-50">Dashboard</Link>
          <Link to="/admin/products" className="block p-2 rounded hover:bg-gray-50">Products</Link>
          <Link to="/admin/orders" className="block p-2 rounded hover:bg-gray-50">Orders</Link>
          <Link to="/admin/promo" className="block p-2 rounded hover:bg-gray-50">Promotions</Link>
          <Link to="/admin/settings" className="block p-2 rounded hover:bg-gray-50">Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
