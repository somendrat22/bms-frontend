import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Book My Show</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.fullName}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Theatres Near You</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter city name (e.g., Mumbai, Delhi)"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {theatres.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Theatres in {searchCity} ({theatres.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {theatres.map((theatre) => (
                <Card key={theatre.sysId} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {theatre.theaterName}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          {theatre.location.addressLine1}
                          {theatre.location.addressLine2 && `, ${theatre.location.addressLine2}`}
                          <br />
                          {theatre.location.city}, {theatre.location.state}
                        </span>
                      </div>
                      {theatre.owner && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Owner:</span>
                          <span>{theatre.owner.fullName}</span>
                        </div>
                      )}
                    </div>
                    <Button variant="primary" className="w-full mt-4">
                      View Shows
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loading && theatres.length === 0 && searchCity && (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No theatres found in {searchCity}</p>
            <p className="text-sm text-gray-500 mt-2">Try searching for another city</p>
          </div>
        )}

        {!searchCity && (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Search for theatres in your city to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};
