import { useState, useEffect } from 'react';
import { adminApi } from '../api/adminApi';

export default function SettingsManager() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getSettings().then(data => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminApi.saveSettings(settings);
    alert('Settings saved!');
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Global Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg">
        <div className="mb-6">
          <label className="block mb-2 font-bold">WhatsApp Number</label>
          <input 
            type="text" 
            value={settings.whatsapp_number}
            onChange={(e) => setSettings({...settings, whatsapp_number: e.target.value})}
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
}
