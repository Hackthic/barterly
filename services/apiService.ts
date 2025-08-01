import { Product, User, ListingType, Testimonial, Chat, Message } from '../types';

// --- MOCK DATA ---

const users: User[] = [
  { id: 'u1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', location: 'San Francisco, CA', joinedDate: '2023-05-15' },
  { id: 'u2', name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', location: 'New York, NY', joinedDate: '2023-08-20' },
  { id: 'u3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', location: 'Austin, TX', joinedDate: '2024-01-10' },
];

const products: Product[] = [
  { id: 'p1', title: 'Vintage Leather Backpack', description: 'A stylish and durable vintage leather backpack, perfect for daily use or short trips. Well-maintained with a classic look.', image: 'https://picsum.photos/seed/p1/600/400', type: ListingType.BARTER, location: 'San Francisco, CA', owner: users[0], postedDate: '2024-07-20' },
  { id: 'p2', title: 'Professional DSLR Camera', description: 'Canon EOS 5D Mark IV. Comes with a 24-70mm lens. Ideal for professional photographers or enthusiasts looking to rent high-quality gear.', image: 'https://picsum.photos/seed/p2/600/400', type: ListingType.RENT, location: 'New York, NY', owner: users[1], postedDate: '2024-07-18' },
  { id: 'p3', title: 'Mountain Bike - Large Frame', description: 'A high-performance mountain bike ready for any trail. Available for rent or barter for another outdoor equipment.', image: 'https://picsum.photos/seed/p3/600/400', type: ListingType.BOTH, location: 'Austin, TX', owner: users[2], postedDate: '2024-07-15' },
  { id: 'p4', title: 'Electric Guitar & Amp', description: 'Fender Stratocaster with a small practice amp. Great for gigs or practice sessions. Looking to barter for a bass guitar.', image: 'https://picsum.photos/seed/p4/600/400', type: ListingType.BARTER, location: 'San Francisco, CA', owner: users[0], postedDate: '2024-07-12' },
  { id: 'p5', title: 'Portable Projector HD', description: 'Rent this compact HD projector for movie nights or presentations. Comes with all necessary cables.', image: 'https://picsum.photos/seed/p5/600/400', type: ListingType.RENT, location: 'New York, NY', owner: users[1], postedDate: '2024-07-10' },
  { id: 'p6', title: 'Set of Classic Novels', description: 'A collection of 20 classic novels in hardcover. Open to bartering for art supplies or renting the whole set.', image: 'https://picsum.photos/seed/p6/600/400', type: ListingType.BOTH, location: 'Austin, TX', owner: users[2], postedDate: '2024-07-05' },
];

const testimonials: Testimonial[] = [
  { id: 't1', author: 'Sarah K.', role: 'Frequent Barterer', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', comment: 'Barterly has been a game-changer! I\'ve traded my old books for amazing handcrafted jewelry. The community is fantastic and trustworthy.' },
  { id: 't2', author: 'Mike R.', role: 'Photographer', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705e', comment: 'Renting camera gear through this platform was seamless and affordable. It saved me a fortune on my last project. Highly recommend!' },
  { id: 't3', author: 'Jenna L.', role: 'DIY Enthusiast', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705f', comment: 'I love the flexibility of being able to both rent and barter. I rented out my power tools and bartered for some beautiful pottery.' },
];

const chats: Chat[] = [
    { id: 'c1', participants: [users[0], users[1]], product: products[1], messages: [
        {id: 'm1', senderId: 'u1', text: 'Hi Bob, I\'m interested in renting your DSLR for a weekend shoot.', timestamp: '2024-07-21T10:00:00Z'},
        {id: 'm2', senderId: 'u2', text: 'Hi Alice! Sounds good. Which weekend were you thinking?', timestamp: '2024-07-21T10:02:00Z'}
    ], lastMessage: 'Hi Alice! Sounds good. Which weekend were you thinking?', lastMessageTimestamp: '2024-07-21T10:02:00Z' },
    { id: 'c2', participants: [users[0], users[2]], product: products[2], messages: [], lastMessage: 'Hey, saw your mountain bike listing. I have some camping gear to trade.', lastMessageTimestamp: '2024-07-20T15:30:00Z' },
];

// --- MOCK API FUNCTIONS ---

const simulateNetwork = <T,>(data: T): Promise<T> => {
    return new Promise(res => setTimeout(() => res(data), 500 + Math.random() * 500));
}

export const apiService = {
    login: (email: string, password: string): Promise<User> => {
        console.log(`Attempting login for ${email} with password ${password}`);
        // In a real app, this would be an API call.
        // For mock, we'll return a user if email is not 'fail@test.com'
        if (email.toLowerCase() === 'fail@test.com') {
            return Promise.reject(new Error('Invalid credentials'));
        }
        return simulateNetwork(users[0]);
    },
    register: (name: string, email: string, password: string): Promise<User> => {
        console.log(`Attempting registration for ${name} with email ${email} and password ${password}`);
        if (email.toLowerCase() === 'exists@test.com') {
            return Promise.reject(new Error('Email already in use'));
        }
        const newUser: User = {
            id: `u${Date.now()}`,
            name,
            avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
            location: 'Unknown',
            joinedDate: new Date().toISOString().split('T')[0],
        };
        return simulateNetwork(newUser);
    },
    fetchProducts: (query: string = '', filters: any = {}): Promise<Product[]> => {
        let filteredProducts = products;
        if (query) {
            filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
        }
        if (filters.type && filters.type !== 'All') {
            filteredProducts = filteredProducts.filter(p => p.type === filters.type || p.type === ListingType.BOTH);
        }
        return simulateNetwork(filteredProducts);
    },
    fetchProductById: (id: string): Promise<Product | undefined> => {
        return simulateNetwork(products.find(p => p.id === id));
    },
    fetchLatestProducts: (limit: number = 3): Promise<Product[]> => {
        const sorted = [...products].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        return simulateNetwork(sorted.slice(0, limit));
    },
    fetchTestimonials: (): Promise<Testimonial[]> => {
        return simulateNetwork(testimonials);
    },
    fetchUserListings: (userId: string): Promise<Product[]> => {
        return simulateNetwork(products.filter(p => p.owner.id === userId));
    },
    fetchUserChats: (userId: string): Promise<Chat[]> => {
        return simulateNetwork(chats.filter(c => c.participants.some(p => p.id === userId)));
    },
    fetchChatById: (chatId: string): Promise<Chat | undefined> => {
        return simulateNetwork(chats.find(c => c.id === chatId));
    },
    createListing: (listingData: Omit<Product, 'id' | 'owner' | 'postedDate' | 'image'> & {imageFile: File}): Promise<Product> => {
        // In a real app, you would upload imageFile to Cloudinary here.
        // The response would give you a URL, which you then use.
        // --- CLOUDINARY INTEGRATION POINT ---
        // const CLOUDINARY_UPLOAD_URL = "your_cloudinary_upload_url_here";
        // const CLOUDINARY_UPLOAD_PRESET = "your_cloudinary_unsigned_upload_preset";
        // const formData = new FormData();
        // formData.append('file', imageFile);
        // formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        // try {
        //   const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: formData });
        //   const data = await res.json();
        //   const imageUrl = data.secure_url;
        //   // ... proceed to create product with `imageUrl`
        // } catch (e) { console.error('Image upload failed', e); return Promise.reject(e); }
        // ------------------------------------
        
        const newProduct: Product = {
            id: `p${Date.now()}`,
            ...listingData,
            image: `https://picsum.photos/seed/${Date.now()}/600/400`, // Placeholder image
            owner: users[0], // Assume logged in user is users[0] for mock
            postedDate: new Date().toISOString().split('T')[0],
        };
        products.unshift(newProduct);
        return simulateNetwork(newProduct);
    },
     sendMessage: (chatId: string, text: string, senderId: string): Promise<Message> => {
        const chat = chats.find(c => c.id === chatId);
        if (!chat) return Promise.reject("Chat not found");
        
        const newMessage: Message = {
            id: `m${Date.now()}`,
            senderId,
            text,
            timestamp: new Date().toISOString(),
        };
        
        chat.messages.push(newMessage);
        chat.lastMessage = text;
        chat.lastMessageTimestamp = newMessage.timestamp;

        // In a real app, this would use Socket.io to emit the message
        // socket.emit('sendMessage', { chatId, message: newMessage });

        return simulateNetwork(newMessage);
    }
};