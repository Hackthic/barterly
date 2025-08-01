
import React from 'react';

const SkeletonChatListItem: React.FC = () => {
  return (
    <div className="flex items-center p-4 space-x-4 animate-pulse">
        <div className="w-12 h-12 rounded-md bg-slate-200 dark:bg-slate-700"></div>
        <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
    </div>
  );
};

export default SkeletonChatListItem;
