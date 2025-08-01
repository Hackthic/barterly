import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, ListingType } from '../types';
import { apiService } from '../services/apiService';
import { LocationIcon } from '../components/icons/LocationIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { ChatIcon } from '../components/icons/ChatIcon';
import NotFoundPage from './NotFoundPage';

const getTypePillClass = (type: ListingType) => {
  switch (type) {
    case ListingType.RENT: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case ListingType.BARTER: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    case ListingType.BOTH: return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (id) {
        try {
          const productData = await apiService.fetchProductById(id);
          if (productData) {
            setProduct(productData);
          } else {
            setProduct(null);
          }
        } catch (error) {
          console.error("Failed to fetch product:", error);
          setProduct(null);
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="p-4">
          <img src={product.image} alt={product.title} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="p-8 flex flex-col">
          <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${getTypePillClass(product.type)}`}>
            For {product.type}
          </span>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 my-4">{product.title}</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">{product.description}</p>
          
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-6">
             <div className="flex items-center">
                <LocationIcon className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                <span>{product.location}</span>
            </div>
            <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-3 text-slate-400 dark:text-slate-500" />
                <span>Posted on {new Date(product.postedDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
             <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">LISTED BY</h3>
             <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={product.owner.avatar} alt={product.owner.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100">{product.owner.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Joined {new Date(product.owner.joinedDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <Link to={`/chat?with=${product.owner.id}&product=${product.id}`} className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">
                    <ChatIcon className="w-5 h-5 mr-2" />
                    Start Chat
                </Link>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;