import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">Support Center</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">How do I list an item?</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Once you are logged in, navigate to your Dashboard and click the "New Listing" button. Fill out the form with your item's details, and you're good to go!</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Is it safe to meet users?</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">We recommend always meeting in a public place for exchanges. Use our chat system to agree on a location and time that is safe and convenient for both parties.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">How does renting work?</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">You can agree upon rental terms, duration, and any deposit requirements directly with the item owner through our chat. Please note, Barterly does not handle payments at this MVP stage.</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Thank you for your message! (This is a demo)'); }}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Name</label>
            <input type="text" id="name" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Email</label>
            <input type="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-white" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
            <textarea id="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-white"></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;