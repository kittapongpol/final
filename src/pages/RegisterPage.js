import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (username && password && email) {
      // ดึงข้อมูลผู้ใช้จาก localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // ตรวจสอบว่าผู้ใช้มีอีเมลนี้หรือยัง
      const existingUser = users.find(user => user.email === email);

      if (existingUser) {
        setError('อีเมลนี้ถูกใช้แล้ว');
      } else {
        // ถ้าไม่มีผู้ใช้งานกับอีเมลนี้, เพิ่มผู้ใช้ใหม่
        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // บันทึกข้อมูลผู้ใช้ใหม่
        navigate('/login');  // นำทางไปหน้า login
      }
    } else {
      setError('กรุณากรอกข้อมูลให้ครบ');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default RegisterPage;

















