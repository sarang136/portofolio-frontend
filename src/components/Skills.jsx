import React, { useEffect, useState } from 'react'

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('https://portofolio-backend-ex4b.onrender.com/get/skills');
        const data = await res.json();
        setSkills(data.skillsGot || []);
      } catch (err) {
        setError('Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 py-16 px-4 flex flex-col items-center">
      <div className="mb-10 text-center">
        <p className="text-4xl font-extrabold text-indigo-900 tracking-wide mb-2 animate-fade-in-down drop-shadow-lg">Skills</p>
        <div className="mx-auto w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-grow shadow" />
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh]">
          <div className="loader mb-4"></div>
          <p className="text-indigo-700 text-lg font-semibold animate-fade-in-up">Loading skills...</p>
          <style>
            {`
              .loader {
                border: 6px solid #6366f1;
                border-top: 6px solid #a78bfa;
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
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 w-full max-w-6xl">
          {skills.map((skill, idx) => (
            <div
              key={skill._id}
              className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-6 border border-indigo-100 hover:scale-105 hover:shadow-indigo-300/40 transition-transform duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}
            >
              <img
                src={skill.image}
                alt={skill.skillName}
                className="w-16 h-16 object-cover rounded-full mb-4 shadow-md border-2 border-indigo-200 animate-pop"
                style={{ animationDelay: `${idx * 100 + 200}ms`, animationFillMode: 'both' }}
              />
              <span className="text-indigo-900 font-semibold text-lg text-center">{skill.skillName}</span>
            </div>
          ))}
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
            100% { width: 6rem;}
          }
          @keyframes pop {
            0% { opacity: 0; transform: scale(0.8);}
            80% { opacity: 1; transform: scale(1.08);}
            100% { opacity: 1; transform: scale(1);}
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
          .animate-pop {
            animation: pop 1.1s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
        `}
      </style>
    </div>
  )
}

export default Skills