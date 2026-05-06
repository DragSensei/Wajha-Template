import { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

export default function PromoManager() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getPromoSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminApi.savePromoSettings(settings);
    alert('Promo settings saved!');
  };

  if (loading) return <div>Loading promo settings...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Promotion Management</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
        <div className="mb-4 flex items-center">
          <input 
            type="checkbox" 
            id="discount_active" 
            checked={settings.discount_active}
            onChange={(e) => setSettings({...settings, discount_active: e.target.checked})}
            className="mr-2"
          />
          <label htmlFor="discount_active" className="font-bold">Enable Promotions</label>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 font-bold">Discount Percentage</label>
          <input 
            type="number" 
            value={settings.discount_percent}
            onChange={(e) => setSettings({...settings, discount_percent: parseInt(e.target.value)})}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold">Custom Sale Text</label>
          <input 
            type="text" 
            value={settings.custom_sale_text}
            onChange={(e) => setSettings({...settings, custom_sale_text: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Promo Settings
        </button>
      </form>
    </div>
  );
}
