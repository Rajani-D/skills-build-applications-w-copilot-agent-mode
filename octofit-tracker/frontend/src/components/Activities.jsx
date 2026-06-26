import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/activities/`;
  }
  return '/api/activities/';
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiBaseUrl());
        if (!response.ok) throw new Error('Failed to load activities');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setActivities(data);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <p className="text-muted">Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="row g-3">
        {activities.map((activity) => (
          <div key={activity._id || activity.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{activity.type}</h3>
                <p className="mb-1"><strong>Duration:</strong> {activity.duration} min</p>
                <p className="mb-1"><strong>Distance:</strong> {activity.distance} km</p>
                <p className="mb-0"><strong>Calories:</strong> {activity.calories}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
