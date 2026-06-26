import { useFetchApi } from './ApiPage';

function Leaderboard() {
  const { apiHost, data, error, loading } = useFetchApi<{ leaderboard?: any[]; count?: number }>('leaderboard');
  const leaderboard = data?.leaderboard ?? (Array.isArray(data) ? data : []);
  const count = data?.count ?? (Array.isArray(data) ? data.length : 0);

  return (
    <div className="container mt-5">
      <h1>Leaderboard</h1>
      <p>API host: <strong>{apiHost}</strong></p>
      {loading && <div>Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} leaderboard entr{count === 1 ? 'y' : 'ies'} loaded.</p>
          <ul className="list-group">
            {leaderboard.map((entry: any) => (
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
