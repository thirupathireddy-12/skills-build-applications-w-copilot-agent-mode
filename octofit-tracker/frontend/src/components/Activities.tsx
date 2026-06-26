import { useFetchApi } from './ApiPage';

function Activities() {
  const { apiHost, data, error, loading } = useFetchApi<{ activities?: any[]; count?: number }>('activities');
  const activities = data?.activities ?? (Array.isArray(data) ? data : []);
  const count = data?.count ?? (Array.isArray(data) ? data.length : 0);

  return (
    <div className="container mt-5">
      <h1>Activities</h1>
      <p>API host: <strong>{apiHost}</strong></p>
      {loading && <div>Loading activities...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} activit{count === 1 ? 'y' : 'ies'} loaded.</p>
          <ul className="list-group">
            {activities.map((activity: any) => (
              <li key={activity._id ?? activity.id} className="list-group-item">
                <strong>{activity.type}</strong> for {activity.durationMinutes} minutes ({activity.caloriesBurned} calories)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Activities;
