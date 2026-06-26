import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
  }
  return '/api/workouts/';
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiBaseUrl());
        if (!response.ok) throw new Error('Failed to load workouts');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setWorkouts(data);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) return <p className="text-muted">Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{workout.title}</h3>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="mb-1"><strong>Duration:</strong> {workout.duration} min</p>
                <p className="mb-0"><strong>Focus:</strong> {workout.focus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
