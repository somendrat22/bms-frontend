import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Film } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Theatre Owner Dashboard</h1>
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
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'theatres' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('theatres')}
          >
            Theatres
          </Button>
          <Button
            variant={activeTab === 'halls' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('halls')}
          >
            Halls
          </Button>
          <Button
            variant={activeTab === 'shows' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('shows')}
          >
            Shows
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {activeTab === 'theatres' && 'Manage Theatres'}
                {activeTab === 'halls' && 'Manage Halls'}
                {activeTab === 'shows' && 'Manage Shows'}
              </CardTitle>
              <Button onClick={() => setShowModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add {activeTab === 'theatres' ? 'Theatre' : activeTab === 'halls' ? 'Hall' : 'Show'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-gray-500">
              <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p>No {activeTab} found. Click "Add" to create one.</p>
            </div>
          </CardContent>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {activeTab === 'theatres' && 'Create Theatre'}
                  {activeTab === 'halls' && 'Create Hall'}
                  {activeTab === 'shows' && 'Create Show'}
                </h2>

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
                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Creating...' : 'Create Theatre'}
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
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium">Row Mappings</h3>
                        <Button type="button" size="sm" onClick={addRowMapping}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add Row
                        </Button>
                      </div>
                      
                      {hallForm.rowMappings.map((mapping, index) => (
                        <div key={index} className="border rounded p-4 mb-3 space-y-3">
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
                              variant="outline"
                              size="sm"
                              onClick={() => removeRowMapping(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Creating...' : 'Create Hall'}
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
                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Creating...' : 'Create Show'}
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
