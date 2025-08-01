import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, Testimonial } from '../types';
import { apiService } from '../services/apiService';
import ProductCard from '../components/ProductCard';
import { QuoteIcon } from '../components/icons/QuoteIcon';
import SkeletonProductCard from '../components/SkeletonProductCard';

const HeroSection: React.FC = () => (
  <div className="bg-indigo-600 text-white rounded-lg shadow-xl p-8 md:p-16 text-center mb-12">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Trade, Rent, Discover</h1>
    <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
      Join a community where your unused items find new life. Barter for something you need or rent out your valuables for extra income.
    </p>
    <div className="flex justify-center space-x-4">
      <Link to="/browse" className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-100 transition-transform transform hover:scale-105">
        Start Browsing
      </Link>
      <Link to="/register" className="bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-400 transition-transform transform hover:scale-105">
        Join Now
      </Link>
    </div>
  </div>
);

const HowItWorksSection: React.FC = () => (
  <div className="py-12 bg-white dark:bg-slate-800 rounded-lg shadow-md">
    <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2">A simple, three-step process to get started.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 mx-auto mb-4 text-2xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-2">List Your Item</h3>
            <p className="text-slate-500 dark:text-slate-400">Take a photo, write a description, and decide if you want to barter, rent, or both.</p>
        </div>
        <div className="p-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 mx-auto mb-4 text-2xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-2">Connect & Chat</h3>
            <p className="text-slate-500 dark:text-slate-400">Browse what others have to offer and connect with users through our secure chat system.</p>
        </div>
        <div className="p-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 mx-auto mb-4 text-2xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-2">Exchange</h3>
            <p className="text-slate-500 dark:text-slate-400">Arrange to meet up and exchange your items. Enjoy your new find!</p>
        </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, testimonialsData] = await Promise.all([
          apiService.fetchLatestProducts(3),
          apiService.fetchTestimonials(),
        ]);
        setLatestProducts(productsData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-16">
      <HeroSection />

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Latest Listings</h2>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <HowItWorksSection />

      <section className="bg-slate-100 dark:bg-slate-800 py-12 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white dark:bg-slate-700/50 p-6 rounded-lg shadow-md">
              <QuoteIcon className="w-8 h-8 text-indigo-200 dark:text-indigo-600/50 mb-4" />
              <p className="text-slate-600 dark:text-slate-300 mb-6 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src={testimonial.avatar} alt={testimonial.author} />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{testimonial.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;