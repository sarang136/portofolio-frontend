import React from 'react'

const Footer = () => {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 animate-footer-fade-in">
        <div className="text-lg font-semibold tracking-wide flex items-center gap-2">
          <span className="animate-footer-pop">© {new Date().getFullYear()} MyPortfolio</span>
        </div>
        <div className="flex gap-6 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors duration-200 animate-footer-pop"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            aria-label="GitHub"
          >
            <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
            </svg>
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-300 transition-colors duration-200 animate-footer-pop"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76zm13.5 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.85-1.54 3.05 0 3.61 2.01 3.61 4.62v5.56z"/>
            </svg>
          </a>
          <a
            href="mailto:your.email@example.com"
            className="hover:text-yellow-300 transition-colors duration-200 animate-footer-pop"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            aria-label="Email"
          >
            <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 13.065l-11.99-7.065v14h23.98v-14l-11.99 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z"/>
            </svg>
          </a>
        </div>
      </div>
      <style>
        {`
          @keyframes footer-fade-in {
            0% { opacity: 0; transform: translateY(40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          @keyframes footer-pop {
            0% { opacity: 0; transform: scale(0.8);}
            80% { opacity: 1; transform: scale(1.05);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-footer-fade-in {
            animation: footer-fade-in 1.2s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
          .animate-footer-pop {
            animation: footer-pop 1.1s cubic-bezier(.68,-0.55,.27,1.55) both;
          }
        `}
      </style>
    </footer>
  )
}

export default Footer