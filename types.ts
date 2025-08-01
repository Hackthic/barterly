export enum ListingType {
  BARTER = 'Barter',
  RENT = 'Rent',
  BOTH = 'Both',
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  joinedDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  type: ListingType;
  location: string;
  owner: User;
  postedDate: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  comment: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  participants: User[];
  product: Product;
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
}