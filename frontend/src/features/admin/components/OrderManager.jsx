import { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await adminApi.getOrders();
    setOrders(data);
    setLoading(false);
  };

  const handleComplete = async (id) => {
    await adminApi.completeOrder(id);
    loadOrders();
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">
                  <div>{order.customer_name}</div>
                  <div className="text-sm text-gray-500">{order.customer_email}</div>
                </td>
                <td className="p-4">${order.total_amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  {order.status !== 'completed' && (
                    <button onClick={() => handleComplete(order.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
