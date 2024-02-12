import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordInput.css';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/calculator');
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password.trim() === '') {
      alert('Lütfen şifreyi girin.'); 
    } else if (password === '9901') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/calculator'); 
    } else {
      alert('Yanlış şifre.');
    }
  };

  return (
    <div className="password-input-container">
      <div className="password-input-wrapper">
        <h1 className="big-title">Yargı Giderleri Hesaplayıcı</h1>
        <h2 className="password-input-title">Şifrenizi Giriniz</h2>
        <form className="password-input-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="password-input-field"
            placeholder="Şifre"
            value={password}
            onChange={handleInputChange}
          />
          <button type="submit" className="password-input-button">Giriş</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordInput;
