import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, MapPin, Search, LogOut, User, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { theatreService } from '../services/api';
import type { Theatre, Customer } from '../types';

export const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Customer | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/register');
    }
  }, [navigate]);

  const handleSearch = async () => {
    if (!searchCity.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const results = await theatreService.getTheatresByCity(searchCity);
      setTheatres(results);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch theatres');
      setTheatres([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/register');
  };

  const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];

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
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user?.fullName}</span>
              </div>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Discover Entertainment Near You</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Find Theatres & Book Shows
            </h2>
            <p className="text-lg text-gray-600">
              Search for theatres in your city and explore amazing shows
            </p>
          </div>

          <Card className="border-2 shadow-xl">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for your city (e.g., Mumbai, Delhi, Bangalore)"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"
                  />
                </div>
                <Button size="lg" onClick={handleSearch} disabled={loading} className="px-8">
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
              
              {error && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Popular Cities:</p>
                <div className="flex flex-wrap gap-2">
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSearchCity(city);
                        setTimeout(() => handleSearch(), 100);
                      }}
                      className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-red-500 hover:text-red-600 transition-all"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {theatres.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Theatres in {searchCity}
                </h2>
                <p className="text-gray-600 mt-1">{theatres.length} venue{theatres.length !== 1 ? 's' : ''} found</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {theatres.map((theatre) => (
                <Card key={theatre.sysId} className="group cursor-pointer overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Film className="w-16 h-16 text-white/80" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-gray-900">THEATRE</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {theatre.theaterName}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-600 leading-relaxed">
                          <p>{theatre.location.addressLine1}</p>
                          {theatre.location.addressLine2 && <p>{theatre.location.addressLine2}</p>}
                          <p className="font-medium text-gray-900 mt-1">
                            {theatre.location.city}, {theatre.location.state} - {theatre.location.zipCode}
                          </p>
                        </div>
                      </div>
                      
                      {theatre.owner && (
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            Managed by <span className="font-medium text-gray-900">{theatre.owner.fullName}</span>
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Button variant="primary" className="w-full group-hover:shadow-lg transition-shadow">
                      View Shows
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && theatres.length === 0 && searchCity && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Film className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Theatres Found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any theatres in {searchCity}</p>
            <Button variant="outline" onClick={() => setSearchCity('')}>
              Try Another City
            </Button>
          </div>
        )}

        {!searchCity && !loading && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Start Your Search</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter your city name above to discover theatres and book amazing shows near you
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
