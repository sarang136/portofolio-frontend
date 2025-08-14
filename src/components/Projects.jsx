import React, { useEffect, useState } from 'react'

const Projects = () => {
  const [allProjects, setAllProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://portofolio-backend-ex4b.onrender.com/get-all-projects');
      const projects = await response.json();
      setAllProjects(projects.projects);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="mb-10 text-center">
        <p className="text-4xl font-extrabold text-white tracking-wide mb-2 animate-fade-in-down drop-shadow-lg">Projects</p>
        <div className="mx-auto w-28 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-grow shadow" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="loader mb-4"></div>
          <p className="text-white text-lg font-semibold animate-fade-in-up">Loading projects...</p>
          <style>
            {`
              .loader {
                border: 6px solid #3b82f6;
                border-top: 6px solid #a78bfa;
                border-radius: 50%;
                width: 56px;
                height: 56px;
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
        <div className="text-red-400 text-center text-lg font-semibold">{error}</div>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {allProjects?.map((project, idx) => (
            <div
              key={project._id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-blue-900/40 animate-fade-in-up"
              style={{ animationDelay: `${idx * 120}ms`, animationFillMode: 'both' }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-3 tracking-tight">{project.projectName}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.projectDescription}</p>
              <div className="flex flex-wrap gap-3">
                {project.skillsUsed?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-600/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md animate-pop border border-blue-400/30"
                    style={{ animationDelay: `${idx * 120 + i * 60}ms`, animationFillMode: 'both' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animations using Tailwind + custom keyframes */}
      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(30px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-30px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-down {
            animation: fade-in-down 0.7s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes grow {
            0% { width: 0;}
            100% { width: 6rem;}
          }
          .animate-grow {
            animation: grow 1s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes pop {
            0% { opacity: 0; transform: scale(0.7);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-pop {
            animation: pop 0.5s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </div>
  )
}

export default Projects