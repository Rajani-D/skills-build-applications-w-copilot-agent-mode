import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`;
  }
  return '/api/users/';
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(getApiBaseUrl());
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.results || [];
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p className="text-muted">Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <div className="row g-3">
        {users.map((user) => (
          <div key={user._id || user.id} className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h6">{user.name}</h3>
                <p className="mb-1"><strong>Username:</strong> {user.username}</p>
                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="mb-0"><strong>Role:</strong> {user.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
