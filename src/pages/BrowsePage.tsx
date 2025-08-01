import React, { useState, useEffect, useCallback } from 'react';
import { Product, ListingType } from '../types';
import { apiService } from '../services/apiService';
import ProductCard from '../components/ProductCard';
import { SearchIcon } from '../components/icons/SearchIcon';
import SkeletonProductCard from '../components/SkeletonProductCard';

const BrowsePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<ListingType | 'All'>('All');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters = { type: filterType };
      const productsData = await apiService.fetchProducts(searchTerm, filters);
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterType]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filterType, fetchProducts]);

  return (
    <div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-4">Browse Items</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <label htmlFor="search-items" className="sr-only">Search for items</label>
            <input
              id="search-items"
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
            <SearchIcon className="w-5 h-5 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div>
            <label htmlFor="filter-type" className="sr-only">Filter by type</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as ListingType | 'All')}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="All">All Types</option>
              <option value={ListingType.BARTER}>{ListingType.BARTER}</option>
              <option value={ListingType.RENT}>{ListingType.RENT}</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;