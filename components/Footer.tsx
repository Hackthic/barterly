import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-white">Barterly</h2>
            <p className="text-slate-400">Exchange goods and services with a vibrant community. Your next great find is just a barter away.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-slate-400 hover:text-indigo-400 transition-colors">Browse Items</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-indigo-400 transition-colors">My Dashboard</Link></li>
              <li><Link to="/register" className="text-slate-400 hover:text-indigo-400 transition-colors">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-200">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-400 hover:text-indigo-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-indigo-400 transition-colors">Services</Link></li>
              <li><Link to="/support" className="text-slate-400 hover:text-indigo-400 transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-200">Connect</h3>
            <p className="text-slate-400">Stay up to date with the latest news and offers.</p>
            {/* Social media icons can go here */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Barterly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;