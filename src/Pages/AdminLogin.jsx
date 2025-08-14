import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://portofolio-backend-ex4b.onrender.com/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      // Optionally, store token or user info here
      navigate('/admin/post-yourself');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md animate-fade-in-up"
        style={{
          animation: 'fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both'
        }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-300 mb-8 animate-fade-in">
          Admin Login
        </h2>
        <div className="mb-5 animate-slide-in-left">
          <label className="block text-blue-100 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.email}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-7 animate-slide-in-right">
          <label className="block text-blue-100 font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-400 text-center animate-bounce-in">{error}</div>
        )}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg transition duration-200 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-400 animate-bounce-in ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s both;
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.7s 0.1s both;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-slide-in-right {
          animation: slideInRight 0.7s 0.2s both;
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          60% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s 0.4s both;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;