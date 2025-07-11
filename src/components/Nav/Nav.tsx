import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { LuUsers } from 'react-icons/lu';
import { TbMessages } from 'react-icons/tb';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useAuth } from '../../Context/AuthProvider';

const navItems = [
  { label: 'Dashboard', icon: <MdOutlineSpaceDashboard />, to: '/' },
  { label: 'Clients', icon: <LuUsers />, to: '/clients' },
  { label: 'Interactions', icon: <TbMessages />, to: '/interactions' },
];

const Nav = () => {
  const { logOut } = useAuth(); 

  return (
    <nav className="bg-[#0f1e33] w-64 h-screen fixed top-0 left-0 text-white">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold">CRM</h1>
      </div>

      <ul className="mt-6 space-y-1 px-2 text-sm">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-all 
                ${isActive ? 'bg-white/10 text-white font-semibold' : 'text-white/70 hover:bg-white/10'}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          </li>
        ))}

        {/* Botão de logout */}
        <li>
          <button
            onClick={logOut}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-white/70 hover:bg-white/10 transition-all w-full text-left cursor-pointer"
          >
            <span className="text-xl">
              <RiLogoutBoxRLine />
            </span>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
