import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`;
  }
  return '/api/leaderboard/';
};

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getApiBaseUrl());
        if (!response.ok) throw new Error('Failed to load leaderboard');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setEntries(data);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  if (loading) return <p className="text-muted">Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h3 className="h6 mb-1">{entry.name}</h3>
              <p className="mb-0 text-muted">Score: {entry.score}</p>
            </div>
            <span className="badge bg-primary">#{entry.rank || 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
