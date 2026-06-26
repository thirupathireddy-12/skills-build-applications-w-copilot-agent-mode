import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
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
          setLeaderboard(data);
          setCount(data.length);
        } else {
          setLeaderboard(data.leaderboard ?? []);
          setCount(data.count ?? (Array.isArray(data) ? data.length : 0));
        }
      })
      .catch((fetchError) => setError(fetchError.message || String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Leaderboard</h1>
      <p>API host: <strong>{apiUrl}</strong></p>
      {loading && <div>Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} entr{count === 1 ? 'y' : 'ies'} loaded.</p>
          <ul className="list-group">
            {leaderboard.map((entry) => (
              <li key={entry._id ?? entry.id} className="list-group-item">
                <strong>Rank {entry.rank}</strong>: {entry.user?.name ?? entry.user} - {entry.score} points
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
