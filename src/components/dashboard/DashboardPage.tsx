import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, Video, Calendar as CalendarIcon } from "lucide-react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import imgMascot1 from "figma:asset/94d7ed97816124a20809c9809845a675f7f2459a.png";
import imgMascot2 from "figma:asset/c8f2f1e64db563d4bf0374b4fc0c8c0e2e4b32b1.png";
import imgMascot3 from "figma:asset/e34c3b0d2ae702854348fdbfd78c79720c9838de.png";
import imgStar from "figma:asset/6c33196cc20ee6a2e6bed740869ebff7beab78ab.png";
import { useState, useEffect } from "react";
import { useDoctorDetails } from "../../hooks/useDoctorDetails";

interface DashboardPageProps {
  onNavigate: (path: string, id?: string) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const [consultationView, setConsultationView] = useState("Overall");
  const { doctorProfile, dashboardStats, refreshDoctorData, isLoading, error } = useDoctorDetails();

  // Refresh doctor data when dashboard loads - automatic refresh on page load
    useEffect(() => {
      // Check if this is the first time loading the dashboard in this session
      // to avoid infinite refresh loops
      const hasRefreshed = sessionStorage.getItem('dashboardRefreshed');
      
      if (!hasRefreshed) {
        // Mark that we're about to refresh
        sessionStorage.setItem('dashboardRefreshed', 'true');
        // Perform the page refresh
        window.location.reload();
      } else {
        // If we've already refreshed, clear the flag so future visits can refresh again
        sessionStorage.removeItem('dashboardRefreshed');
      }
      
      // Refresh doctor data when dashboard loads
      const refreshData = async () => {
        try {
          await refreshDoctorData();
        } catch (err) {
          console.error('Error refreshing doctor data:', err);
        }
      };
  
      refreshData();
    }, []); // Empty dependency array means this runs once when component mounts

  // Using doctor data from context instead of mock data
  const upcomingConsultations = dashboardStats?.total_reviews || 8;
  const hoursVolunteered = 12;
  const consultationsToday = dashboardStats?.appointments_today_count || 3;
  const patientsHelped = dashboardStats?.patients_treated || 156;
  const rating = dashboardStats?.rating || 4.9;

  const todayAppointments = [
    { id: 1, time: "10:00 AM", patientName: "Abhay Raj", concern: "Follow-up for Anxiety", type: "Virtual" },
    { id: 2, time: "11:30 AM", patientName: "Alok Ranjan", concern: "Sore Throat & Fever", type: "Virtual" },
    { id: 3, time: "02:00 PM", patientName: "Tejaswin Singh", concern: "General Wellness Check", type: "Virtual" },
    { id: 4, time: "(Open Slot)", patientName: "", concern: "", type: "" },
  ];

  const volunteerImpactData = [
    { month: "Jan", consultations: 45 },
    { month: "Feb", consultations: 52 },
    { month: "Mar", consultations: 38 },
    { month: "Apr", consultations: 48 },
    { month: "May", consultations: 65 },
    { month: "Jun", consultations: 58 },
    { month: "Jul", consultations: 42 },
    { month: "Aug", consultations: 55 },
    { month: "Sep", consultations: 35 },
    { month: "Oct", consultations: 48 },
    { month: "Nov", consultations: 52 },
    { month: "Dec", consultations: 40 },
  ];

  const consultationTrendsData = [
    { month: "Jan", value1: 30, value2: 25, value3: 20 },
    { month: "Feb", value1: 40, value2: 35, value3: 30 },
    { month: "Mar", value1: 35, value2: 30, value3: 25 },
    { month: "Apr", value1: 50, value2: 45, value3: 40 },
    { month: "May", value1: 45, value2: 40, value3: 35 },
    { month: "Jun", value1: 60, value2: 55, value3: 50 },
    { month: "Jul", value1: 55, value2: 50, value3: 45 },
  ];

