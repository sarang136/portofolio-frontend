import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const [form, setForm] = useState({
        yourName: '',
        profileDescription: '',
        email: '',
        github: '',
        linkedin: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const email = localStorage.getItem('user');
    // console.log(email);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (email !== form.email) {
                alert("Email Invalid");
            }
            else {
                const res = fetch(`${import.meta.env.VITE_BASE_URL}/post-yourself`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });
                if (!res) {
                    throw new Error('Failed to submit details');
                }
                navigate('/admin/dashboard');
            }

        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 px-4 py-12">
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fade-in-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
                <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center animate-fade-in-down">Enter Your Details</h2>
                <div className="space-y-5">
                    <div className="flex flex-col">
                        <label className="font-semibold text-indigo-700 mb-1" htmlFor="yourName">Your Name</label>
                        <input
                            type="text"
                            id="yourName"
                            name="yourName"
                            value={form.yourName}
                            onChange={handleChange}
                            required
                            className="rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-indigo-700 mb-1" htmlFor="profileDescription">Profile Description</label>
                        <textarea
                            id="profileDescription"
                            name="profileDescription"
                            value={form.profileDescription}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
                            placeholder="Describe yourself"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-indigo-700 mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-indigo-700 mb-1" htmlFor="github">GitHub</label>
                        <input
                            type="url"
                            id="github"
                            name="github"
                            value={form.github}
                            onChange={handleChange}
                            required
                            className="rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            placeholder="https://github.com/yourusername"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold text-indigo-700 mb-1" htmlFor="linkedin">LinkedIn</label>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={form.linkedin}
                            onChange={handleChange}
                            required
                            className="rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>
                </div>
                {error && (
                    <div className="mt-4 text-red-600 text-center font-semibold animate-fade-in-up">{error}</div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-8 w-full py-3 rounded-lg font-bold text-lg text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-400 hover:to-indigo-500 focus:outline-none ${loading ? 'opacity-60 cursor-not-allowed' : ''
                        } animate-pop-in`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <span className="loader mr-2"></span>Submitting...
                        </span>
                    ) : (
                        'Submit'
                    )}
                </button>
                <style>
                    {`
            @keyframes fade-in-down {
              0% { opacity: 0; transform: translateY(-30px);}
              100% { opacity: 1; transform: translateY(0);}
            }
            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(30px);}
              100% { opacity: 1; transform: translateY(0);}
            }
            @keyframes pop-in {
              0% { opacity: 0; transform: scale(0.8);}
              80% { opacity: 1; transform: scale(1.05);}
              100% { opacity: 1; transform: scale(1);}
            }
            .animate-fade-in-down {
              animation: fade-in-down 1s cubic-bezier(.68,-0.55,.27,1.55) both;
            }
            .animate-fade-in-up {
              animation: fade-in-up 1.1s cubic-bezier(.68,-0.55,.27,1.55) both;
            }
            .animate-pop-in {
              animation: pop-in 1.2s 0.3s cubic-bezier(.68,-0.55,.27,1.55) both;
            }
            .loader {
              border: 4px solid #6366f1;
              border-top: 4px solid #a78bfa;
              border-radius: 50%;
              width: 22px;
              height: 22px;
              animation: spin 1s linear infinite;
              display: inline-block;
              vertical-align: middle;
            }
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
                </style>
            </form>
        </div>
    );
};

export default UserDetails;