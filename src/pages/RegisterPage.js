// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate

// function RegisterPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // ใช้ navigate เพื่อทำการเปลี่ยนหน้า

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // การลงทะเบียนเสร็จสมบูรณ์
//     console.log('User registered with:', { email, password });

//     // หลังจากลงทะเบียนเสร็จ ให้กลับไปที่หน้า Login
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default RegisterPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext'; // ปรับให้ใช้ UserContext

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = React.useContext(UserContext);
  const navigate = useNavigate(); // ใช้ navigate เพื่อทำการนำทาง

  const handleRegister = (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลการลงทะเบียน
    if (username && password && email) {
      // สมมติว่าเราลงทะเบียนสำเร็จแล้ว
      const userData = { name: username, email, password };

      // ทำการ login หลังจากการลงทะเบียน
      login(userData);

      // นำทางไปที่หน้า login หลังจากลงทะเบียนเสร็จ
      navigate('/login');
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















