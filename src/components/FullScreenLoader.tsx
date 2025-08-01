import React from 'react';

const FullScreenLoader: React.FC = () => (
  <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center z-[100]" role="status" aria-live="polite">
    <div className="w-16 h-16 border-4 border-indigo-500 border-solid rounded-full border-t-transparent animate-spin"></div>
    <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">Loading...</p>
  </div>
);

export default FullScreenLoader;