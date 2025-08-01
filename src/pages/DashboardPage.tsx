
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product, Chat } from '../types';
import { apiService } from '../services/apiService';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import CreateListingModal from '../components/CreateListingModal';
import { PlusIcon } from '../components/icons/PlusIcon';
import { ListIcon } from '../components/icons/ListIcon';
import { ChatIcon } from '../components/icons/ChatIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import SkeletonProductCard from '../components/SkeletonProductCard';
import { useNotification } from '../context/NotificationContext';
import SkeletonChatListItem from '../components/SkeletonChatListItem';

type Tab = 'listings' | 'chats' | 'settings';

const MyListings: React.FC<{ listings: Product[]; loading: boolean }> = ({ listings, loading }) => {
    if (loading) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">My Listings</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonProductCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Listings</h2>
            {listings.length > 0 ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {listings.map(p => <ProductCard key={p.id} product={p}/>)}
                </div>
            ) : (
                <p className="text-slate-500 dark:text-slate-400">You haven't listed any items yet. Click "New Listing" to get started.</p>
            )}
        </div>
    );
}

const MyChats: React.FC<{ chats: Chat[], loading: boolean }> = ({ chats, loading }) => {
    if (loading) {
        return (
            <div>
                 <h2 className="text-2xl font-bold mb-4">My Chats</h2>
                 <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonChatListItem key={index} />
                    ))}
                 </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Chats</h2>
            {chats.length > 0 ? (
                <ul className="space-y-4">
                    {chats.map(chat => (
                        <li key={chat.id}>
                            <Link to={`/chat/${chat.id}`} className="block p-4 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center min-w-0">
                                       <img src={chat.product.image} alt={chat.product.title} className="w-12 h-12 rounded-md object-cover mr-4 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate">{chat.product.title}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 flex-shrink-0">{new Date(chat.lastMessageTimestamp).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500 dark:text-slate-400">You have no active chats.</p>
            )}
        </div>
    );
};

const ProfileSettings: React.FC = () => {
    const { user } = useAuth();
    const { addNotification } = useNotification();
    const [name, setName] = useState(user?.name || '');
    const [location, setLocation] = useState(user?.location || '');
    const [isSaving, setIsSaving] = useState(false);
    
    if (!user) return null;
    
    const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSaving(true);
      
      // Simulate API call
      setTimeout(() => {
          setIsSaving(false);
          addNotification('Profile updated successfully!', 'success');
          // In a real app, you would also update the user object in AuthContext
          // e.g., auth.updateUser({ ...user, name, location });
      }, 1500);
    };
    
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <form className="space-y-4 max-w-lg" onSubmit={handleSave}>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <input id="fullName" type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                    <input id="location" type="text" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-slate-900 dark:text-white" />
                </div>
                <div className="flex items-center space-x-4">
                    <button type="submit" disabled={isSaving} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait">
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};


const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('listings');
  const [isModalOpen, setModalOpen] = useState(false);

  // Lifted state for listings
  const [listings, setListings] = useState<Product[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  // Lifted state for chats
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);

  // Fetch all user-related data when component mounts
  useEffect(() => {
    if (user) {
      setListingsLoading(true);
      apiService.fetchUserListings(user.id)
        .then(setListings)
        .catch(console.error)
        .finally(() => setListingsLoading(false));
      
      setChatsLoading(true);
      apiService.fetchUserChats(user.id)
        .then(setChats)
        .catch(console.error)
        .finally(() => setChatsLoading(false));
    }
  }, [user]);

  // Handle new listing creation by updating state directly
  const handleListingCreated = (newListing: Product) => {
    setListings(prevListings => [newListing, ...prevListings]);
    setActiveTab('listings'); // Switch to listings tab to show the new item
  };

  const TabContent: React.FC = () => {
    switch (activeTab) {
      case 'listings': return <MyListings listings={listings} loading={listingsLoading} />;
      case 'chats': return <MyChats chats={chats} loading={chatsLoading} />;
      case 'settings': return <ProfileSettings />;
      default: return null;
    }
  };

  if (!user) {
    return null; // Or a loader, but ProtectedRoute handles the main loading state
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, {user.name}!</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="flex items-center bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">
            <PlusIcon className="w-5 h-5 mr-2"/>
            New Listing
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4 lg:w-1/5">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <nav className="space-y-1">
              <button onClick={() => setActiveTab('listings')} className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${activeTab === 'listings' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                <ListIcon className="w-5 h-5 mr-3" /> My Listings
              </button>
              <button onClick={() => setActiveTab('chats')} className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${activeTab === 'chats' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                <ChatIcon className="w-5 h-5 mr-3" /> My Chats
              </button>
              <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                <SettingsIcon className="w-5 h-5 mr-3" /> Profile Settings
              </button>
            </nav>
          </div>
        </aside>
        <main className="md:w-3/4 lg:w-4/5">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md min-h-[400px]">
             <TabContent />
          </div>
        </main>
      </div>
      <CreateListingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onListingCreated={handleListingCreated} />
    </>
  );
};

export default DashboardPage;
