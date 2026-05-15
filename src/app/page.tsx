'use client';

// Job Application Tracker
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ResumeManager from './components/ResumeManager';

interface Job {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'rejected' | 'offer';
  salary?: string;
  appliedDate: string;
  notes?: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'resumes'>('jobs');
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied' as const,
    salary: '',
    notes: '',
  });

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
    setIsLoading(false);
  }, []);

  // Save jobs to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }, [jobs, isLoading]);

  const handleAddJob = () => {
    if (!formData.company || !formData.position) {
      alert('Please fill in company and position');
      return;
    }
    const newJob: Job = {
      id: Date.now().toString(),
      company: formData.company,
      position: formData.position,
      status: formData.status,
      salary: formData.salary,
      appliedDate: new Date().toISOString().split('T')[0],
      notes: formData.notes,
    };
    setJobs([newJob, ...jobs]);
    setFormData({ company: '', position: '', status: 'applied', salary: '', notes: '' });
    setShowForm(false);
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const statusColors = {
    // Job status color scheme
    applied: 'bg-blue-100 text-blue-800',
    interview: 'bg-purple-100 text-purple-800',
    rejected: 'bg-red-100 text-red-800',
    offer: 'bg-green-100 text-green-800',
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-green-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fbbf24" strokeWidth="0.5"/>
            </pattern>
            <pattern id="dots" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="#22c55e" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <main className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-8 items-center py-16 px-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Land Your <span className="text-green-500 font-extrabold">Dream Job</span>
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Track every application, ace every interview, and get ahead with AI-powered coaching. Your job search, simplified.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-green-400 hover:bg-green-500 text-gray-900 px-6 py-3 rounded-lg font-semibold transition cursor-pointer shadow-lg"
              >
                ✨ Get Started
              </button>
              <button 
                onClick={() => document.getElementById('jobs-list')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border-2 border-green-400 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                📚 Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-8">
          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-400">
            <div className="text-4xl mb-2">📱</div>
            <p className="text-gray-600 text-sm">Track Applications</p>
            <p className="text-2xl font-bold text-green-500">100% Free</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-yellow-400">
            <div className="text-4xl mb-2">🤖</div>
            <p className="text-gray-600 text-sm">AI Coaching</p>
            <p className="text-2xl font-bold text-yellow-500">Built-in</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-400">
            <div className="text-4xl mb-2">⚡</div>
            <p className="text-gray-600 text-sm">Interview Ready</p>
            <p className="text-2xl font-bold text-green-500">Fast</p>
          </div>
        </div>

        {/* Main App Section */}
        <div className="px-6 pb-16" id="jobs-list">

        {/* Tabs Navigation */}
        <div className="mb-8 flex gap-4 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-bold text-lg transition border-b-4 ${
              activeTab === 'jobs'
                ? 'border-yellow-400 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 Applications
          </button>
          <button
            onClick={() => setActiveTab('resumes')}
            className={`px-6 py-3 font-bold text-lg transition border-b-4 ${
              activeTab === 'resumes'
                ? 'border-yellow-400 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            📄 Resumes
          </button>
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <>
        {/* Add Job Button */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Applications</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 px-8 py-3 bg-gradient-to-r from-green-400 to-green-300 text-gray-900 rounded-lg font-bold hover:from-green-500 hover:to-green-400 transition shadow-lg"
          >
            {showForm ? '✕ Cancel' : '+ Add New Application'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border-t-4 border-green-400">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="text-3xl">📝</span> New Job Application
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Salary Range (optional)"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview Scheduled</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer Received</option>
              </select>
            </div>
            <textarea
              placeholder="Notes (e.g., job description highlights, contact info)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full mt-4 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              rows={3}
            />
            <button
              onClick={handleAddJob}
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-300 text-gray-900 rounded-lg font-bold hover:from-green-500 hover:to-green-400 transition shadow-lg"
            >
              ✓ Add Application
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-2">📊 Applications</p>
            <p className="text-4xl font-bold">{jobs.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-400 rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-2">📞 Interviews</p>
            <p className="text-4xl font-bold">{jobs.filter(j => j.status === 'interview').length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-400 rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-2">🎉 Offers</p>
            <p className="text-4xl font-bold">{jobs.filter(j => j.status === 'offer').length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-xl p-6 shadow-lg text-white">
            <p className="text-sm opacity-90 mb-2">🎯 Success Rate</p>
            <p className="text-4xl font-bold">{jobs.length > 0 ? Math.round(((jobs.filter(j => j.status === 'interview' || j.status === 'offer').length) / jobs.length) * 100) : 0}%</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center shadow-lg">
              <p className="text-5xl mb-4">🚀</p>
              <p className="text-gray-600 text-lg font-semibold">Start your job search journey!</p>
              <p className="text-gray-500 mt-2">Add your first application to get started tracking your success</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-l-4 border-green-600">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{job.position}</h3>
                    <p className="text-gray-600 text-lg">{job.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${statusColors[job.status]}`}>
                      {job.status === 'applied' && '📤'}
                      {job.status === 'interview' && '📞'}
                      {job.status === 'rejected' && '❌'}
                      {job.status === 'offer' && '🎉'}
                      {' '}{job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 font-semibold"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">📅 {job.appliedDate}</span>
                  {job.salary && <span className="bg-gray-100 px-3 py-1 rounded-full">💰 {job.salary}</span>}
                </div>
                {job.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                    <p className="text-gray-700 text-sm">{job.notes}</p>
                  </div>
                )}
                <Link
                  href={`/insights?company=${encodeURIComponent(job.company)}&position=${encodeURIComponent(job.position)}&notes=${encodeURIComponent(job.notes || '')}`}
                  className="inline-block px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 text-sm font-bold transition"
                >
                  💡 Get AI Insights
                </Link>
              </div>
            ))
          )}
        </div>
        </>
        )}

        {/* Resumes Tab */}
        {activeTab === 'resumes' && (
          <ResumeManager />
        )}
      </div>
    </main>
  </div>
  );
}
