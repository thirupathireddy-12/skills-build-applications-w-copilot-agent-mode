import { useFetchApi } from './ApiPage';

function Teams() {
  const { apiHost, data, error, loading } = useFetchApi<{ teams?: any[]; count?: number }>('teams');
  const teams = data?.teams ?? (Array.isArray(data) ? data : []);
  const count = data?.count ?? (Array.isArray(data) ? data.length : 0);

  return (
    <div className="container mt-5">
      <h1>Teams</h1>
      <p>API host: <strong>{apiHost}</strong></p>
      {loading && <div>Loading teams...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} team{count === 1 ? '' : 's'} loaded.</p>
          <ul className="list-group">
            {teams.map((team: any) => (
              <li key={team._id ?? team.id} className="list-group-item">
                <strong>{team.name}</strong>: {team.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Teams;
