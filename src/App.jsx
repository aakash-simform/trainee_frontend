import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListUsers from './pages/ListUsers';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>Self hosted agent demo</h1>
        </header>
        <nav className="navbar">
          <div className="nav-item">
            <Link to="/list" className="nav-link">List Users</Link>
          </div>
          <div className="nav-item">
            <Link to="/add" className="nav-link">Add User</Link>
          </div>
          <div className="nav-item">
            <Link to="/update" className="nav-link">Update User</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/list" element={<ListUsers />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/update" element={<UpdateUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

