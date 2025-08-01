import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6">About Barterly</h1>
      <div className="max-w-4xl mx-auto text-slate-700 dark:text-slate-300 space-y-6">
        <p className="text-lg leading-relaxed">
          Welcome to Barterly, the premier platform for connecting people through the timeless practices of bartering and renting. In a world of fast consumption, we believe in the power of community and sustainable living. Our mission is to provide a simple, secure, and enjoyable space where you can unlock the hidden value in your possessions.
        </p>
        <p className="leading-relaxed">
          Whether you're looking to trade a beloved book for a new adventure, rent out your camera for a weekend to an aspiring photographer, or find a temporary home for your bicycle, Barterly makes it possible. We are more than just a marketplace; we are a community built on trust, shared interests, and the desire to make the most of what we already have.
        </p>
        <div className="py-8">
            <h2 className="text-3xl font-bold text-center mb-6">Our Vision</h2>
            <p className="text-center text-lg text-slate-600 dark:text-slate-400">
                To create a world where every item has a purpose and every person has access to what they need, fostering a circular economy that benefits both people and the planet.
            </p>
        </div>
        <p className="leading-relaxed">
          Our platform is designed with you in mind. With intuitive listings, secure real-time chat, and a focus on user experience, we strive to make every interaction seamless. Join us in building a more resourceful and connected world, one exchange at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;