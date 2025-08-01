import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoutIcon } from './icons/LogoutIcon';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
    }`;

  return (
    <header className="bg-white dark:bg-slate-800/50 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Barterly
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
              <NavLink to="/browse" className={navLinkClass}>Browse</NavLink>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
                {isAuthenticated && user ? (
                  <>
                    <NavLink to="/dashboard" className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                      Dashboard
                    </NavLink>
                    <button
                      onClick={logout}
                      className="flex items-center bg-slate-100 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      aria-label="Logout"
                    >
                      <LogoutIcon className="w-4 h-4 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      Login
                    </Link>
                    <Link to="/register" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                      Sign Up
                    </Link>
                  </div>
                )}
                <ThemeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/browse" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Browse</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>About</NavLink>
            {isAuthenticated && user ? (
              <div className="border-t border-slate-200 dark:border-slate-700 mt-3 pt-3">
                  <NavLink to="/dashboard" className="flex items-center px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                    Dashboard
                  </NavLink>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-left flex items-center mt-1 px-3 py-2 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-md">
                    <LogoutIcon className="w-5 h-5 mr-3" />
                    Logout
                  </button>
              </div>
            ) : (
              <div className="border-t border-slate-200 dark:border-slate-700 mt-3 pt-3 space-y-2">
                <Link to="/login" className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;