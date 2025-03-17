import React, { useState, useEffect } from 'react';

const UpdateUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');

  // Fetch users from the server
  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle user selection from the dropdown
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setName(user.name);
  };

  // Handle form submission (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Only proceed if a user is selected
    if (!selectedUser) {
      alert('Please select a user to update.');
      return;
    }

    const updatedUser = { id: selectedUser.id, name };

    try {
      const response = await fetch('http://localhost:3000/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        alert('User updated successfully!');
        setName(''); // Clear the form
        setSelectedUser(null); // Clear the selected user
      } else {
        alert('Error updating user!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating user!');
    }
  };

  return (
    <div className="update-user">
      <h2>Update User</h2>

      {/* Dropdown to select a user */}
      <div>
        <select onChange={(e) => handleUserSelect(users.find(user => user.id === parseInt(e.target.value)))}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      {/* Only show form if a user is selected */}
      {selectedUser && (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update User</button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;

