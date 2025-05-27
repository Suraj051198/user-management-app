import axios from 'axios';
import { useEffect, useState } from 'react';
import './From.css';

export default function From() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setAllUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password,
      });
      alert('Data submitted successfully');
      setName('');
      setEmail('');
      setPassword('');
      await fetchUsers();
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  const handleReject = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2>User Registration and Management</h2>
      </div>
      <div>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div className="form-group">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="form-group">
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button type="button" className="form-button" onClick={handleReject}>Reset</button>
    <button type="submit" className="form-button">Submit</button>
  </form>
</div>

      <h3>Show All Data</h3>
      <table border={1} cellPadding={10} cellSpacing={5}>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length === 0 ? (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          ) : (
            allUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {editingUserId === user._id ? (
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input value={editPassword} onChange={(e) => setEditPassword(e.target.value)} />
                  ) : (
                    user.password
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button
                        onClick={async () => {
                          try {
                            await axios.put(`http://localhost:5000/api/users/${user._id}`, {
                              name: editName,
                              email: editEmail,
                              password: editPassword,
                            });
                            alert('User updated successfully');
                            setEditingUserId(null);
                            fetchUsers();
                          } catch (error) {
                            console.error('Error updating user:', error);
                            alert('Error updating user');
                          }
                        }}
                      >
                        Save
                      </button>
                      <button onClick={() => setEditingUserId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingUserId(user._id);
                          setEditName(user.name);
                          setEditEmail(user.email);
                          setEditPassword(user.password);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await axios.delete(`http://localhost:5000/api/users/${user._id}`);
                            alert('User deleted successfully');
                            fetchUsers();
                          } catch (error) {
                            console.error('Error deleting user:', error);
                            alert('Error deleting user');
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
