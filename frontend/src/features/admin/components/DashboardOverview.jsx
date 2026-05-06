import { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

export default function DashboardOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">YTD Sales</h3>
          <p className="text-3xl font-bold">${data.ytd_sales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500">Sales Growth</h3>
          <p className="text-3xl font-bold text-green-600">+{data.sales_growth}%</p>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.recent_orders.map(order => (
              <tr key={order.id} className="border-t">
                <td className="p-4">#{order.id}</td>
                <td className="p-4">{order.customer_name}</td>
                <td className="p-4">${order.total_amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
