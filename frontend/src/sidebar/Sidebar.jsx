import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import admin from "../assets/admin.png";

import { AiOutlineDashboard } from "react-icons/ai";
import { FaBuilding, FaTasks, FaUsers, FaUserTie, FaRegCommentDots, FaCalendarAlt, FaBell } from "react-icons/fa";
import { BiMessageAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

export default function SideBars() {
  const sideId = useParams();
  const [select, setSelect] = useState(sideId);

  const navItems = [
    { id: 1, label: "Dashboard", icon: <AiOutlineDashboard />, path: "/" },
    { id: 2, label: "My Property", icon: <FaBuilding />, path: "/" },
    { id: 3, label: "To do", icon: <FaTasks />, path: "/" },
    { id: 4, label: "Tenants", icon: <FaUsers />, path: "/" },
    { id: 5, label: "Agents", icon: <FaUserTie />, path: "/" },
    { id: 6, label: "Reviews", icon: <FaRegCommentDots />, path: "/" },
    { id: 7, label: "Messages", icon: <BiMessageAlt />, path: "/" },
    { id: 8, label: "Calendar", icon: <FaCalendarAlt />, path: "/" },
    { id: 9, label: "Updates", icon: <FaBell />, path: "/" },
  ];

  return (
    <div className="fixed top-0 left-0 w-60 h-full bg-green-100 flex flex-col justify-between items-center border-r px-4 py-2 z-50 max-md:w-40">
      {/* Logo */}
      <div className="w-full mb-4">
        <h2 className="text-xl font-bold text-green-900 px-2">🏠 HomFinder</h2>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => setSelect(item.id)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-medium ${
                select === item.id || isActive
                  ? "bg-green-200 text-green-900"
                  : "text-gray-500 hover:bg-green-200 hover:text-green-900"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Profile + Logout */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <img src={admin} alt="Admin" className="h-20 w-40 object-cover rounded-md shadow-md" />
        <div className="text-center">
          <h3 className="text-sm font-semibold">Isra Sheeba</h3>
          <p className="text-xs text-gray-600">isratech8@outlook.com</p>
        </div>
        <button className=" flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 text-sm">
          <FiLogOut />
          Log Out
        </button>
      </div>
    </div>
  );
}
