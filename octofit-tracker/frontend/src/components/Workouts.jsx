import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
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
          setWorkouts(data);
          setCount(data.length);
        } else {
          setWorkouts(data.workouts ?? []);
          setCount(data.count ?? (Array.isArray(data) ? data.length : 0));
        }
      })
      .catch((fetchError) => setError(fetchError.message || String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Workouts</h1>
      <p>API host: <strong>{apiUrl}</strong></p>
      {loading && <div>Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} workout{count === 1 ? '' : 's'} loaded.</p>
          <ul className="list-group">
            {workouts.map((workout) => (
              <li key={workout._id ?? workout.id} className="list-group-item">
                <strong>{workout.title}</strong> - {workout.intensity} - {workout.durationMinutes} min
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Workouts;
