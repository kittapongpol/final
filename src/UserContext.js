import React, { createContext, useState } from 'react';

// สร้าง context ใหม่
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // ตั้งค่าผู้ใช้เป็น null เริ่มต้น

  const login = (userInfo) => {
    setUser(userInfo); // เมื่อ login จะตั้งค่าผู้ใช้
  };

  const logout = () => {
    setUser(null); // ล้างข้อมูลผู้ใช้เมื่อ logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
  
};










