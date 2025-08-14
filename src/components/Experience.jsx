import React, { useEffect, useState } from 'react';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://portofolio-backend-ex4b.onrender.com/get/experience');
        const data = await res.json();
        setExperiences(data.expGot || []);
      } catch (err) {
        setError('Failed to fetch experience');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-pink-100 py-16 px-4 flex flex-col items-center">
      <div className="mb-10 text-center">
        <p className="text-4xl font-extrabold text-orange-900 tracking-wide mb-2 animate-fade-in-down drop-shadow-lg">Experience</p>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-grow shadow" />
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
          <div className="loader mb-4"></div>
          <p className="text-orange-700 text-lg font-semibold animate-fade-in-up">Loading experience...</p>
          <style>
            {`
              .loader {
                border: 6px solid #fb923c;
                border-top: 6px solid #f472b6;
                border-radius: 50%;
                width: 48px;
                height: 48px;
                animation: spin 1s linear infinite;
                margin-bottom: 0.5rem;
              }
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
              }
            `}
          </style>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center text-lg font-semibold">{error}</div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-8">
          {experiences.length === 0 ? (
            <div className="text-orange-700 text-center text-lg font-semibold">No experience found.</div>
          ) : (
            experiences.map((exp, idx) => (
              <div
                key={exp._id}
                className="relative bg-white/90 rounded-2xl shadow-lg p-8 border border-orange-100 hover:scale-[1.02] hover:shadow-orange-200/40 transition-transform duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 120}ms`, animationFillMode: 'both' }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-700 mb-1 tracking-tight">{exp.companyName}</h3>
                    <div className="text-sm text-orange-500 font-semibold mb-2">{exp.address}</div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-orange-200 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-orange-300">{exp.jobRole}</span>
                      <span className="bg-pink-200 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm border border-pink-300">{exp.jobType}</span>
                    </div>
                  </div>
                  <div className="text-right md:text-center">
                    <div className="text-orange-600 font-semibold text-sm">
                      {formatDate(exp.fromDate)} - {exp.toDate ? formatDate(exp.toDate) : 'Present'}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed">{exp.jobDescription}</p>
              </div>
            ))
          )}
        </div>
      )}
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
          @keyframes grow {
            0% { width: 0;}
            100% { width: 100%;}
          }
          .animate-fade-in-down {
            animation: fade-in-down 1s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.1s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          .animate-grow {
            animation: grow 1.2s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
        `}
      </style>
    </div>
  );
};

export default Experience;