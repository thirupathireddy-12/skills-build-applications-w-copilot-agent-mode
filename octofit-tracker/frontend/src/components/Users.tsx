import { useFetchApi } from './ApiPage';

function Users() {
  const { apiHost, data, error, loading } = useFetchApi<{ users?: any[]; count?: number }>('users');
  const users = data?.users ?? (Array.isArray(data) ? data : []);
  const count = data?.count ?? (Array.isArray(data) ? data.length : 0);

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <p>API host: <strong>{apiHost}</strong></p>
      {loading && <div>Loading users...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} user{count === 1 ? '' : 's'} found.</p>
          <ul className="list-group">
            {users.map((user: any) => (
              <li key={user._id ?? user.id} className="list-group-item">
                <strong>{user.name}</strong> ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Users;
