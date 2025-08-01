import React from 'react';
import { BarterIcon } from '../components/icons/BarterIcon';
import { RentIcon } from '../components/icons/RentIcon';
import { SecureChatIcon } from '../components/icons/SecureChatIcon';


const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-10">Our Services</h1>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="text-center p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 mx-auto mb-4">
            <BarterIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Item Bartering</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Trade your items directly with other users. Our platform facilitates the discovery of mutually beneficial exchanges, helping your pre-loved items find new homes where they'll be valued.
          </p>
        </div>
        <div className="text-center p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 mx-auto mb-4">
            <RentIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Item Rentals</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Need something for a short time? Rent items from other users. It's a cost-effective and sustainable way to access tools, equipment, and more without the commitment of buying.
          </p>
        </div>
        <div className="text-center p-6 border border-slate-200 dark:border-slate-700 rounded-lg">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 mx-auto mb-4">
            <SecureChatIcon className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Secure Chat System</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Communicate with other users confidently using our integrated real-time chat. Discuss details, ask questions, and arrange exchanges securely within the platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;