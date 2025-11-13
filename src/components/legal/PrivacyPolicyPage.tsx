import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { Shield, Calendar, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import logoImage from "figma:asset/2bbc2e918e107ff5751157fff2999bfae1b6f3a5.png";
import mascotImage from "figma:asset/97b4b947fb77957c83b03393eae4d03607160190.png";

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#EBF1FA]">
      {/* Standalone Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => onNavigate("help")}
              className="text-[#174880]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Clinico Logo" className="h-10 w-10" />
              <span className="text-xl font-semibold text-[#174880]">Clinico</span>
            </div>
          </div>
          <img src={mascotImage} alt="Clinico Mascot" className="h-16 w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="h-8 w-8 text-[#174880]" />
            </div>
            <div>
              <h1 className="text-[#174880]">Privacy Policy</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: November 13, 2025</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            At Clinico, operated by "The Healing Hand Initiative," we are committed to protecting
            your privacy and ensuring the security of your personal and health information. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you use our platform.
          </p>
          <Card className="border-l-4 border-l-[#174880] bg-blue-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-[#174880] mt-0.5" />
                <p>
                  <strong>Your privacy is important to us.</strong> By using Clinico, you consent
                  to the data practices described in this policy. Please read this Privacy Policy
                  carefully.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardContent className="pt-6 space-y-8">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">1. Information We Collect</h2>
              <p className="text-gray-700">
                We collect different types of information to provide and improve our services:
              </p>

              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-[#174880]">1.1 Personal Information</h3>
                  <p className="text-gray-700">
                    When you create an account, we collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li>Full name, email address, phone number</li>
                    <li>Date of birth, gender, profile photo</li>
                    <li>Professional credentials (for healthcare professionals)</li>
                    <li>Government-issued ID for verification purposes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#174880]">1.2 Health Information (Protected Health Information - PHI)</h3>
                  <p className="text-gray-700">For patients, we collect:</p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li>Medical history, known allergies, chronic conditions</li>
                    <li>Current medications and prescriptions</li>
                    <li>Medical records and documents you upload to your Medical Vault</li>
                    <li>Consultation notes, lab results, and diagnostic reports</li>
                    <li>Health journal entries and symptom logs</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#174880]">1.3 Usage and Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Device information (device type, operating system, unique device identifiers)</li>
                    <li>IP address, browser type, and version</li>
                    <li>Pages visited, time spent, and interaction data</li>
                    <li>Geolocation data (with your permission)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#174880]">1.4 Communication Data</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Secure messages between you and healthcare professionals</li>
                    <li>AI Care Companion chat history</li>
                    <li>Video/audio consultation recordings (only with explicit consent)</li>
                    <li>Customer support communications</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">2. How We Use Your Information</h2>
              <p className="text-gray-700">We use the collected information for:</p>

              <div className="space-y-3 mt-3">
                <div>
                  <h3 className="text-[#174880]">2.1 Providing Services</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Facilitating telemedicine consultations between patients and professionals</li>
                    <li>Managing appointment scheduling and reminders</li>
                    <li>Processing prescriptions and lab test requests</li>
                    <li>Storing and organizing your medical records securely</li>
                    <li>Providing medication reminders and health tracking features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#174880]">2.2 Improving Our Platform</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Analyzing usage patterns to enhance user experience</li>
                    <li>Training and improving our AI Care Companion</li>
                    <li>Conducting research and analytics (using anonymized data)</li>
                    <li>Testing new features and functionality</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#174880]">2.3 Communication and Support</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Sending appointment confirmations and reminders</li>
                    <li>Notifying you about platform updates and important announcements</li>
                    <li>Responding to your inquiries and providing customer support</li>
                    <li>Sending administrative messages related to your account</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-[#174880]">2.4 Legal and Safety</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    <li>Complying with legal obligations and regulations</li>
                    <li>Protecting against fraud, abuse, and security threats</li>
                    <li>Enforcing our Terms & Conditions</li>
                    <li>Resolving disputes and troubleshooting problems</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">3. How We Share Your Information</h2>
              <Card className="border-2 border-[#174880] bg-blue-50">
                <CardContent className="pt-4">
                  <p>
                    <strong>We DO NOT sell your personal or health information to third parties.</strong>
                  </p>
                </CardContent>
              </Card>

              <p className="text-gray-700 mt-3">We may share your information only in these limited circumstances:</p>

              <div className="space-y-3 mt-3">
                <div>
                  <h3 className="text-[#174880]">3.1 With Healthcare Professionals</h3>
                  <p className="text-gray-700">
                    When you book a consultation, your health information is shared with the assigned
                    healthcare professional to provide you with medical care.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">3.2 With Service Providers</h3>
                  <p className="text-gray-700">
                    We work with trusted third-party service providers who assist us with:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                    <li>Cloud storage and hosting services</li>
                    <li>Payment processing (if applicable)</li>
                    <li>Analytics and performance monitoring</li>
                    <li>Email and notification delivery</li>
                  </ul>
                  <p className="text-gray-700 mt-2">
                    These providers are contractually obligated to protect your information and use it
                    only for specified purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">3.3 For Legal Compliance</h3>
                  <p className="text-gray-700">
                    We may disclose information when required by law, court order, or government
                    regulation, or when necessary to protect the rights, safety, and security of
                    Clinico, our users, or the public.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">3.4 With Your Consent</h3>
                  <p className="text-gray-700">
                    We may share your information for purposes not described in this policy with your
                    explicit consent.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">4. Data Security</h2>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                <li>
                  <strong>Encryption:</strong> All data is encrypted in transit (using SSL/TLS) and at
                  rest using AES-256 encryption.
                </li>
                <li>
                  <strong>Access Controls:</strong> Only authorized personnel have access to personal
                  and health information on a need-to-know basis.
                </li>
                <li>
                  <strong>Secure Authentication:</strong> Passwords are hashed using bcrypt, and we
                  support multi-factor authentication.
                </li>
                <li>
                  <strong>Regular Audits:</strong> We conduct regular security audits and vulnerability
                  assessments.
                </li>
                <li>
                  <strong>Secure Infrastructure:</strong> Our platform is hosted on secure,
                  HIPAA-compliant cloud infrastructure.
                </li>
              </ul>
              <Card className="border-amber-500 bg-amber-50 mt-3">
                <CardContent className="pt-4">
                  <p className="text-sm">
                    <strong>Note:</strong> While we implement strong security measures, no system is
                    100% secure. You are responsible for maintaining the confidentiality of your
                    account credentials.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">5. Data Retention</h2>
              <p className="text-gray-700">
                We retain your information for as long as necessary to provide our services and comply
                with legal obligations:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
                <li>
                  <strong>Active Accounts:</strong> Information is retained while your account is
                  active.
                </li>
                <li>
                  <strong>Medical Records:</strong> Health information is retained for a minimum of 7
                  years as per medical record retention requirements in India.
                </li>
                <li>
                  <strong>Deleted Accounts:</strong> When you delete your account, most personal
                  information is deleted within 30 days, except where retention is required by law.
                </li>
                <li>
                  <strong>Anonymous Data:</strong> Aggregated, anonymized data may be retained
                  indefinitely for research and analytics.
                </li>
              </ul>
            </section>

            <Separator />

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">6. Your Rights and Choices</h2>
              <p className="text-gray-700">You have the following rights regarding your information:</p>

              <div className="space-y-3 mt-3">
                <div>
                  <h3 className="text-[#174880]">6.1 Access and Update</h3>
                  <p className="text-gray-700">
                    You can access and update your personal information at any time through your
                    account settings or My Profile page.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">6.2 Data Portability</h3>
                  <p className="text-gray-700">
                    You can request a copy of your health records and personal data in a
                    machine-readable format.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">6.3 Delete Your Account</h3>
                  <p className="text-gray-700">
                    You can request account deletion at any time. Note that some information may be
                    retained as required by law.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">6.4 Notification Preferences</h3>
                  <p className="text-gray-700">
                    You can manage your notification settings through the Notification Settings page.
                  </p>
                </div>

                <div>
                  <h3 className="text-[#174880]">6.5 Opt-Out of Analytics</h3>
                  <p className="text-gray-700">
                    You can opt out of analytics tracking through your privacy settings.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">7. Children's Privacy</h2>
              <p className="text-gray-700">
                Clinico is not intended for use by individuals under the age of 18. We do not
                knowingly collect personal information from children. If you believe a child has
                provided us with personal information, please contact us immediately at{" "}
                <a href="mailto:privacy@clinico.org" className="text-[#174880] hover:underline">
                  privacy@clinico.org
                </a>
                .
              </p>
            </section>

            <Separator />

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">8. Third-Party Links</h2>
              <p className="text-gray-700">
                Our platform may contain links to third-party websites or services. We are not
                responsible for the privacy practices of these third parties. We encourage you to read
                their privacy policies.
              </p>
            </section>

            <Separator />

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">9. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your
                country of residence. We ensure appropriate safeguards are in place to protect your
                information in accordance with this Privacy Policy.
              </p>
            </section>

            <Separator />

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes via email or through an in-app notification at least 30 days
                before the changes take effect. Your continued use of Clinico after changes are made
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <Separator />

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions, concerns, or requests regarding this Privacy Policy or your
                personal information, please contact us:
              </p>
              <Card className="bg-blue-50 border-[#174880] mt-3">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#174880]" />
                    <div>
                      <p className="text-sm text-gray-600">Privacy Inquiries:</p>
                      <a
                        href="mailto:privacy@clinico.org"
                        className="text-[#174880] hover:underline"
                      >
                        privacy@clinico.org
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#174880]" />
                    <div>
                      <p className="text-sm text-gray-600">Data Protection Officer:</p>
                      <a href="mailto:dpo@clinico.org" className="text-[#174880] hover:underline">
                        dpo@clinico.org
                      </a>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-600">Mailing Address:</p>
                    <p className="text-gray-700">
                      The Healing Hand Initiative
                      <br />
                      Data Protection Office
                      <br />
                      [Address Line 1]
                      <br />
                      [City, State, PIN Code]
                      <br />
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Acknowledgment */}
            <Card className="border-2 border-[#174880] bg-blue-50 mt-6">
              <CardContent className="pt-4">
                <p className="text-sm">
                  <strong>Acknowledgment:</strong> By using Clinico, you acknowledge that you have
                  read, understood, and agree to be bound by this Privacy Policy and our Terms &
                  Conditions of Service.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}