  const topPatientConcernsData = [
    { concern: "Jan '19", general: 51, wellness: 13, throat: 13, anxiety: 17 },
    { concern: "Q2 Jan", general: 54, wellness: 12, throat: 14, anxiety: 15 },
    { concern: "Q3 Jan", general: 58, wellness: 13, throat: 15, anxiety: 16 },
    { concern: "Q4 Jan", general: 56, wellness: 14, throat: 12, anxiety: 18 },
    { concern: "Q5 Jan", general: 61, wellness: 15, throat: 13, anxiety: 19 },
    { concern: "Q6 Jan", general: 64, wellness: 21, throat: 14, anxiety: 17 },
  ];

  const patientSatisfactionData = [
    { month: "Jan", yourRating: 85, platformAvg: 75, target: 90 },
    { month: "Feb", yourRating: 78, platformAvg: 72, target: 85 },
    { month: "Mar", yourRating: 82, platformAvg: 76, target: 88 },
    { month: "Apr", yourRating: 88, platformAvg: 78, target: 92 },
    { month: "May", yourRating: 75, platformAvg: 74, target: 86 },
    { month: "Jun", yourRating: 80, platformAvg: 76, target: 89 },
    { month: "Jul", yourRating: 85, platformAvg: 78, target: 91 },
    { month: "Aug", yourRating: 82, platformAvg: 75, target: 87 },
  ];

  const hoursData = [
    { day: "1", hours: 0.5 },
    { day: "2", hours: 1 },
    { day: "3", hours: 0 },
    { day: "4", hours: 2 },
    { day: "5", hours: 1.5 },
    { day: "6", hours: 0 },
    { day: "7", hours: 1 },
    { day: "8", hours: 2.5 },
    { day: "9", hours: 1 },
    { day: "10", hours: 0.5 },
    { day: "11", hours: 2 },
  ];

  const consultationsTodayData = [
    { time: "8AM", count: 0 },
    { time: "10AM", count: 1 },
    { time: "12PM", count: 1 },
    { time: "2PM", count: 1 },
    { time: "4PM", count: 0 },
  ];

  const patientsHelpedData = [
    { month: "1", count: 10 },
    { month: "2", count: 25 },
    { month: "3", count: 15 },
    { month: "4", count: 30 },
    { month: "5", count: 20 },
    { month: "6", count: 35 },
    { month: "7", count: 25 },
    { month: "8", count: 40 },
  ];

  return (
    <DashboardLayout onNavigate={onNavigate} currentPage="dashboard">
      <div className="space-y-6">
        {/* Row 1: Welcome & Top-Line Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Widget 1: Welcome Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-lg overflow-hidden relative">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-3xl text-[#174880]">07</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-3xl text-[#174880]">10</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-3xl text-[#174880]">25</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Tuesday,</p>
                  <p className="text-xl text-[#174880]">Welcome Back!</p>
                  <p className="text-lg text-gray-70">Dr. {doctorProfile?.full_name || 'Bhumika Choudhary'}</p>
                </div>
                <div className="absolute -right-4 -bottom-4">
                  <img src={imgMascot1} alt="Mascot" className="w-48 h-48 object-contain" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Widget 2: Upcoming Consultations */}
          <Card className="shadow-lg border-none">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4">Upcoming Consultations</h3>
              <div className="flex items-center justify-between">
                <div className="text-4xl text-green-600">{upcomingConsultations}</div>
                <div className="w-16 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ value: upcomingConsultations }, { value: 12 - upcomingConsultations }]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "66%" }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Widget 3: Hours Volunteered */}
          <Card className="shadow-lg border-none">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4">Hours Volunteered (This Month)</h3>
              <div className="text-4xl text-green-600 mb-4">{hoursVolunteered}</div>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={hoursData}>
                  <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Widget 4: Consultations Today */}
          <Card className="shadow-lg border-none">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4">Consultations Today</h3>
              <div className="text-4xl text-green-600 mb-4">{consultationsToday}</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={consultationsTodayData}>
                  <Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Widget 5: Patients Helped - Full Width Below */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <Card className="shadow-lg border-none">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-600 mb-4">Patients Helped (Total)</h3>
              <div className="text-4xl text-green-600 mb-4">{patientsHelped}</div>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={patientsHelpedData}>
                  <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </CardContent>
          </Card>

