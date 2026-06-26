import { useFetchApi } from './ApiPage';

function Workouts() {
  const { apiHost, data, error, loading } = useFetchApi<{ workouts?: any[]; count?: number }>('workouts');
  const workouts = data?.workouts ?? (Array.isArray(data) ? data : []);
  const count = data?.count ?? (Array.isArray(data) ? data.length : 0);

  return (
    <div className="container mt-5">
      <h1>Workouts</h1>
      <p>API host: <strong>{apiHost}</strong></p>
      {loading && <div>Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <div>
          <p>{count} workout{count === 1 ? '' : 's'} loaded.</p>
          <ul className="list-group">
            {workouts.map((workout: any) => (
              <li key={workout._id ?? workout.id} className="list-group-item">
                <strong>{workout.title}</strong> ({workout.intensity}) - {workout.durationMinutes} min
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Workouts;
