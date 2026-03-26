import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Users, Building2, Ticket, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-2 rounded-lg">
                <Film className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold">BookMyShow</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => navigate('/register')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-700">India's #1 Entertainment Platform</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Book Tickets for
              <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Movies, Events & More
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Experience seamless booking for movies, plays, sports, and events. Your entertainment journey starts here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" onClick={() => navigate('/register')}>
                <Ticket className="w-5 h-5 mr-2" />
                Start Booking Now
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate('/register')}>
                <Building2 className="w-5 h-5 mr-2" />
                List Your Venue
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center group cursor-pointer">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Ticket className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Quick Booking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Book tickets in seconds with our lightning-fast checkout process
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group cursor-pointer">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <MapPin className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Nationwide Coverage</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Access theatres and venues across all major cities in India
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group cursor-pointer">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">For Venue Owners</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Powerful tools to manage your venues, shows, and bookings
                </p>
              </CardContent>
            </Card>

            <Card className="text-center group cursor-pointer">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">24/7 Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Round-the-clock customer support for all your queries
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold shadow-lg">
                  1
                </div>
                <h4 className="font-bold text-xl mb-3">Create Account</h4>
                <p className="text-red-50 leading-relaxed">
                  Sign up as a customer or register your venue in minutes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold shadow-lg">
                  2
                </div>
                <h4 className="font-bold text-xl mb-3">Explore & Select</h4>
                <p className="text-red-50 leading-relaxed">
                  Browse shows, check availability, and pick your perfect seats
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-bold shadow-lg">
                  3
                </div>
                <h4 className="font-bold text-xl mb-3">Book & Enjoy</h4>
                <p className="text-red-50 leading-relaxed">
                  Secure your booking and get ready for an amazing experience
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-3xl p-12 shadow-sm">
          <Film className="w-16 h-16 text-red-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers and venue owners on India's most trusted entertainment platform
          </p>
          <Button size="lg" className="text-lg px-10" onClick={() => navigate('/register')}>
            Register Now - It's Free!
          </Button>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 p-2 rounded-lg">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">BookMyShow</span>
              </div>
              <p className="text-sm text-gray-400">Your ultimate entertainment booking platform</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 BookMyShow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