          {/* Row 2: Performance & Rating */}
          {/* Widget 6: My Volunteer Impact */}
          <Card className="lg:col-span-3 shadow-lg border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Volunteer Impact</CardTitle>
                <div className="flex gap-2">
                  <button className="text-xs text-gray-500 hover:text-gray-700">☰</button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">✕</button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={volunteerImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 70]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="consultations" stroke="#174880" fill="#93c5fd" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Widget 7: Your Rating */}
          <Card className="shadow-lg border-none bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden relative">
            <CardContent className="p-6">
              <h3 className="text-sm text-gray-700 mb-4">Your Rating</h3>
              <div className="flex flex-col items-center justify-center relative z-10">
                <div className="relative">
                  <img src={imgStar} alt="Star" className="w-32 h-32 object-contain" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl text-white">{rating}</span>
                    <span className="text-sm text-white">/ 5</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8">
                <img src={imgMascot2} alt="Mascot" className="w-40 h-40 object-contain" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Trends & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Widget 8: Consultation Trends */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Consultation Trends</CardTitle>
                <button className="text-xs text-[#174880] hover:underline">*Edit last two months</button>
              </div>
              <div className="flex gap-4 mt-2">
                {["Overall", "Monthly", "Daily"].map((view) => (
                  <button
                    key={view}
                    onClick={() => setConsultationView(view)}
                    className={`text-xs ${consultationView === view ? "text-[#174880]" : "text-gray-500"}`}
                  >
                    {view}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <div>
                  <span className="text-gray-600">Overall Growth:</span>
                  <span className="text-green-600 ml-2">38.80%</span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly:</span>
                  <span className="text-[#174880] ml-2">48.20%</span>
                </div>
                <div>
                  <span className="text-gray-600">Daily:</span>
                  <span className="text-red-600 ml-2">5.60%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={consultationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value1" stroke="#10b981" fill="#a7f3d0" strokeWidth={2} />
                  <Area type="monotone" dataKey="value2" stroke="#3b82f6" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="value3" stroke="#6366f1" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Widget 9: Top Patient Concerns */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Top Patient Concerns</CardTitle>
                <button className="text-xs text-[#174880] hover:underline">*Edit last two months</button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topPatientConcernsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="concern" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="general" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="wellness" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="throat" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="anxiety" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Widget 10: Patient Satisfaction */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Patient Satisfaction</CardTitle>
                <button className="text-xs text-[#174880] hover:underline">*Edit last two months</button>
              </div>
              <div className="flex gap-4 mt-2 text-sm">
                <div>
                  <span className="text-gray-600">Overall Growth:</span>
                  <span className="text-green-600 ml-2">38.40%</span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly:</span>
                  <span className="text-[#174880] ml-2">52.45%</span>
                </div>
                <div>
                  <span className="text-gray-600">Daily:</span>
                  <span className="text-red-600 ml-2">4.70%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={patientSatisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 120]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="yourRating" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="platformAvg" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 4: Today's Appointment Schedule */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Today's Appointment Schedule</CardTitle>
              <div className="flex gap-2">
                <button className="text-xs text-gray-500 hover:text-gray-700">☰</button>
                <button className="text-xs text-gray-500 hover:text-gray-700">✕</button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm text-gray-600">No</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Time</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Patient Name</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Primary Concern</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todayAppointments.map((appointment, index) => (
                    <tr key={appointment.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm">{index + 1}</td>
                      <td className="py-4 px-4 text-sm">{appointment.time}</td>
                      <td className="py-4 px-4 text-sm">{appointment.patientName}</td>
                      <td className="py-4 px-4 text-sm">{appointment.concern}</td>
                      <td className="py-4 px-4 text-sm">{appointment.type}</td>
                      <td className="py-4 px-4">
                        {appointment.patientName ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-[#174880] hover:bg-[#123a66] text-white"
                              onClick={() => onNavigate("/consultation", appointment.id.toString())}
                            >
                              JOIN CALL
                            </Button>
                            <Button size="sm" variant="outline" className="text-[#174880] border-[#174880]">
                              RESCHEDULE
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Available Slot</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Mascot decoration at bottom */}
        <div className="fixed bottom-8 right-8 pointer-events-none hidden lg:block">
          <img src={imgMascot3} alt="Mascot" className="w-32 h-32 object-contain opacity-50" />
        </div>
      </div>
    </DashboardLayout>
 );
}