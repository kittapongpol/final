// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isRegistering, setIsRegistering] = useState(false);  // ใช้เพื่อสลับระหว่าง Login และ Register
//   const navigate = useNavigate();

//   // ฟังก์ชันการลงทะเบียน
//   const handleRegister = (e) => {
//     e.preventDefault();
    
//     // ตรวจสอบว่าอีเมลและรหัสผ่านไม่ว่างเปล่า
//     if (username && password) {
//       const newUser = { email: username, password };
      
//       // บันทึกข้อมูลลงใน localStorage
//       localStorage.setItem('user', JSON.stringify(newUser));
//       setError('');
//       alert('Registration successful! Please login.');
//       setIsRegistering(false); // สลับไปหน้า Login
//     } else {
//       setError('Please fill in both fields.');
//     }
//   };

//   // ฟังก์ชันการล็อกอิน
//   const handleLogin = (e) => {
//     e.preventDefault();

//     // ดึงข้อมูลผู้ใช้ที่เก็บใน localStorage
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//     // ตรวจสอบว่ามีผู้ใช้ใน localStorage หรือไม่
//     if (storedUser) {
//       // ตรวจสอบ username และ password กับข้อมูลใน localStorage
//       if (storedUser.email === username && storedUser.password === password) {
//         // ถ้าข้อมูลถูกต้อง, ไปที่หน้า homepage
//         navigate('/home');
//       } else {
//         setError('Invalid credentials');  // ถ้าข้อมูลผิด, แสดงข้อความผิด
//       }
//     } else {
//       setError('No user registered');  // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage
//     }
//   };

//   return (
//     <div>
//       <h2>{isRegistering ? 'Register' : 'Login'}</h2>
//       <form onSubmit={isRegistering ? handleRegister : handleLogin}>
//         <div>
//           <label>Username (Email)</label>
//           <input
//             type="email"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
//       </form>
//       {error && <p>{error}</p>}

//       {/* ปุ่มสำหรับสลับไปหน้า Register หรือ Login */}
//       <button onClick={() => setIsRegistering(!isRegistering)}>
//         {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
//       </button>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);  // ใช้เพื่อสลับระหว่าง Login และ Register
  const navigate = useNavigate();

  // ฟังก์ชันการลงทะเบียน
  const handleRegister = (e) => {
    e.preventDefault();
    
    // ตรวจสอบว่าอีเมลและรหัสผ่านไม่ว่างเปล่า
    if (username && password) {
      const newUser = { email: username, password };
      
      // บันทึกข้อมูลลงใน localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      setError('');
      alert('Registration successful! Please login.');
      setIsRegistering(false); // สลับไปหน้า Login
    } else {
      setError('Please fill in both fields.');
    }
  };

  // ฟังก์ชันการล็อกอิน
  const handleLogin = (e) => {
    e.preventDefault();

    // ดึงข้อมูลผู้ใช้ที่เก็บใน localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // ตรวจสอบว่ามีผู้ใช้ใน localStorage หรือไม่
    if (storedUser) {
      // ตรวจสอบ username และ password กับข้อมูลใน localStorage
      if (storedUser.email === username && storedUser.password === password) {
        // ถ้าข้อมูลถูกต้อง, ไปที่หน้า homepage
        navigate('/home');
      } else {
        setError('Invalid credentials');  // ถ้าข้อมูลผิด, แสดงข้อความผิด
      }
    } else {
      setError('No user registered');  // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage
    }
  };

  return (
    <div>
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
      {error && <p>{error}</p>}

      {/* ปุ่มสำหรับสลับไปหน้า Register หรือ Login */}
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </button>
    </div>
  );
}

export default LoginPage;





























