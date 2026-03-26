import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, User, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { userService } from '../services/api';
import { UserType } from '../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>(UserType.CUSTOMER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    contactNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    panCard: '',
    businessRegistrationId: '',
    gstNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const requestData: any = {
        fullName: formData.fullName,
        password: formData.password,
        contactNumber: formData.contactNumber,
        location: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: parseInt(formData.zipCode),
        },
        userType,
      };

      if (userType === UserType.THEATER_OWNER) {
        requestData.panCard = formData.panCard;
        requestData.businessRegistrationId = formData.businessRegistrationId;
        requestData.gstNumber = formData.gstNumber;
      }

      const response = await userService.registerUser(requestData);
      
      localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('userType', userType);

      if (userType === UserType.CUSTOMER) {
        navigate('/customer/dashboard');
      } else {
        navigate('/owner/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-500 via-pink-600 to-purple-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-lg">
              <Film className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">BookMyShow</h1>
          </div>
          
          <div className="space-y-6 text-white">
            <h2 className="text-4xl font-bold leading-tight">
              Join India's Largest Entertainment Platform
            </h2>
            <p className="text-xl text-red-50">
              Book tickets for movies, events, plays, and sports across thousands of venues nationwide.
            </p>
            
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">10,000+ Shows Daily</h3>
                  <p className="text-red-50 text-sm">Across all major cities</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Multiple Categories</h3>
                  <p className="text-red-50 text-sm">Movies, Events, Sports & More</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Instant Booking</h3>
                  <p className="text-red-50 text-sm">Quick & secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-red-50 text-sm">
          © 2026 BookMyShow. All rights reserved.
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-xl">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <Card className="border-2">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join us and start your entertainment journey</p>
              </div>

              <div className="flex gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setUserType(UserType.CUSTOMER)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    userType === UserType.CUSTOMER
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className={`w-6 h-6 mx-auto mb-2 ${userType === UserType.CUSTOMER ? 'text-red-600' : 'text-gray-400'}`} />
                  <div className={`font-semibold ${userType === UserType.CUSTOMER ? 'text-red-600' : 'text-gray-700'}`}>
                    Customer
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Book tickets</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType(UserType.THEATER_OWNER)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    userType === UserType.THEATER_OWNER
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Building2 className={`w-6 h-6 mx-auto mb-2 ${userType === UserType.THEATER_OWNER ? 'text-red-600' : 'text-gray-400'}`} />
                  <div className={`font-semibold ${userType === UserType.THEATER_OWNER ? 'text-red-600' : 'text-gray-700'}`}>
                    Venue Owner
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Manage venues</div>
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                  <Input
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  required
                />

                <div className="border-t pt-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Location Details</h3>
                  <div className="space-y-4">
                    <Input
                      label="Address Line 1"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                    <Input
                      label="Address Line 2"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        required
                      />
                      <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        required
                      />
                      <Input
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="India"
                        required
                      />
                      <Input
                        label="Zip Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        required
                      />
                    </div>
                  </div>
                </div>

                {userType === UserType.THEATER_OWNER && (
                  <div className="border-t pt-5">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Business Details</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="PAN Card"
                          name="panCard"
                          value={formData.panCard}
                          onChange={handleInputChange}
                          placeholder="ABCDE1234F"
                          required
                        />
                        <Input
                          label="GST Number"
                          name="gstNumber"
                          value={formData.gstNumber}
                          onChange={handleInputChange}
                          placeholder="22AAAAA0000A1Z5"
                          required
                        />
                      </div>
                      <Input
                        label="Business Registration ID"
                        name="businessRegistrationId"
                        value={formData.businessRegistrationId}
                        onChange={handleInputChange}
                        placeholder="Enter your business registration ID"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
