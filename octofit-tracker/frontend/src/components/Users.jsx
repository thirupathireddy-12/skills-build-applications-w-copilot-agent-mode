import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          setCount(data.length);
        } else {
          setUsers(data.users ?? []);
          setCount(data.count ?? (Array.isArray(data) ? data.length : 0));
        }
      })
      .catch((fetchError) => setError(fetchError.message || String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <p>API host: <strong>{apiUrl}</strong></p>
      {loading && <div>Loading users...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} user{count === 1 ? '' : 's'} found.</p>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user._id ?? user.id} className="list-group-item">
                <strong>{user.name}</strong> {user.email && `(${user.email})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Users;
