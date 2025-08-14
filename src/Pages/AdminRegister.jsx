import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminRegister = () => {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    try {
      const response = await fetch('https://portofolio-backend-ex4b.onrender.com/admin-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      setSuccess('Registration successful!');
      setForm({ name: '', email: '', password: '' });
      navigate("/admin/login")
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  flex-col gap-8 bg-gradient-to-br from-blue-900 to-purple-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md animate-fade-in-up"
        style={{
          animation: 'fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both'
        }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-300 mb-8 animate-fade-in">
          Admin Registration
        </h2>
        <div className="mb-5 animate-slide-in-left">
          <label className="block text-blue-100 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={form.name}
            onChange={handleChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-5 animate-slide-in-right">
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
          />
        </div>
        <div className="mb-7 animate-slide-in-up">
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
          <div className="mb-4 text-red-400 text-center animate-fade-in">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-400 text-center animate-fade-in">{success}</div>
        )}
        <button
          type="submit"
          className={`w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          } animate-bounce-in`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            'Register'
          )}
        </button>
      </form>
      <h1
        className="mt-8 text-lg font-semibold text-blue-200 text-center animate-fade-in-up transition-transform duration-300 hover:scale-105 hover:text-purple-300 cursor-pointer hover:underline"
        style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
        onClick={() => window.location.href = '/admin/login'}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') window.location.href = '/admin/login'; }}
      >
        Already Registered? <span className="underline hover:text-blue-400 transition-colors duration-200">Login here</span>
      </h1>
      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
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
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-in-up {
          animation: slideInUp 0.7s 0.3s both;
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

export default AdminRegister;