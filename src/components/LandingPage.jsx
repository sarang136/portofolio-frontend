import React from 'react';

const LandingPage = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div className="text-2xl font-bold text-indigo-900 tracking-wide animate-fade-in-down">
            MyPortfolio
          </div>
          <div className="flex gap-8 text-lg font-medium">
            <a href="#about" className="text-indigo-900 hover:text-indigo-600 transition-colors duration-200">About</a>
            <a href="#projects" className="text-indigo-900 hover:text-indigo-600 transition-colors duration-200">Projects</a>
            <a href="#contact" className="text-indigo-900 hover:text-indigo-600 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center pt-32 px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-indigo-900 mb-8 animate-slide-down text-center drop-shadow-lg">
          Your Name
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-indigo-800 text-center mb-10 animate-fade-in-up">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 text-white font-semibold text-lg shadow-lg hover:scale-105 hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 animate-pop-in"
        >
          Resume
        </a>
      </main>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-30px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          @keyframes slide-down {
            0% { opacity: 0; transform: translateY(-60px);}
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
          .animate-slide-down {
            animation: slide-down 1.1s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s 0.3s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          .animate-pop-in {
            animation: pop-in 1.2s 0.7s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;