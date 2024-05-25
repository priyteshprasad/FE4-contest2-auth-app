import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://dummyjson.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
      <h2 className="profile-header">User Profile</h2>
      <img
        className="image"
        src={user.image}
        alt="image"
        style={{ width: "50px" }}
      />
      <div className="profile-info">
        <div className="profile-field">
          <span className="field-label">ID:</span>
          <span className="field-value">{user.id}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Username:</span>
          <span className="field-value">{user.username}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Email:</span>
          <span className="field-value">{user.email}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">First Name:</span>
          <span className="field-value">{user.firstName}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Last Name:</span>
          <span className="field-value">{user.lastName}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Gender:</span>
          <span className="field-value">{user.gender}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Phone:</span>
          <span className="field-value">{user.phone}</span>
        </div>
        {/* Add more fields as necessary */}
      </div>
    </div>
  );
};

export default Profile;
