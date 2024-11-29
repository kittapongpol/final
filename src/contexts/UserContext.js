// import React, { createContext, useContext, useState } from 'react';

// // สร้าง context สำหรับผู้ใช้
// const UserContext = createContext();

// export const useUser = () => {
//   return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (username) => {
//     setUser({ name: username });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from 'react';

// สร้าง context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // เมื่อหน้าโหลด, ให้ดึงข้อมูลจาก localStorage (ถ้ามี)
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ฟังก์ชัน login เพื่อเก็บข้อมูลผู้ใช้ใน localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // เก็บข้อมูลผู้ใช้ใน localStorage
  };

  // ฟังก์ชัน logout เพื่อเคลียร์ข้อมูลผู้ใช้ใน localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');  // ลบข้อมูลผู้ใช้จาก localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};













