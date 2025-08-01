
import React, { useState, useEffect } from 'react';
import { ListingType, Product } from '../types';
import { geminiService } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { XIcon } from './icons/XIcon';
import { apiService } from '../services/apiService';
import { useNotification } from '../context/NotificationContext';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListingCreated: (newListing: Product) => void;
}

const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onListingCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ListingType>(ListingType.BARTER);
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { addNotification } = useNotification();
  const modalRef = useFocusTrap<HTMLDivElement>(isOpen, onClose);

  // Reset form state when the modal is closed to ensure it's fresh next time
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setTitle('');
        setDescription('');
        setType(ListingType.BARTER);
        setLocation('');
        setImageFile(null);
        setImagePreviewUrl(null);
        setError('');
        setIsGenerating(false);
        setIsSubmitting(false);
      }, 300); // Delay to match closing animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  if (!isOpen) return null;
  
  const handleGenerateDescription = async () => {
    if (!title) {
        addNotification("Please enter a title first.", 'error');
        return;
    }
    setIsGenerating(true);
    try {
        const generatedDesc = await geminiService.generateDescription(title);
        setDescription(generatedDesc);
        addNotification("Description generated successfully!", 'success');
    } catch (err: any) {
        console.error(err);
        addNotification(err.message || "Failed to generate description.", 'error');
    } finally {
        setIsGenerating(false);
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setError('');

    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
        setError('Please select an image file.');
        addNotification('Please select an image file.', 'error');
        return;
    }
    setError('');
    setIsSubmitting(true);
    try {
        const newListing = await apiService.createListing({ title, description, type, location, imageFile });
        onListingCreated(newListing);
        addNotification('Listing created successfully!', 'success');
        onClose();
    } catch (err) {
        console.error(err);
        addNotification('Failed to create listing. Please try again.', 'error');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog">
      <div ref={modalRef} tabIndex={-1} className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 max-w-lg w-full m-4 relative animate-fade-in-up outline-none max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" aria-label="Close modal">
            <XIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Create New Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
            <div className="relative">
                <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" required></textarea>
                <button type="button" onClick={handleGenerateDescription} disabled={isGenerating || !title} className="absolute bottom-2 right-2 flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900/80 disabled:opacity-50 disabled:cursor-not-allowed">
                    <SparklesIcon className="w-4 h-4 mr-1" />
                    {isGenerating ? 'Generating...' : 'AI Generate'}
                </button>
            </div>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Listing Type</label>
            <select id="type" value={type} onChange={e => setType(e.target.value as ListingType)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white">
                <option>{ListingType.BARTER}</option>
                <option>{ListingType.RENT}</option>
                <option>{ListingType.BOTH}</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/50 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/80" required/>
          </div>
          {imagePreviewUrl && (
            <div className="mt-4 bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg">
              <img src={imagePreviewUrl} alt="Selected item preview" className="max-h-40 w-auto mx-auto rounded-md object-contain" />
            </div>
          )}
          {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait">
                {isSubmitting ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListingModal;
