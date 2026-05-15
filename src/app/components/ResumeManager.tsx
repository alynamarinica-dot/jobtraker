'use client';

import { useState, useEffect } from 'react';

interface ResumeAnalysis {
  score: number;
  summary: string;
  categories: Record<string, { score: number; title: string; feedback: string }>;
  strengths: string[];
  improvements: string[];
  actionItems: string[];
  keywords: { present: string[]; missing: string[] };
}

interface Resume {
  id: string;
  fileName: string;
  uploadDate: string;
  analysis?: ResumeAnalysis;
  analysisDate?: string;
}

export default function ResumeManager() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Load resumes from localStorage
  useEffect(() => {
    const savedResumes = localStorage.getItem('resumes');
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
  }, []);

  // Save resumes to localStorage
  useEffect(() => {
    localStorage.setItem('resumes', JSON.stringify(resumes));
  }, [resumes]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'text/plain', 'text/x-plain'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or text file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!uploadedFile) {
      alert('Please select a file');
      return;
    }

    setIsUploading(true);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      // Call the Resume Platform API
      const response = await fetch('http://localhost:3001/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      // Create resume entry with analysis
      const newResume: Resume = {
        id: Date.now().toString(),
        fileName: uploadedFile.name,
        uploadDate: new Date().toLocaleDateString(),
        analysis: data.analysis,
        analysisDate: new Date().toLocaleDateString(),
      };

      setResumes([newResume, ...resumes]);
      setSelectedResume(newResume);
      setUploadedFile(null);

      // Reset file input
      const fileInput = document.getElementById('resumeInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      alert('✅ Resume analyzed successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter(r => r.id !== id));
    if (selectedResume?.id === id) {
      setSelectedResume(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-yellow-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Upload & Analyze Resume</h3>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-yellow-300 rounded-lg p-6 text-center cursor-pointer hover:bg-yellow-50">
            <input
              type="file"
              id="resumeInput"
              accept=".pdf,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label htmlFor="resumeInput" className="cursor-pointer block">
              <div className="text-4xl mb-2">📤</div>
              <p className="text-gray-700 font-medium">
                {uploadedFile ? uploadedFile.name : 'Click to upload or drag & drop'}
              </p>
              <p className="text-sm text-gray-500">PDF or TXT (max 5MB)</p>
            </label>
          </div>

          <button
            onClick={handleUploadAndAnalyze}
            disabled={!uploadedFile || isUploading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition"
          >
            {isUploading ? '⏳ Analyzing...' : '🚀 Analyze Resume'}
          </button>
        </div>
      </div>

      {/* Resumes List */}
      {resumes.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Your Resumes</h3>

          <div className="space-y-2">
            {resumes.map(resume => (
              <div
                key={resume.id}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedResume?.id === resume.id
                    ? 'border-yellow-400 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-200'
                }`}
                onClick={() => setSelectedResume(resume)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{resume.fileName}</p>
                    <p className="text-sm text-gray-600">
                      Uploaded: {resume.uploadDate}
                      {resume.analysis && ` | Score: ${resume.analysis.score}/100`}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteResume(resume.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Display */}
      {selectedResume?.analysis && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg p-6 shadow-md text-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Overall Score</p>
                <p className="text-4xl font-bold">{selectedResume.analysis.score}/100</p>
              </div>
              <div className="text-5xl">⭐</div>
            </div>
            <p className="mt-4 text-sm">{selectedResume.analysis.summary}</p>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(selectedResume.analysis.categories).map(([key, category]) => (
              <div key={key} className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{category.title}</h4>
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-bold px-3 py-1 rounded-full">
                    {category.score}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{category.feedback}</p>
              </div>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">✅ Strengths</h4>
              <ul className="space-y-2">
                {selectedResume.analysis.strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">🎯 Improvements</h4>
              <ul className="space-y-2">
                {selectedResume.analysis.improvements.map((improvement, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-yellow-600 mr-2">→</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">🏷️ Keywords Found</h4>
              <div className="flex flex-wrap gap-2">
                {selectedResume.analysis.keywords.present.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">❌ Keywords Missing</h4>
              <div className="flex flex-wrap gap-2">
                {selectedResume.analysis.keywords.missing.slice(0, 5).map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-lg p-4 shadow-md border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">📋 Action Items</h4>
            <ol className="space-y-2">
              {selectedResume.analysis.actionItems.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <span className="font-bold text-yellow-600 mr-3">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
