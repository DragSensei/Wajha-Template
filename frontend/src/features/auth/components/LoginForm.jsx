import { useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center p-gutter">
      <main className="w-full max-w-[480px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0px_10px_30px_rgba(0,0,0,0.05)] p-xl">
        <div className="text-center mb-lg">
          <h1 className="font-display text-h3 font-bold tracking-tighter text-on-surface mb-xs">LUMINA</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Sign in to your account</p>
        </div>

        {error && (
            <div className="mb-6 p-3 rounded-sm border border-error text-error flex items-center gap-3">
              <p>{error}</p>
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-md">
          <div>
            <label className="block font-label-md text-label-md text-on-surface mb-xs" htmlFor="email">Email address</label>
            <div className="relative">
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@company.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded border-[#D2D2D7] bg-surface-container-lowest py-sm px-sm text-on-surface focus:border-primary focus:ring-primary font-body-md text-body-md placeholder:text-outline/50 transition-colors duration-200" 
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-xs">
              <label className="block font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
              <a className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors duration-200" href="#">Forgot password?</a>
            </div>
            <div className="relative">
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded border-[#D2D2D7] bg-surface-container-lowest py-sm px-sm text-on-surface focus:border-primary focus:ring-primary font-body-md text-body-md placeholder:text-outline/50 transition-colors duration-200" 
              />
            </div>
          </div>
          <button type="submit" className="w-full flex justify-center py-sm px-sm border border-transparent rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
            Sign In
          </button>
        </form>

        <div className="mt-lg">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-container-lowest font-caption text-caption text-on-surface-variant">Or continue with</span>
            </div>
          </div>
          <div className="mt-md grid grid-cols-2 gap-sm">
            <button type="button" className="btn-secondary w-full flex items-center justify-center px-sm py-sm rounded text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200">
              <span className="material-symbols-outlined mr-2 text-[20px]" data-icon="account_circle">account_circle</span>
              Google
            </button>
            <button type="button" className="btn-secondary w-full flex items-center justify-center px-sm py-sm rounded text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors duration-200">
              <span className="material-symbols-outlined mr-2 text-[20px]" data-icon="business_center">business_center</span>
              Microsoft
            </button>
          </div>
        </div>
        <p className="mt-lg text-center font-caption text-caption text-on-surface-variant">
            Don't have an account? <Link to="/register" className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors duration-200">Contact Sales</Link>
        </p>
      </main>
    </div>
  );
}