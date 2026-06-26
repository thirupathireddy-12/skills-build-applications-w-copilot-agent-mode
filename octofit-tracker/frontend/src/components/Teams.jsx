import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
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
          setTeams(data);
          setCount(data.length);
        } else {
          setTeams(data.teams ?? []);
          setCount(data.count ?? (Array.isArray(data) ? data.length : 0));
        }
      })
      .catch((fetchError) => setError(fetchError.message || String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Teams</h1>
      <p>API host: <strong>{apiUrl}</strong></p>
      {loading && <div>Loading teams...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} team{count === 1 ? '' : 's'} loaded.</p>
          <ul className="list-group">
            {teams.map((team) => (
              <li key={team._id ?? team.id} className="list-group-item">
                <strong>{team.name}</strong> {team.description && `- ${team.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Teams;
