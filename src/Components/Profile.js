import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    deliveryAddress: '',
  });

  useEffect(() => {
    fetch(`http://localhost:4000/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          deliveryAddress: data.deliveryAddress,
        });
      })
      .catch(error => console.log(error));
  }, [userId]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:4000/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setIsEditing(false);
      })
      .catch(error => console.log(error));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {userData && (
        <div>
          <h2>Profile Page</h2>
          <div>
            <h4>First Name:</h4>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.firstName}</p>
            )}
            {isEditing && (
              <>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={handleCancelClick}>Cancel</button>
              </>
            )}
            {!isEditing && (
              <button onClick={handleEditClick}>
                <img src="edit-icon.png" alt="edit" />
              </button>
            )}
          </div>
          <div>
            <h4>Last Name:</h4>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.lastName}</p>
            )}
            {/* repeat the above pattern for other fields */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
