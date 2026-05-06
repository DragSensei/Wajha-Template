import { useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 rounded-lg border shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="mb-8 text-center">
            <h2 className="font-bold tracking-tight mb-2">Welcome Back</h2>
            <p className="uppercase tracking-widest font-semibold">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-sm border flex items-center gap-3">
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest mb-2 font-bold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border rounded-sm p-3 outline-none"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest mb-2 font-bold">
                Secure Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border rounded-sm p-3 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-10 py-4 uppercase tracking-widest font-bold rounded-sm border"
          >
            Authenticate
          </button>
        </div>
      </form>
    </div>
  );
}
