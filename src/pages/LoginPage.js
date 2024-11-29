import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // นำเข้าไฟล์ CSS ที่แยกไว้

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // ใช้สลับระหว่าง Login และ Register
  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้จาก localStorage
  const getUsers = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    return users ? users : [];
  };

  // ฟังก์ชันการลงทะเบียน
  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      const users = getUsers();

      // ตรวจสอบว่าผู้ใช้นี้มีอยู่แล้วหรือไม่
      if (users.some((user) => user.email === username)) {
        setError('User already exists!');
      } else {
        const newUser = { email: username, password };
        users.push(newUser);

        // บันทึกข้อมูลใหม่ลงใน localStorage
        localStorage.setItem('users', JSON.stringify(users));
        setError('');
        alert('Registration successful! Please login.');
        setIsRegistering(false); // สลับไปหน้า Login
      }
    } else {
      setError('Please fill in both fields.');
    }
  };

  // ฟังก์ชันการล็อกอิน
  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();

    // ตรวจสอบข้อมูลผู้ใช้ใน localStorage
    const user = users.find(
      (user) => user.email === username && user.password === password
    );

    if (user) {
      // หากข้อมูลถูกต้อง ให้เข้าสู่ระบบและไปที่หน้า Home
      setError('');
      localStorage.setItem('currentUser', JSON.stringify(user)); // เก็บข้อมูลผู้ใช้ที่กำลังล็อกอิน
      navigate('/home');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label>Username (Email)</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <button
        className="switch-button"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering
          ? 'Already have an account? Login'
          : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default LoginPage;
