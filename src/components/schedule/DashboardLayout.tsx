import { Menu, Bell, MessageSquare, ChevronRight, Calendar, Users, User, HelpCircle, LogOut, Settings, FileText, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import imgLogo from "figma:asset/2bbc2e918e107ff5751157fff2999bfae1b6f3a5.png";
import imgDoctor from "figma:asset/e0be30dc4623008900b621d96ad20f3641641248.png";
import imgFlag from "figma:asset/a20849bc7d74cff1123dc2ec5b811e9c7195e658.png";
import svgPaths from "../../imports/svg-30312lo6h9";
import topBarSvgPaths from "../../imports/svg-iaozp19azm";
import { ReactNode, useState } from "react";
import { Separator } from "../ui/separator";
import { LogoutDialog } from "../auth/LogoutDialog";
import { useAuth } from "../../contexts/AuthContext";
import { doctorStorageService } from "../../services/doctor-storage.service";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onNavigate: (path: string, id?: string) => void;
  currentPage?: "dashboard" | "schedule" | "appointments" | "consultation" | "patients" | "patient-details" | "report-requests" | "messages" | "profile" | "help" | "notifications" | "terms" | "privacy";
  hideNavigation?: boolean;
}

export function DashboardLayout({ children, onNavigate, currentPage = "dashboard", hideNavigation = false }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { logout } = useAuth();
  
  // Get doctor profile data from storage
  const doctorProfile = doctorStorageService.getDoctorProfile();
  const doctorName = doctorProfile?.full_name || 'Doctor';
  const doctorSpecialty = doctorProfile?.specialty || 'Specialist';
  
  // Get appointment data for dynamic counts
  const appointments = doctorStorageService.getDoctorAppointments();
  const dashboardStats = doctorStorageService.getDoctorDashboardStats();
  
  // Calculate appointment counts
  const todayAppointmentsCount = doctorProfile?.today_appointments ||
                                (dashboardStats ? dashboardStats.appointments_today_count : 0) ||
                                appointments.filter((apt: any) => {
                                  const today = new Date();
                                  const aptDate = new Date(apt.appointment_time);
                                  return aptDate.toDateString() === today.toDateString() &&
                                         apt.status === 'Scheduled';
                                }).length;
  
  // Calculate message counts based on appointments that allow messaging
  const messageCount = appointments.filter((apt: any) => {
    return apt.status === 'Scheduled' || apt.status === 'Completed';
  }).length;

  const handleNavigation = (path: string) => {
    onNavigate(path);
  };

  const handleLogout = async () => {
    try {
      // Use the auth context to logout the user
      await logout();
      
      // Close the dialog
      setLogoutDialogOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (hideNavigation) {
    // When in call mode, render without sidebar and header
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#EBF1FA" }}>
        <div className="p-6">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EBF1FA", fontFamily: "Roboto, sans-serif" }}>
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40" style={{ backgroundColor: "#174880" }}>
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Company Brand - Hidden when sidebar closes */}
            {sidebarOpen && (
              <>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full bg-white flex items-center justify-center cursor-pointer"
                      onClick={() => onNavigate("/")}
                    >
                      <img src={imgLogo} alt="Clinico Logo" className="w-12 h-12 object-contain" />
                    </div>
                  </div>
                  <div
                    className="text-white cursor-pointer"
                    onClick={() => onNavigate("/")}
                  >
                    <div className="text-xl" style={{ fontWeight: 600, letterSpacing: "0.5px" }}>CLINICO</div>
                    <div className="text-xs opacity-90">The Healing Hand Initiative</div>
                  </div>
                </div>
                {/* Vertical Separator */}
                <div className="h-10 w-px bg-white/30"></div>
              </>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <Input placeholder="Search..." className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector with Flag */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
              <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                <img src={imgFlag} alt="Language" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm text-white">English</span>
            </button>
            
            {/* Notification Bell with Badge */}
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 h-10 w-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={topBarSvgPaths.p1e17c7c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={topBarSvgPaths.p4aa2980} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white" style={{ fontSize: '10px' }}>
                {dashboardStats?.pending_reports_count || 0}
              </span>
            </Button>
            
            {/* Messages with Badge */}
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 h-10 w-10">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d={topBarSvgPaths.p10fa180} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={topBarSvgPaths.pb1ea600} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white" style={{ fontSize: '10px' }}>
                {messageCount}
              </span>
            </Button>
            
            {/* Doctor Profile */}
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm text-white">Dr. {doctorName}</span>
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-white/30">
                <img src={imgDoctor} alt="Doctor" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`bg-white min-h-screen space-y-4 transition-all duration-300 overflow-hidden ${
            sidebarOpen ? "w-64 p-4" : "w-0"
          }`}
        >
          {sidebarOpen && (
            <>
              {/* Doctor Profile Section */}
              <div className="flex flex-col items-center py-4 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-teal-400 mb-3">
                  <img src={imgDoctor} alt="Doctor Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <p className="text-sm" style={{ color: "#174880" }}>Dr. {doctorName}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{doctorSpecialty}</p>
                  <button
                    className="mt-2 text-xs hover:underline"
                    style={{ color: "#174880" }}
                    onClick={() => onNavigate("/profile")}
                  >
                    View/Edit Profile
                  </button>
                </div>
              </div>

              {/* Main Navigation */}
              <div className="space-y-1">
                <p className="px-4 pt-2 pb-1 text-xs text-gray-50 uppercase tracking-wider">Main Navigation</p>
                <SidebarItem 
                  icon={<DashboardIcon />} 
                  label="Dashboard" 
                  active={currentPage === "dashboard"}
                  onClick={() => handleNavigation("/dashboard")}
                />
                <SidebarItem
                  icon={<ScheduleIcon />}
                  label="My Schedule"
                  active={currentPage === "schedule"}
                  badge={todayAppointmentsCount.toString()}
                  onClick={() => handleNavigation("/schedule")}
                />
                <SidebarItem 
                  icon={<AppointmentsIcon />} 
                  label="Appointments" 
                  active={currentPage === "appointments"}
                  onClick={() => handleNavigation("/appointments")}
                />
                <SidebarItem 
                  icon={<PatientsIcon />} 
                  label="Patient Directory" 
                  active={currentPage === "patients" || currentPage === "patient-details"}
                  onClick={() => handleNavigation("/patients")}
                />
                <SidebarItem
                  icon={<Mail className="h-4 w-4" />}
                  label="Messages"
                  active={currentPage === "messages"}
                  badge={messageCount.toString()}
                  onClick={() => handleNavigation("/messages")}
                />
                <SidebarItem 
                  icon={<FileText className="h-4 w-4" />} 
                  label="Report Requests" 
                  active={currentPage === "report-requests"}
                  onClick={() => handleNavigation("/report-requests")}
                />
              </div>

              <Separator className="my-2" />

              {/* Support & Settings */}
              <div className="space-y-1">
                <p className="px-4 pt-2 pb-1 text-xs text-gray-500 uppercase tracking-wider">Support & Settings</p>
                <SidebarItem 
                  icon={<ProfileIcon />} 
                  label="My Profile" 
                  active={currentPage === "profile"}
                  onClick={() => handleNavigation("/profile")}
                />
                <SidebarItem 
                  icon={<Settings className="h-4 w-4" />} 
                  label="Notification Settings" 
                  active={currentPage === "notifications"}
                  onClick={() => handleNavigation("/notifications")}
                />
                <SidebarItem 
                  icon={<HelpIcon />} 
                  label="Help & Support" 
                  active={currentPage === "help"}
                  onClick={() => handleNavigation("/help")}
                />
              </div>

              <Separator className="my-2" />

              {/* Logout */}
              <div className="space-y-1">
                <SidebarItem 
                  icon={<LogOut className="h-4 w-4" />} 
                  label="Logout" 
                  active={false}
                  onClick={() => setLogoutDialogOpen(true)}
                />
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300`}>
          {children}
        </main>
      </div>

      {/* Logout Dialog */}
      <LogoutDialog 
        open={logoutDialogOpen} 
        onOpenChange={setLogoutDialogOpen} 
        onConfirmLogout={handleLogout}
      />
    </div>
  );
}

interface SidebarItemProps {
  icon: ReactNode;
 label: string;
 active?: boolean;
 badge?: string;
 onClick?: () => void;
}

function SidebarItem({ icon, label, active, badge, onClick }: SidebarItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
        active 
          ? "text-white" 
          : "text-gray-700 hover:bg-gray-50"
      }`}
      style={active ? { backgroundColor: "#174880" } : {}}
      onClick={onClick}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span 
          className="px-2 py-0.5 rounded-full text-xs text-white"
          style={{ backgroundColor: "#FF6E6E" }}
        >
          {badge}
        </span>
      )}
      {active && <ChevronRight className="h-4 w-4" />}
    </button>
  );
}

// Icon Components using the imported SVG paths
function DashboardIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d={svgPaths.p1af6a300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p23ad5500} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
    </svg>
  );
}

function ScheduleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d={svgPaths.p1e3d0680} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.pa86ad80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
    </svg>
  );
}

function AppointmentsIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d={svgPaths.p36659390} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p3a896d00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
    </svg>
  );
}

function PatientsIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d={svgPaths.p2a8dcb00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p2ec70180} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d={svgPaths.p28018600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p8f9d130} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p3cc98f00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p30dc5600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d={svgPaths.padbbe00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d={svgPaths.p293fa600} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d="M6.375 6.375H6.38208" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
      <path d="M10.625 6.375H10.6321" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
    </svg>
  );
}