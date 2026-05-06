import { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await adminApi.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      await adminApi.deleteProduct(id);
      loadProducts();
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.id}</td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <button className="text-blue-600 mr-2">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
