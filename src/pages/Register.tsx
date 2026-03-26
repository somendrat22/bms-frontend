import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register for Book My Show</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-6">
              <Button
                type="button"
                variant={userType === UserType.CUSTOMER ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setUserType(UserType.CUSTOMER)}
              >
                Customer
              </Button>
              <Button
                type="button"
                variant={userType === UserType.THEATER_OWNER ? 'primary' : 'outline'}
                className="flex-1"
                onClick={() => setUserType(UserType.THEATER_OWNER)}
              >
                Theatre Owner
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="+919876543210"
                required
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="md:col-span-2"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Address Line 1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                  className="md:col-span-2"
                />
                <Input
                  label="Address Line 2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="md:col-span-2"
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {userType === UserType.THEATER_OWNER && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="PAN Card"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="GST Number"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Business Registration ID"
                    name="businessRegistrationId"
                    value={formData.businessRegistrationId}
                    onChange={handleInputChange}
                    required
                    className="md:col-span-2"
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
