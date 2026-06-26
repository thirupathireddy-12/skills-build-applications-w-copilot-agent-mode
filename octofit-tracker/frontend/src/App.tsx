import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <h1>OctoFit Tracker</h1>
      <p>Welcome to the OctoFit Tracker frontend.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
