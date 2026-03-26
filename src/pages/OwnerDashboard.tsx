import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Film, LogOut, User, X, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { theatreService, hallService, showService } from '../services/api';
import type { TheatreOwner, SeatType, Currency } from '../types';

export const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TheatreOwner | null>(null);
  const [activeTab, setActiveTab] = useState<'theatres' | 'halls' | 'shows'>('theatres');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [theatreForm, setTheatreForm] = useState({
    theaterName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const [hallForm, setHallForm] = useState({
    hallName: '',
    seatCount: '',
    theatreId: '',
    rowMappings: [
      { seatType: 'REGULAR' as SeatType, rowRange: '', seatCount: '', basePrice: '', basePriceCurrency: 'INR' as Currency }
    ]
  });

  const [showForm, setShowForm] = useState({
    showName: '',
    shortDescription: '',
    artists: '',
    showStartTime: '',
    showEndTime: '',
    hallId: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/register');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/register');
  };

  const handleCreateTheatre = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = {
        theaterName: theatreForm.theaterName,
        location: {
          addressLine1: theatreForm.addressLine1,
          addressLine2: theatreForm.addressLine2,
          city: theatreForm.city,
          state: theatreForm.state,
          country: theatreForm.country,
          zipCode: parseInt(theatreForm.zipCode),
        },
      };

      await theatreService.createTheatre(user.sysId, data);
      setSuccess('Theatre created successfully!');
      setShowModal(false);
      setTheatreForm({
        theaterName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create theatre');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = {
        hallName: hallForm.hallName,
        seatCount: parseInt(hallForm.seatCount),
        rowMappingList: hallForm.rowMappings.map(rm => ({
          seatType: rm.seatType,
          rowRange: rm.rowRange,
          seatCount: rm.seatCount,
          basePrice: parseFloat(rm.basePrice),
          basePriceCurrency: rm.basePriceCurrency,
        })),
      };

      await hallService.registerHall(user.sysId, hallForm.theatreId, data);
      setSuccess('Hall created successfully!');
      setShowModal(false);
      setHallForm({
        hallName: '',
        seatCount: '',
        theatreId: '',
        rowMappings: [
          { seatType: 'REGULAR' as SeatType, rowRange: '', seatCount: '', basePrice: '', basePriceCurrency: 'INR' as Currency }
        ]
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create hall');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = {
        showName: showForm.showName,
        shortDescription: showForm.shortDescription,
        artists: showForm.artists,
        showStartTime: showForm.showStartTime,
        showEndTime: showForm.showEndTime,
      };

      await showService.createShow(user.sysId, showForm.hallId, data);
      setSuccess('Show created successfully!');
      setShowModal(false);
      setShowForm({
        showName: '',
        shortDescription: '',
        artists: '',
        showStartTime: '',
        showEndTime: '',
        hallId: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create show');
    } finally {
      setLoading(false);
    }
  };

  const addRowMapping = () => {
    setHallForm({
      ...hallForm,
      rowMappings: [
        ...hallForm.rowMappings,
        { seatType: 'REGULAR' as SeatType, rowRange: '', seatCount: '', basePrice: '', basePriceCurrency: 'INR' as Currency }
      ]
    });
  };

  const removeRowMapping = (index: number) => {
    setHallForm({
      ...hallForm,
      rowMappings: hallForm.rowMappings.filter((_, i) => i !== index)
    });
  };

  const updateRowMapping = (index: number, field: string, value: string) => {
    const updated = [...hallForm.rowMappings];
    updated[index] = { ...updated[index], [field]: value };
    setHallForm({ ...hallForm, rowMappings: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-2 rounded-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Venue Manager</h1>
                <p className="text-xs text-gray-400">Manage your entertainment venues</p>
              </div>
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

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 text-green-700 px-6 py-4 rounded-lg shadow-sm">
            <p className="font-medium">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('theatres')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'theatres'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building2 className="w-4 h-4 inline mr-2" />
            Theatres
          </button>
          <button
            onClick={() => setActiveTab('halls')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'halls'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Film className="w-4 h-4 inline mr-2" />
            Halls
          </button>
          <button
            onClick={() => setActiveTab('shows')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'shows'
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Film className="w-4 h-4 inline mr-2" />
            Shows
          </button>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'theatres' && 'Your Theatres'}
                  {activeTab === 'halls' && 'Your Halls'}
                  {activeTab === 'shows' && 'Your Shows'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'theatres' && 'Manage your theatre venues and locations'}
                  {activeTab === 'halls' && 'Configure halls and seating arrangements'}
                  {activeTab === 'shows' && 'Schedule and manage your shows'}
                </p>
              </div>
              <Button onClick={() => setShowModal(true)} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add {activeTab === 'theatres' ? 'Theatre' : activeTab === 'halls' ? 'Hall' : 'Show'}
              </Button>
            </div>
            
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Film className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No {activeTab} yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first {activeTab.slice(0, -1)}</p>
              <Button variant="outline" onClick={() => setShowModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create {activeTab === 'theatres' ? 'Theatre' : activeTab === 'halls' ? 'Hall' : 'Show'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold">
                    {activeTab === 'theatres' && 'Create New Theatre'}
                    {activeTab === 'halls' && 'Create New Hall'}
                    {activeTab === 'shows' && 'Create New Show'}
                  </h2>
                  <p className="text-red-100 text-sm mt-1">
                    {activeTab === 'theatres' && 'Add a new theatre venue to your portfolio'}
                    {activeTab === 'halls' && 'Configure a new hall with seating details'}
                    {activeTab === 'shows' && 'Schedule a new show for your audience'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">

                {activeTab === 'theatres' && (
                  <form onSubmit={handleCreateTheatre} className="space-y-4">
                    <Input
                      label="Theatre Name"
                      value={theatreForm.theaterName}
                      onChange={(e) => setTheatreForm({ ...theatreForm, theaterName: e.target.value })}
                      required
                    />
                    <Input
                      label="Address Line 1"
                      value={theatreForm.addressLine1}
                      onChange={(e) => setTheatreForm({ ...theatreForm, addressLine1: e.target.value })}
                      required
                    />
                    <Input
                      label="Address Line 2"
                      value={theatreForm.addressLine2}
                      onChange={(e) => setTheatreForm({ ...theatreForm, addressLine2: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        value={theatreForm.city}
                        onChange={(e) => setTheatreForm({ ...theatreForm, city: e.target.value })}
                        required
                      />
                      <Input
                        label="State"
                        value={theatreForm.state}
                        onChange={(e) => setTheatreForm({ ...theatreForm, state: e.target.value })}
                        required
                      />
                      <Input
                        label="Country"
                        value={theatreForm.country}
                        onChange={(e) => setTheatreForm({ ...theatreForm, country: e.target.value })}
                        required
                      />
                      <Input
                        label="Zip Code"
                        value={theatreForm.zipCode}
                        onChange={(e) => setTheatreForm({ ...theatreForm, zipCode: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex gap-4 pt-6 border-t mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 h-12">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1 h-12">
                        {loading ? 'Creating Theatre...' : 'Create Theatre'}
                      </Button>
                    </div>
                  </form>
                )}

                {activeTab === 'halls' && (
                  <form onSubmit={handleCreateHall} className="space-y-4">
                    <Input
                      label="Theatre ID (UUID)"
                      value={hallForm.theatreId}
                      onChange={(e) => setHallForm({ ...hallForm, theatreId: e.target.value })}
                      placeholder="Enter theatre UUID"
                      required
                    />
                    <Input
                      label="Hall Name"
                      value={hallForm.hallName}
                      onChange={(e) => setHallForm({ ...hallForm, hallName: e.target.value })}
                      required
                    />
                    <Input
                      label="Total Seat Count"
                      type="number"
                      value={hallForm.seatCount}
                      onChange={(e) => setHallForm({ ...hallForm, seatCount: e.target.value })}
                      required
                    />
                    
                    <div className="border-t pt-5 mt-5">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Seating Configuration</h3>
                        <Button type="button" size="sm" variant="outline" onClick={addRowMapping}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add Row Mapping
                        </Button>
                      </div>
                      
                      {hallForm.rowMappings.map((mapping, index) => (
                        <div key={index} className="bg-gray-50 border-2 border-gray-200 rounded-xl p-5 mb-4 space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium mb-1">Seat Type</label>
                              <select
                                value={mapping.seatType}
                                onChange={(e) => updateRowMapping(index, 'seatType', e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                              >
                                <option value="REGULAR">Regular</option>
                                <option value="PREMIUM">Premium</option>
                                <option value="VIP">VIP</option>
                                <option value="RECLINER">Recliner</option>
                              </select>
                            </div>
                            <Input
                              label="Row Range"
                              value={mapping.rowRange}
                              onChange={(e) => updateRowMapping(index, 'rowRange', e.target.value)}
                              placeholder="e.g., A-E"
                              required
                            />
                            <Input
                              label="Seat Count"
                              type="number"
                              value={mapping.seatCount}
                              onChange={(e) => updateRowMapping(index, 'seatCount', e.target.value)}
                              required
                            />
                            <Input
                              label="Base Price"
                              type="number"
                              value={mapping.basePrice}
                              onChange={(e) => updateRowMapping(index, 'basePrice', e.target.value)}
                              required
                            />
                          </div>
                          {hallForm.rowMappings.length > 1 && (
                            <Button
                              type="button"
                              variant="danger"
                              size="sm"
                              onClick={() => removeRowMapping(index)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove Row
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-6 border-t mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 h-12">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1 h-12">
                        {loading ? 'Creating Hall...' : 'Create Hall'}
                      </Button>
                    </div>
                  </form>
                )}

                {activeTab === 'shows' && (
                  <form onSubmit={handleCreateShow} className="space-y-4">
                    <Input
                      label="Hall ID (UUID)"
                      value={showForm.hallId}
                      onChange={(e) => setShowForm({ ...showForm, hallId: e.target.value })}
                      placeholder="Enter hall UUID"
                      required
                    />
                    <Input
                      label="Show Name"
                      value={showForm.showName}
                      onChange={(e) => setShowForm({ ...showForm, showName: e.target.value })}
                      required
                    />
                    <Input
                      label="Short Description"
                      value={showForm.shortDescription}
                      onChange={(e) => setShowForm({ ...showForm, shortDescription: e.target.value })}
                      required
                    />
                    <Input
                      label="Artists"
                      value={showForm.artists}
                      onChange={(e) => setShowForm({ ...showForm, artists: e.target.value })}
                      placeholder="e.g., Actor 1, Actor 2"
                      required
                    />
                    <Input
                      label="Show Start Time"
                      type="datetime-local"
                      value={showForm.showStartTime}
                      onChange={(e) => setShowForm({ ...showForm, showStartTime: e.target.value })}
                      required
                    />
                    <Input
                      label="Show End Time"
                      type="datetime-local"
                      value={showForm.showEndTime}
                      onChange={(e) => setShowForm({ ...showForm, showEndTime: e.target.value })}
                      required
                    />
                    <div className="flex gap-4 pt-6 border-t mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 h-12">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1 h-12">
                        {loading ? 'Creating Show...' : 'Create Show'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
