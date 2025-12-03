import { useState, useEffect } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardDescription } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  CheckCircle,
  Heart,
  Star,
  Users,
  Award,
  Edit,
  Save,
  X,
  Lock,
  Mail,
  Phone,
  Clock,
  Briefcase,
  Languages,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import imgDoctor from "figma:asset/e0be30dc4623008900b621d96ad20f3641641248.png";
import { doctorStorageService } from "../../services/doctor-storage.service";
import { DoctorProfile } from "../../types/doctor.types";
import { useDoctorDetails } from "../../hooks/useDoctorDetails";

interface MyProfilePageProps {
  onNavigate: (page: string) => void;
}

// No need to define Review interface here as it's already defined in doctor-storage.service.ts

export function MyProfilePage({ onNavigate }: MyProfilePageProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Get reviews from storage and API
  const [reviews, setReviews] = useState(() => doctorStorageService.getDoctorReviews());

  // Get the hook functions
 const { fetchDoctorReviews, doctorProfile: hookDoctorProfile } = useDoctorDetails();
  
  // Fetch reviews when component mounts
  useEffect(() => {
    const loadReviews = async () => {
      if (hookDoctorProfile?.professional_id) {
        try {
          const reviewsData = await fetchDoctorReviews(hookDoctorProfile.professional_id);
          if (reviewsData && reviewsData.reviews) {
            // Transform API reviews to match our local format
            const transformedReviews = reviewsData.reviews.map((apiReview: any) => ({
              id: apiReview.review_id.toString(),
              patientName: apiReview.author || 'Patient',
              rating: apiReview.rating,
              comment: apiReview.comment || '',
              appreciatedAspects: apiReview.appreciated_aspects ? apiReview.appreciated_aspects.split(',').map((s: string) => s.trim()) : [],
              createdAt: apiReview.created_at || new Date().toISOString(),
            }));
            
            // Store reviews in local storage and update state
            doctorStorageService.setDoctorReviews(transformedReviews);
            setReviews(transformedReviews);
            
            // Update profile data with the actual review count from API
            if (reviewsData.total !== undefined) {
              setProfileData(prev => ({
                ...prev,
                totalReviews: reviewsData.total
              }));
            }
          }
        } catch (error) {
          console.error('Error fetching doctor reviews:', error);
          // If API fetch fails, continue with local storage reviews
        }
      }
    };
    
    loadReviews();
  }, [hookDoctorProfile?.professional_id, fetchDoctorReviews]);

  // Get doctor profile data from storage
  const localDoctorProfile = doctorStorageService.getDoctorProfile();
  const doctorDashboardStats = doctorStorageService.getDoctorDashboardStats();
   
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: localDoctorProfile?.full_name || "Dr. Lorem Ipsum",
    specialty: localDoctorProfile?.specialty || "Psychiatrist",
    isVerified: localDoctorProfile?.verification_status === 'verified' || true,
    isVolunteer: localDoctorProfile?.is_volunteer || true,
    rating: doctorDashboardStats?.rating || localDoctorProfile?.rating || 4.7,
    totalReviews: doctorDashboardStats?.total_reviews || localDoctorProfile?.total_reviews || 127,
    patientsTreated: doctorDashboardStats?.patients_treated?.toString() || localDoctorProfile?.patients_treated?.toString() || "100+",
    bio: localDoctorProfile?.specialty ? `I am a ${localDoctorProfile.specialty} with ${localDoctorProfile.years_of_experience || 8} years of experience. My approach is patient-centered and evidence-based, focusing on creating a safe and supportive environment for healing.` : "I am a board-certified psychiatrist with over 8 years of experience in treating anxiety, depression, and stress-related disorders. My approach is patient-centered and evidence-based, focusing on creating a safe and supportive environment for healing.",
    credentials: localDoctorProfile?.credentials || "MBBS, MD (Psychiatry), Board Certified",
    yearsOfExperience: localDoctorProfile?.years_of_experience || 8,
    languagesSpoken: localDoctorProfile?.languages_spoken || "English, Hindi, Marathi",
    workingHours: localDoctorProfile?.working_hours || "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    email: localDoctorProfile?.email || "dr.lorem.ipsum@clinico.com",
    phoneNumber: localDoctorProfile?.phone_number || "+91 98765 43210",
  });

  const [editedData, setEditedData] = useState({
    ...profileData,
    // Initialize with actual profile data but allow editing
    fullName: localDoctorProfile?.full_name || "Dr. Lorem Ipsum",
    specialty: localDoctorProfile?.specialty || "Psychiatrist",
    credentials: localDoctorProfile?.credentials || "MBBS, MD (Psychiatry), Board Certified",
    yearsOfExperience: localDoctorProfile?.years_of_experience || 8,
    languagesSpoken: localDoctorProfile?.languages_spoken || "English, Hindi, Marathi",
    workingHours: localDoctorProfile?.working_hours || "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 2:00 PM",
    email: localDoctorProfile?.email || "dr.lorem.ipsum@clinico.com",
    phoneNumber: localDoctorProfile?.phone_number || "+91 98765 43210",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel editing - reset edited data to current profile data
      setEditedData({ ...profileData });
      setIsEditMode(false);
    } else {
      // Enter edit mode - initialize edited data with current profile data
      setEditedData({ ...profileData });
      setIsEditMode(true);
    }
  };

  const handleSaveChanges = () => {
    // Save the edited data to local state
    setProfileData({ ...editedData });
    
    // Update the doctor profile in storage
    const updatedProfile: Partial<DoctorProfile> = {
      full_name: editedData.fullName,
      specialty: editedData.specialty,
      credentials: editedData.credentials,
      years_of_experience: editedData.yearsOfExperience,
      languages_spoken: editedData.languagesSpoken,
      working_hours: editedData.workingHours,
      phone_number: editedData.phoneNumber,
    };
    
    doctorStorageService.updateDoctorProfile(updatedProfile);
    
    setIsEditMode(false);
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    // Simulate password change
    toast.success("Password changed successfully");
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <DashboardLayout currentPage="profile" onNavigate={onNavigate}>
      <div className="space-y-6 max-w-6xl">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[#174880]">My Profile</h1>
            <p className="text-gray-600 mt-1">
              Manage your public profile, professional credentials, and account settings.
            </p>
          </div>
          <div className="flex gap-2">
            {isEditMode && (
              <Button variant="outline" onClick={handleEditToggle}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            )}
            <Button
              onClick={isEditMode ? handleSaveChanges : handleEditToggle}
              className="bg-[#174880]"
            >
              {isEditMode ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Section 1: Public Profile & Statistics */}
        <Card>
          <CardHeader>
            <h2 className="text-[#174880]">Public Profile</h2>
            <CardDescription>
              This information is visible to patients when they view your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Card */}
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={imgDoctor} alt={profileData.fullName} />
                <AvatarFallback className="bg-[#174880] text-white text-2xl">
                  DL
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl">{profileData.fullName}</h3>
                <p className="text-gray-600 mt-1">{profileData.specialty}</p>
                <div className="flex gap-2 mt-3">
                  {profileData.isVerified && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                  {profileData.isVolunteer && (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      <Heart className="mr-1 h-3 w-3" />
                      Volunteer
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Aggregated Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2">
                    <Star className="h-8 w-8 text-yellow-500 fill-yellow-400" />
                  </div>
                  <div className="text-3xl text-[#174880] mb-1">
                    {profileData.rating}
                  </div>
                  <p className="text-sm text-gray-600">out of 5 stars</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl text-[#174880] mb-1">
                    {profileData.totalReviews}
                  </div>
                  <p className="text-sm text-gray-600">Total Patient Reviews</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-3xl text-[#174880] mb-1">
                    {profileData.patientsTreated}
                  </div>
                  <p className="text-sm text-gray-600">Patients Helped</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Professional Details */}
        <Card>
          <CardHeader>
            <h2 className="text-[#174880]">Professional Details</h2>
            <CardDescription>
              Your professional information and credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* About Me */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#174880]" />
                About Me
              </Label>
              {isEditMode ? (
                <Textarea
                  id="bio"
                  value={editedData.bio}
                  onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
              ) : (
                <p className="text-gray-700">{profileData.bio}</p>
              )}
            </div>

            {/* Specialty */}
            <div className="space-y-2">
              <Label htmlFor="specialty" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#174880]" />
                Specialty
              </Label>
              {isEditMode ? (
                <Input
                  id="specialty"
                  value={editedData.specialty}
                  onChange={(e) =>
                    setEditedData({ ...editedData, specialty: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-700">{profileData.specialty}</p>
              )}
            </div>

            {/* Credentials */}
            <div className="space-y-2">
              <Label htmlFor="credentials" className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#174880]" />
                Credentials
              </Label>
              {isEditMode ? (
                <Input
                  id="credentials"
                  value={editedData.credentials}
                  onChange={(e) =>
                    setEditedData({ ...editedData, credentials: e.target.value })
                  }
                />
              ) : (
                <p className="text-gray-700">{profileData.credentials}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Years of Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-[#174880]" />
                  Years of Experience
                </Label>
                {isEditMode ? (
                  <Input
                    id="experience"
                    type="number"
                    value={editedData.yearsOfExperience}
                    onChange={(e) =>
                      setEditedData({
                        ...editedData,
                        yearsOfExperience: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                ) : (
                  <p className="text-gray-700">{profileData.yearsOfExperience} years</p>
                )}
              </div>

              {/* Languages Spoken */}
              <div className="space-y-2">
                <Label htmlFor="languages" className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-[#174880]" />
                  Languages Spoken
                </Label>
                {isEditMode ? (
                  <Input
                    id="languages"
                    value={editedData.languagesSpoken}
                    onChange={(e) =>
                      setEditedData({ ...editedData, languagesSpoken: e.target.value })
                    }
                    placeholder="e.g., English, Hindi, Spanish"
                  />
                ) : (
                  <p className="text-gray-700">{profileData.languagesSpoken}</p>
                )}
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-2">
              <Label htmlFor="workingHours" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#174880]" />
                My Working Hours
              </Label>
              {isEditMode ? (
                <Input
                  id="workingHours"
                  value={editedData.workingHours}
                  onChange={(e) =>
                    setEditedData({ ...editedData, workingHours: e.target.value })
                  }
                  placeholder="e.g., Mon-Fri: 9:00 AM - 6:00 PM"
                />
              ) : (
                <p className="text-gray-700">{profileData.workingHours}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Account & Security */}
        <Card>
          <CardHeader>
            <h2 className="text-[#174880]">Account & Security</h2>
            <CardDescription>Manage your account credentials and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#174880]" />
                Email Address
              </Label>
              <Input id="email" value={profileData.email} disabled className="bg-gray-50" />
              <p className="text-xs text-gray-500">
                Email cannot be changed directly. Contact support for assistance.
              </p>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#174880]" />
                Phone Number
              </Label>
              {isEditMode ? (
                <Input
                  id="phone"
                  value={editedData.phoneNumber}
                  onChange={(e) =>
                    setEditedData({ ...editedData, phoneNumber: e.target.value })
                  }
                  placeholder="+91 XXXXX XXXXX"
                />
              ) : (
                <p className="text-gray-700">{profileData.phoneNumber}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#174880]" />
                Password
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="password"
                  type="password"
                  value="••••••••••"
                  disabled
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordModal(true)}
                  className="text-[#174880]"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Recent Patient Feedback */}
        <Card>
          <CardHeader>
            <h2 className="text-[#174880]">Recent Patient Reviews</h2>
            <CardDescription>See what your patients are saying about you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium">{review.patientName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex flex-wrap gap-2">
                      {review.appreciatedAspects.map((aspect, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
                          {aspect}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" className="text-[#174880]">
                View All My Reviews ({reviews.length})
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                placeholder="Enter new password (min 8 characters)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordData({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleChangePassword} className="bg-[#174880]">
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}