import { useState } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Bell, BellOff, Volume2, Mail, MessageSquare, Calendar, FileText, Megaphone } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface NotificationSettingsPageProps {
  onNavigate: (page: string) => void;
}

interface NotificationSettings {
  // Master toggle
  allNotificationsEnabled: boolean;

  // Channels
  browserPushEnabled: boolean;
  notificationSoundEnabled: boolean;
  emailAlertsEnabled: boolean;
  dailyDigestEnabled: boolean;

  // Topics - Appointments
  newAppointmentBooked: boolean;
  appointmentCancelled: boolean;
  appointmentStartingSoon: boolean;

  // Topics - Patient Activity
  newSecureMessage: boolean;
  reportSubmitted: boolean;
  newPatientReview: boolean;

  // Topics - Platform
  platformUpdates: boolean;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  allNotificationsEnabled: true,
  browserPushEnabled: true,
  notificationSoundEnabled: true,
  emailAlertsEnabled: true,
  dailyDigestEnabled: false,
  newAppointmentBooked: true,
  appointmentCancelled: true,
  appointmentStartingSoon: true,
  newSecureMessage: true,
  reportSubmitted: true,
  newPatientReview: false,
  platformUpdates: true,
};

export function NotificationSettingsPage({ onNavigate }: NotificationSettingsPageProps) {
  const [settings, setSettings] = useState<NotificationSettings>({ ...DEFAULT_SETTINGS });
  const [originalSettings, setOriginalSettings] = useState<NotificationSettings>({
    ...DEFAULT_SETTINGS,
  });
  const [hasChanges, setHasChanges] = useState(false);

  const handleToggle = (key: keyof NotificationSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleMasterToggle = () => {
    const newValue = !settings.allNotificationsEnabled;
    setSettings({ ...settings, allNotificationsEnabled: newValue });
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate saving to backend
    setOriginalSettings({ ...settings });
    setHasChanges(false);
    toast.success("Settings saved successfully!");
  };

  const handleCancel = () => {
    setSettings({ ...originalSettings });
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  const isDisabled = !settings.allNotificationsEnabled;

  return (
    <DashboardLayout currentPage="notifications" onNavigate={onNavigate}>
      <div className="space-y-6 max-w-4xl">
        {/* Component 1: Page Header */}
        <div>
          <h1 className="text-[#174880]">Notification Settings</h1>
          <p className="text-gray-600 mt-1">
            Choose how and when you want to be notified about platform and patient activity.
          </p>
        </div>

        {/* Component 2: Master Notification Toggle */}
        <Card className="border-2 border-[#174880]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {settings.allNotificationsEnabled ? (
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Bell className="h-6 w-6 text-[#174880]" />
                  </div>
                ) : (
                  <div className="p-3 bg-gray-100 rounded-full">
                    <BellOff className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <Label htmlFor="master-toggle" className="text-lg cursor-pointer">
                    Enable All Notifications
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    You can use this to quickly turn all notifications on or off.
                  </p>
                </div>
              </div>
              <Switch
                id="master-toggle"
                checked={settings.allNotificationsEnabled}
                onCheckedChange={handleMasterToggle}
              />
            </div>
          </CardContent>
        </Card>

        {/* Component 3: Notification Channels */}
        <Card>
          <CardHeader>
            <h2 className="text-[#174880]">How You Are Notified</h2>
            <CardDescription>
              Control which channels you receive notifications through
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subsection 1: Web Portal */}
            <div className="space-y-4">
              <h3 className="text-[#174880]">Web Portal</h3>

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="browser-push"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    In-Browser Push Notifications
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Receive real-time pop-up alerts in your browser, even when Clinico is
                    running in another tab.
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">
                    Note: This setting requires browser-level notification permissions.
                  </p>
                </div>
                <Switch
                  id="browser-push"
                  checked={settings.browserPushEnabled}
                  onCheckedChange={() => handleToggle("browserPushEnabled")}
                  disabled={isDisabled}
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 flex items-start gap-3">
                  <Volume2 className={`h-5 w-5 mt-0.5 ${isDisabled ? "text-gray-400" : "text-[#174880]"}`} />
                  <div>
                    <Label
                      htmlFor="notification-sound"
                      className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                    >
                      Play Notification Sound
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Play a brief sound when you receive a new notification while using the
                      portal.
                    </p>
                  </div>
                </div>
                <Switch
                  id="notification-sound"
                  checked={settings.notificationSoundEnabled}
                  onCheckedChange={() => handleToggle("notificationSoundEnabled")}
                  disabled={isDisabled}
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Subsection 2: Email */}
            <div className="space-y-4">
              <h3 className="text-[#174880]">Email</h3>

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 flex items-start gap-3">
                  <Mail className={`h-5 w-5 mt-0.5 ${isDisabled ? "text-gray-400" : "text-[#174880]"}`} />
                  <div>
                    <Label
                      htmlFor="email-alerts"
                      className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                    >
                      Email Alerts
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive an email for important, high-priority notifications (e.g., new
                      bookings, cancellations).
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-alerts"
                  checked={settings.emailAlertsEnabled}
                  onCheckedChange={() => handleToggle("emailAlertsEnabled")}
                  disabled={isDisabled}
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="daily-digest"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    Patient Activity Digest
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Receive a single daily summary email of all non-urgent activity (e.g., new
                    patient reviews, submitted reports).
                  </p>
                </div>
                <Switch
                  id="daily-digest"
                  checked={settings.dailyDigestEnabled}
                  onCheckedChange={() => handleToggle("dailyDigestEnabled")}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component 4: Notification Topics */}
        <Card>
          <CardHeader>
            <h2 className="text-[#174880]">Notify Me About...</h2>
            <CardDescription>
              Choose which events trigger notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subsection 1: Appointments */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className={`h-5 w-5 ${isDisabled ? "text-gray-400" : "text-[#174880]"}`} />
                <h3 className={isDisabled ? "text-gray-400" : "text-[#174880]"}>Appointments</h3>
              </div>

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="new-appointment"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    A New Appointment is Booked
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    When a patient books one of your available time slots.
                  </p>
                </div>
                <Switch
                  id="new-appointment"
                  checked={settings.newAppointmentBooked}
                  onCheckedChange={() => handleToggle("newAppointmentBooked")}
                  disabled={isDisabled}
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="appointment-cancelled"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    An Appointment is Cancelled
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    When a patient cancels an upcoming appointment.
                  </p>
                </div>
                <Switch
                  id="appointment-cancelled"
                  checked={settings.appointmentCancelled}
                  onCheckedChange={() => handleToggle("appointmentCancelled")}
                  disabled={isDisabled}
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="appointment-soon"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    Appointment Starting Soon
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    10 minutes before a virtual consultation is scheduled to begin.
                  </p>
                </div>
                <Switch
                  id="appointment-soon"
                  checked={settings.appointmentStartingSoon}
                  onCheckedChange={() => handleToggle("appointmentStartingSoon")}
                  disabled={isDisabled}
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Subsection 2: Patient Activity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className={`h-5 w-5 ${isDisabled ? "text-gray-400" : "text-[#174880]"}`} />
                <h3 className={isDisabled ? "text-gray-400" : "text-[#174880]"}>Patient Activity</h3>
              </div>

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="new-message"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    New Secure Message
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    When a patient sends you a new message in the secure chat.
                  </p>
                </div>
                <Switch
                  id="new-message"
                  checked={settings.newSecureMessage}
                  onCheckedChange={() => handleToggle("newSecureMessage")}
                  disabled={isDisabled}
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1 flex items-start gap-3">
                  <FileText className={`h-5 w-5 mt-0.5 ${isDisabled ? "text-gray-400" : "text-gray-600"}`} />
                  <div>
                    <Label
                      htmlFor="report-submitted"
                      className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                    >
                      Patient Submits a Requested Report
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      When a patient uploads files for a pending upload request.
                    </p>
                  </div>
                </div>
                <Switch
                  id="report-submitted"
                  checked={settings.reportSubmitted}
                  onCheckedChange={() => handleToggle("reportSubmitted")}
                  disabled={isDisabled}
                />
              </div>

              <Separator />

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="new-review"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    New Patient Review
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    When a patient leaves a new review after a consultation.
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">
                    Note: This is off by default as some doctors may find it "noisy."
                  </p>
                </div>
                <Switch
                  id="new-review"
                  checked={settings.newPatientReview}
                  onCheckedChange={() => handleToggle("newPatientReview")}
                  disabled={isDisabled}
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Subsection 3: Platform */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Megaphone className={`h-5 w-5 ${isDisabled ? "text-gray-400" : "text-[#174880]"}`} />
                <h3 className={isDisabled ? "text-gray-400" : "text-[#174880]"}>Platform</h3>
              </div>

              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <Label
                    htmlFor="platform-updates"
                    className={`cursor-pointer ${isDisabled ? "text-gray-400" : ""}`}
                  >
                    Platform News & Updates
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    Important announcements about new features or scheduled maintenance.
                  </p>
                </div>
                <Switch
                  id="platform-updates"
                  checked={settings.platformUpdates}
                  onCheckedChange={() => handleToggle("platformUpdates")}
                  disabled={isDisabled}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Component 5: Action Bar (Footer) */}
        <Card className={`sticky bottom-6 ${hasChanges ? "border-[#174880] shadow-lg" : ""}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                {hasChanges ? (
                  <p className="text-sm text-gray-600">
                    You have unsaved changes. Don't forget to save your settings.
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">All changes saved</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={!hasChanges}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="bg-[#174880]"
                >
                  Save Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
