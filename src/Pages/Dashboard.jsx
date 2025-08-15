import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Helper to calculate months between two dates
function getMonthsDiff(from, to) {
  if (!from || !to) return '';
  const fromDate = new Date(from);
  const toDate = new Date(to);
  let months;
  months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
  months -= fromDate.getMonth();
  months += toDate.getMonth();
  if (toDate.getDate() < fromDate.getDate()) months--;
  return months >= 0 ? `${months + 1} month${months + 1 !== 1 ? 's' : ''}` : '';
}

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState({
    projectName: '',
    projectDescription: '',
    skillsUsed: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillsError, setSkillsError] = useState('');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ skillName: '', image: '' });

  const [experience, setExperience] = useState([]);
  const [experienceLoading, setExperienceLoading] = useState(false);
  const [experienceError, setExperienceError] = useState('');
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    companyName: '',
    jobRole: '',
    jobType: '',
    jobDescription: '',
    fromDate: '',
    toDate: '',
    address: '',
  });

  // Fetch all projects on mount and after add/edit
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/get-all-projects`);
      const data = await res.json();
      setProjects(Array.isArray(data.projects) ? data.projects : []);
    } catch (err) {
      setProjects([]);
    }
  };

  // Fetch all skills
  const fetchSkills = async () => {
    setSkillsLoading(true);
    setSkillsError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/get/skills`);
      const data = await res.json();
      setSkills(Array.isArray(data.skillsGot) ? data.skillsGot : []);
    } catch (err) {
      setSkills([]);
      setSkillsError('Failed to fetch skills');
    } finally {
      setSkillsLoading(false);
    }
  };

  // Fetch all experience
  const fetchExperience = async () => {
    setExperienceLoading(true);
    setExperienceError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/get/experience`);
      const data = await res.json();
      setExperience(Array.isArray(data.expGot) ? data.expGot : []);
    } catch (err) {
      setExperience([]);
      setExperienceError('Failed to fetch experience');
    } finally {
      setExperienceLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchExperience();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setMessage('');
    setProject({
      projectName: '',
      projectDescription: '',
      skillsUsed: '',
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const skillsArray = project.skillsUsed
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      if (editMode && editId) {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/edit-project/${editId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectName: project.projectName,
            projectDescription: project.projectDescription,
            skillsUsed: skillsArray,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to update project');
        }

        setShowModal(false);
        setMessage('Project updated');
        setProject({
          projectName: '',
          projectDescription: '',
          skillsUsed: '',
        });
        setEditMode(false);
        setEditId(null);
        await fetchProjects();
      } else {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/add-project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectName: project.projectName,
            projectDescription: project.projectDescription,
            skillsUsed: skillsArray,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to add project');
        }

        setShowModal(false);
        setMessage('Project added');
        setProject({
          projectName: '',
          projectDescription: '',
          skillsUsed: '',
        });
        await fetchProjects();
      }
    } catch (err) {
      setMessage(err.message || (editMode ? 'Failed to update project' : 'Failed to add project'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (proj) => {
    setEditMode(true);
    setEditId(proj._id);
    setProject({
      projectName: proj.projectName || '',
      projectDescription: proj.projectDescription || '',
      skillsUsed: Array.isArray(proj.skillsUsed) ? proj.skillsUsed.join(', ') : (proj.skillsUsed || ''),
    });
    setShowModal(true);
    setMessage('');
  };

  // Handlers for Add Skill and Add Experience modals
  const handleOpenSkillModal = () => {
    setNewSkill({ skillName: '', image: '' });
    setShowSkillModal(true);
  };
  const handleCloseSkillModal = () => {
    setShowSkillModal(false);
  };
  const handleSkillChange = (e) => {
    setNewSkill((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    setSkillsLoading(true);
    setSkillsError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/add/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add skill');
      }
      setShowSkillModal(false);
      await fetchSkills();
    } catch (err) {
      setSkillsError(err.message || 'Failed to add skill');
    } finally {
      setSkillsLoading(false);
    }
  };

  const handleOpenExperienceModal = () => {
    setNewExperience({
      companyName: '',
      jobRole: '',
      jobType: '',
      jobDescription: '',
      fromDate: '',
      toDate: '',
      address: '',
    });
    setShowExperienceModal(true);
  };
  const handleCloseExperienceModal = () => {
    setShowExperienceModal(false);
  };
  const handleExperienceChange = (e) => {
    setNewExperience((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSaveExperience = async (e) => {
    e.preventDefault();
    setExperienceLoading(true);
    setExperienceError('');
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/post/experience`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExperience),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add experience');
      }
      setShowExperienceModal(false);
      await fetchExperience();
    } catch (err) {
      setExperienceError(err.message || 'Failed to add experience');
    } finally {
      setExperienceLoading(false);
    }
  };

  // Table cell style helpers (classic colors)
  const thClass = "px-4 py-2 bg-white text-left font-bold border-b border-black";
  const tdClass = "px-4 py-2 bg-white border-b border-gray-300";

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }} className="flex flex-col items-center justify-center">
      <div style={{ background: '#fff', border: '1px solid #e5e7eb' }} className="shadow-lg rounded-lg px-4 py-8 w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#222' }}>
          Admin Dashboard
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={handleOpenModal}
            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded shadow transition"
          >
            Add Project
          </button>
          <button
            onClick={handleOpenSkillModal}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded shadow transition"
          >
            Add Skill
          </button>
          <button
            onClick={handleOpenExperienceModal}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded shadow transition"
          >
            Add Experience
          </button>
        </div>
        {message && (
          <div
            className={`text-center mb-4 ${message === 'Project added' || message === 'Project updated'
              ? 'text-green-500'
              : 'text-red-500'
              }`}
          >
            {message}
          </div>
        )}

        {/* Skills Table */}
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: '#222' }}>All Skills</h2>
          {skillsLoading ? (
            <div className="text-center text-black">Loading skills...</div>
          ) : skillsError ? (
            <div className="text-red-500 text-center">{skillsError}</div>
          ) : skills.length === 0 ? (
            <div className="text-center text-black">No skills found.</div>
          ) : (
            <table className="min-w-[350px] w-full border-collapse" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th className={thClass}>#</th>
                  <th className={thClass}>Skill Name</th>
                  <th className={thClass}>Image</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, idx) => (
                  <tr key={skill._id || skill.skillName}>
                    <td className={tdClass}>{idx + 1}</td>
                    <td className={tdClass + " font-semibold text-black"}>{skill.skillName}</td>
                    <td className={tdClass}>
                      {skill.image ? (
                        <img src={skill.image} alt={skill.skillName} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
                      ) : (
                        <span className="italic text-gray-500">No image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Experience Table */}
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: '#222' }}>All Experience</h2>
          {experienceLoading ? (
            <div className="text-center text-black">Loading experience...</div>
          ) : experienceError ? (
            <div className="text-red-500 text-center">{experienceError}</div>
          ) : experience.length === 0 ? (
            <div className="text-center text-black">No experience found.</div>
          ) : (
            <table className="min-w-[700px] w-full border-collapse" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th className={thClass}>#</th>
                  <th className={thClass}>Company</th>
                  <th className={thClass}>Role</th>
                  <th className={thClass}>Type</th>
                  <th className={thClass}>Description</th>
                  <th className={thClass}>From</th>
                  <th className={thClass}>To</th>
                  <th className={thClass}>Duration</th>
                  <th className={thClass}>Address</th>
                </tr>
              </thead>
              <tbody>
                {experience.map((exp, idx) => (
                  <tr key={exp._id || exp.companyName}>
                    <td className={tdClass}>{idx + 1}</td>
                    <td className={tdClass + " font-bold text-black"}>{exp.companyName}</td>
                    <td className={tdClass + " text-black"}>{exp.jobRole}</td>
                    <td className={tdClass + " text-black"}>{exp.jobType}</td>
                    <td className={tdClass + " text-xs text-black"}>{exp.jobDescription}</td>
                    <td className={tdClass + " text-xs text-black"}>
                      {exp.fromDate ? new Date(exp.fromDate).toLocaleDateString() : ""}
                    </td>
                    <td className={tdClass + " text-xs text-black"}>
                      {exp.toDate ? new Date(exp.toDate).toLocaleDateString() : ""}
                    </td>
                    <td className={tdClass + " text-xs text-black"}>
                      {exp.fromDate && exp.toDate ? getMonthsDiff(exp.fromDate, exp.toDate) : ""}
                    </td>
                    <td className={tdClass + " text-xs text-black"}>{exp.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Projects Table */}
        <div className="mb-8 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: '#222' }}>All Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center text-black">No projects found.</div>
          ) : (
            <table className="min-w-[700px] w-full border-collapse" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th className={thClass}>#</th>
                  <th className={thClass}>Project Name</th>
                  <th className={thClass}>Description</th>
                  <th className={thClass}>Skills Used</th>
                  <th className={thClass}>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj, idx) => (
                  <tr key={proj._id}>
                    <td className={tdClass}>{idx + 1}</td>
                    <td className={tdClass + " font-bold text-black"}>{proj.projectName}</td>
                    <td className={tdClass + " text-black"}>{proj.projectDescription}</td>
                    <td className={tdClass + " text-xs text-black"}>
                      {Array.isArray(proj.skillsUsed) ? proj.skillsUsed.join(', ') : proj.skillsUsed}
                    </td>
                    <td className={tdClass}>
                      <button
                        onClick={() => handleEdit(proj)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded transition"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-10 text-center">
          <div className="text-black">
            Welcome to your dashboard. Here you can add new projects, add skills, and add experience. <Link to="/" className='hover:text-blue-500 hover:underline'> Go back to Portfolio</Link>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-black hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#222' }}>
              {editMode ? 'Edit Project' : 'Add Project'}
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block font-semibold mb-1" htmlFor="projectName" style={{ color: '#222' }}>
                  Project Name
                </label>
                <input
                  id="projectName"
                  name="projectName"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={project.projectName}
                  onChange={handleChange}
                  required
                  autoFocus
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="projectDescription" style={{ color: '#222' }}>
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={project.projectDescription}
                  onChange={handleChange}
                  required
                  rows={3}
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="skillsUsed" style={{ color: '#222' }}>
                  Skills Used
                </label>
                <input
                  id="skillsUsed"
                  name="skillsUsed"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={project.skillsUsed}
                  onChange={handleChange}
                  required
                  placeholder="e.g. React, Node.js, MongoDB"
                  disabled={loading}
                />
                <p className="text-xs text-gray-600 mt-1">Separate skills with commas</p>
              </div>
              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded transition"
                disabled={loading}
              >
                {loading ? (editMode ? 'Updating...' : 'Saving...') : (editMode ? 'Update' : 'Save')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={handleCloseSkillModal}
              className="absolute top-3 right-4 text-black hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#222' }}>
              Add Skill
            </h2>
            <form onSubmit={handleSaveSkill} className="space-y-5">
              <div>
                <label className="block font-semibold mb-1" htmlFor="skillName" style={{ color: '#222' }}>
                  Skill Name
                </label>
                <input
                  id="skillName"
                  name="skillName"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newSkill.skillName}
                  onChange={handleSkillChange}
                  required
                  autoFocus
                  disabled={skillsLoading}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="image" style={{ color: '#222' }}>
                  Image URL (optional)
                </label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newSkill.image}
                  onChange={handleSkillChange}
                  disabled={skillsLoading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
                disabled={skillsLoading}
              >
                {skillsLoading ? 'Saving...' : 'Save'}
              </button>
            </form>
            {skillsError && (
              <div className="text-red-500 text-center mt-2">{skillsError}</div>
            )}
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={handleCloseExperienceModal}
              className="absolute top-3 right-4 text-black hover:text-red-500 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#222' }}>
              Add Experience
            </h2>
            <form onSubmit={handleSaveExperience} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1" htmlFor="companyName" style={{ color: '#222' }}>
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newExperience.companyName}
                  onChange={handleExperienceChange}
                  required
                  autoFocus
                  disabled={experienceLoading}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="jobRole" style={{ color: '#222' }}>
                  Job Role
                </label>
                <input
                  id="jobRole"
                  name="jobRole"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newExperience.jobRole}
                  onChange={handleExperienceChange}
                  required
                  disabled={experienceLoading}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="jobType" style={{ color: '#222' }}>
                  Job Type
                </label>
                <input
                  id="jobType"
                  name="jobType"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newExperience.jobType}
                  onChange={handleExperienceChange}
                  required
                  disabled={experienceLoading}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="jobDescription" style={{ color: '#222' }}>
                  Job Description
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newExperience.jobDescription}
                  onChange={handleExperienceChange}
                  required
                  rows={2}
                  disabled={experienceLoading}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block font-semibold mb-1" htmlFor="fromDate" style={{ color: '#222' }}>
                    From Date
                  </label>
                  <input
                    id="fromDate"
                    name="fromDate"
                    type="date"
                    className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                    value={newExperience.fromDate}
                    onChange={handleExperienceChange}
                    required
                    disabled={experienceLoading}
                  />
                </div>
                <div className="flex-1">
                  <label className="block font-semibold mb-1" htmlFor="toDate" style={{ color: '#222' }}>
                    To Date
                  </label>
                  <input
                    id="toDate"
                    name="toDate"
                    type="date"
                    className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                    value={newExperience.toDate}
                    onChange={handleExperienceChange}
                    required
                    disabled={experienceLoading}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="address" style={{ color: '#222' }}>
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none"
                  value={newExperience.address}
                  onChange={handleExperienceChange}
                  required
                  disabled={experienceLoading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
                disabled={experienceLoading}
              >
                {experienceLoading ? 'Saving...' : 'Save'}
              </button>
            </form>
            {experienceError && (
              <div className="text-red-500 text-center mt-2">{experienceError}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;