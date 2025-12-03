import React, { useState } from 'react';
import { useDoctorContext } from '../../contexts/DoctorContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const DoctorProfileEdit: React.FC = () => {
  const { 
    doctorProfile, 
    updateDoctorProfile, 
    updateDoctorProfileField, 
    isLoading, 
    error 
  } = useDoctorContext();
  
  const [formData, setFormData] = useState({
    specialty: doctorProfile?.specialty || '',
    credentials: doctorProfile?.credentials || '',
    years_of_experience: doctorProfile?.years_of_experience?.toString() || '',
    languages_spoken: doctorProfile?.languages_spoken || '',
    working_hours: doctorProfile?.working_hours || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const profileData = {
        specialty: formData.specialty,
        credentials: formData.credentials,
        years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : undefined,
        languages_spoken: formData.languages_spoken,
        working_hours: formData.working_hours,
      };
      
      await updateDoctorProfile(profileData);
      console.log('Doctor profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (isLoading) {
    return <div>Loading doctor profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Doctor Profile</CardTitle>
        <CardDescription>Update your professional information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
              placeholder="Your medical specialty"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="credentials">Credentials</Label>
            <Input
              id="credentials"
              name="credentials"
              value={formData.credentials}
              onChange={handleInputChange}
              placeholder="Your qualifications (e.g., MD, PhD)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="years_of_experience">Years of Experience</Label>
            <Input
              id="years_of_experience"
              name="years_of_experience"
              type="number"
              value={formData.years_of_experience}
              onChange={handleInputChange}
              placeholder="Years of practice"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="languages_spoken">Languages Spoken</Label>
            <Input
              id="languages_spoken"
              name="languages_spoken"
              value={formData.languages_spoken}
              onChange={handleInputChange}
              placeholder="Languages you speak"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="working_hours">Working Hours</Label>
            <Input
              id="working_hours"
              name="working_hours"
              value={formData.working_hours}
              onChange={handleInputChange}
              placeholder="Your working hours"
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </div>
        </form>
        
        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      </CardContent>
    </Card>
  );
};

export default DoctorProfileEdit;