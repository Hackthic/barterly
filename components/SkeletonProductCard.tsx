import React from 'react';

const SkeletonProductCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-slate-200 animate-pulse"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <div className="h-6 w-3/4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-5 w-1/5 bg-slate-200 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2 flex-grow mb-4">
            <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="text-sm text-slate-500 space-y-2 mt-auto">
            <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse"></div>
            </div>
             <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse"></div>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-2 bg-slate-200 animate-pulse"></div>
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
