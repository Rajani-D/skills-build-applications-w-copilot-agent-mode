import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/teams/`;
  }
  return '/api/teams/';
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(getApiBaseUrl());
        if (!response.ok) throw new Error('Failed to load teams');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setTeams(data);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <p className="text-muted">Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id || team.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{team.name}</h3>
                <p className="mb-1"><strong>Goal:</strong> {team.goal}</p>
                <p className="mb-0"><strong>Members:</strong> {(team.members || []).length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
