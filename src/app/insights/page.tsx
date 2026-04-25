'use client';

import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';

function InsightsContent() {
  const searchParams = useSearchParams();
  const company = searchParams.get('company') || '';
  const position = searchParams.get('position') || '';
  const notes = searchParams.get('notes') || '';

  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [coachQuestion, setCoachQuestion] = useState('');
  const [coaching, setCoaching] = useState<string | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);

  const getInsight = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, position, notes }),
      });
      const data = await res.json();
      setInsight(data.insight);
    } catch (error) {
      console.error('Error:', error);
      setInsight('Failed to generate insights');
    }
    setLoading(false);
  };

  const getCoaching = async () => {
    if (!coachQuestion.trim()) {
      alert('Please enter a question');
      return;
    }
    setCoachLoading(true);
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: coachQuestion }),
      });
      const data = await res.json();
      setCoaching(data.feedback);
    } catch (error) {
      console.error('Error:', error);
      setCoaching('Failed to generate coaching');
    }
    setCoachLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-yellow-50 to-white">
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/" className="px-4 py-2 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 font-semibold">
            ← Back
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{position}</h1>
            <p className="text-gray-600 text-lg">{company}</p>
          </div>
        </div>

        {/* Job Insights */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-yellow-300">
          <h2 className="text-3xl font-bold mb-6 text-yellow-600 flex items-center gap-2">
            <span className="text-4xl">💡</span> Interview Insights
          </h2>
          {!insight ? (
            <button
              onClick={getInsight}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-yellow-300 to-yellow-200 text-gray-900 rounded-lg font-bold hover:from-yellow-400 hover:to-yellow-300 disabled:bg-gray-400 transition shadow-lg"
            >
              {loading ? '⏳ Generating...' : '✨ Get AI Insights'}
            </button>
          ) : (
            <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
              <p className="text-gray-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">{insight}</p>
              <button
                onClick={() => setInsight(null)}
                className="mt-6 px-6 py-2 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 font-semibold transition"
              >
                🔄 Generate New Insights
              </button>
            </div>
          )}
        </div>

        {/* Interview Coach */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-yellow-300">
          <h2 className="text-3xl font-bold mb-6 text-yellow-600 flex items-center gap-2">
            <span className="text-4xl">🎓</span> Interview Coach
          </h2>
          <p className="text-gray-600 mb-6">Practice answering interview questions and get AI coaching</p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="e.g., 'Tell me about a time you solved a difficult technical problem'"
              value={coachQuestion}
              onChange={(e) => setCoachQuestion(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>
          <button
            onClick={getCoaching}
            disabled={coachLoading}
            className="px-8 py-3 bg-gradient-to-r from-yellow-300 to-yellow-200 text-gray-900 rounded-lg font-bold hover:from-yellow-400 hover:to-yellow-300 disabled:bg-gray-400 transition shadow-lg"
          >
            {coachLoading ? '⏳ Coaching...' : '🎓 Get Coaching'}
          </button>

          {coaching && (
            <div className="mt-6 bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
              <p className="text-gray-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">{coaching}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <InsightsContent />
    </Suspense>
  );
}
