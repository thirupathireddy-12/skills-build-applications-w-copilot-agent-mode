import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
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
          setActivities(data);
          setCount(data.length);
        } else {
          setActivities(data.activities ?? []);
          setCount(data.count ?? (Array.isArray(data) ? data.length : 0));
        }
      })
      .catch((fetchError) => setError(fetchError.message || String(fetchError)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      <p>API host: <strong>{apiUrl}</strong></p>
      {loading && <div>Loading activities...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} activit{count === 1 ? 'y' : 'ies'} loaded.</p>
          <ul className="list-group">
            {activities.map((activity) => (
              <li key={activity._id ?? activity.id} className="list-group-item">
                <strong>{activity.type}</strong> - {activity.durationMinutes} min - {activity.caloriesBurned} calories
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Activities;
