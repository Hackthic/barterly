import React from 'react';
import { Link } from 'react-router-dom';
import { Product, ListingType } from '../types';
import { LocationIcon } from './icons/LocationIcon';
import { CalendarIcon } from './icons/CalendarIcon';

interface ProductCardProps {
  product: Product;
}

const getTypePillClass = (type: ListingType) => {
  switch (type) {
    case ListingType.RENT:
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case ListingType.BARTER:
      return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    case ListingType.BOTH:
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <img className="w-full h-48 object-cover" src={product.image} alt={product.title} />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 truncate pr-2">
                <Link to={`/product/${product.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{product.title}</Link>
            </h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${getTypePillClass(product.type)}`}>
                {product.type}
            </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow">{product.description.substring(0, 80)}...</p>
        <div className="text-sm text-slate-500 dark:text-slate-400 space-y-2 mt-auto">
            <div className="flex items-center">
                <LocationIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                <span>{product.location}</span>
            </div>
            <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
                <span>Posted on {new Date(product.postedDate).toLocaleDateString()}</span>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center">
                <img src={product.owner.avatar} alt={product.owner.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{product.owner.name}</span>
            </div>
            <Link to={`/product/${product.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                View Details &rarr;
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;