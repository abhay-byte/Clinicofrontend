import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { FileText, Calendar, Mail, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import logoImage from "figma:asset/2bbc2e918e107ff5751157fff2999bfae1b6f3a5.png";
import mascotImage from "figma:asset/97b4b947fb77957c83b03393eae4d03607160190.png";

interface TermsConditionsPageProps {
  onNavigate: (page: string) => void;
}

export function TermsConditionsPage({ onNavigate }: TermsConditionsPageProps) {
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
              <FileText className="h-8 w-8 text-[#174880]" />
            </div>
            <div>
              <h1 className="text-[#174880]">Terms & Conditions of Service</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: November 13, 2025</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Please read these Terms & Conditions ("Terms") carefully before using the Clinico
            mobile application or website (the "Services") operated by "The Healing Hand
            Initiative" ("us," "we," or "our").
          </p>
          <Card className="border-l-4 border-l-[#174880] bg-blue-50">
            <CardContent className="pt-4">
              <p>
                <strong>Your access to and use of the Service is conditioned on your acceptance of
                and compliance with these Terms.</strong> These Terms apply to all visitors, users,
                Patients, and Professionals.
              </p>
              <p className="mt-2">
                By accessing or using the Service, you agree to be bound by these Terms.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardContent className="pt-6 space-y-8">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">1. Description of Service</h2>
              <p className="text-gray-700">
                Clinico is a technology platform that connects users ("Patients") with volunteer
                and registered healthcare professionals ("Professionals") to facilitate
                telemedicine consultations and provide health-related information.
              </p>
              <Card className="border-2 border-amber-500 bg-amber-50">
                <CardContent className="pt-4">
                  <p>
                    <strong>IMPORTANT:</strong> Clinico is NOT a healthcare provider, hospital, or
                    emergency service. We are the technology platform that facilitates
                    communication. The Professionals are independent providers who are solely
                    responsible for the medical advice and care they provide to you.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">2. The AI Care Companion</h2>
              <p className="text-gray-700">
                Our AI Care Companion is an informational tool, not a medical professional.
              </p>
              <Card className="border-2 border-red-500 bg-red-50">
                <CardContent className="pt-4 space-y-2">
                  <p>
                    <strong>
                      YOU ACKNOWLEDGE AND AGREE THAT THE AI CARE COMPANION IS NOT A SUBSTITUTE FOR
                      PROFESSIONAL MEDICAL ADVICE, DIAGNOSIS, OR TREATMENT.
                    </strong>
                  </p>
                </CardContent>
              </Card>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>It is intended for informational and triage purposes only.</li>
                <li>It does not create a doctor-patient relationship.</li>
                <li>
                  Never disregard professional medical advice or delay in seeking it because of
                  something you have read or heard on the AI chat.
                </li>
                <li>
                  In case of a medical emergency, call your local emergency services immediately.
                </li>
              </ul>
            </section>

            <Separator />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">3. User Accounts & Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-[#174880]">Eligibility</h3>
                  <p className="text-gray-700">You must be 18 years or older to create an account.</p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Account Security</h3>
                  <p className="text-gray-700">
                    You are responsible for safeguarding your password and for all activities that
                    occur under your account. You must notify us immediately of any breach of
                    security.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Accurate Information</h3>
                  <p className="text-gray-700">
                    You agree to provide true, accurate, and complete information.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
                    <li>
                      <strong>Patients:</strong> You must provide accurate health information (e.g.,
                      known allergies, chronic conditions) for your own safety.
                    </li>
                    <li>
                      <strong>Professionals:</strong> You warrant that all information you provide,
                      including your credentials, specialty, and verification status information, is
                      true and up-to-date.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">4. For Patients: Specific Terms</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-[#174880]">Consultations</h3>
                  <p className="text-gray-700">
                    You understand that your consultation is with an independent Professional, not
                    with Clinico.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Medical Vault</h3>
                  <p className="text-gray-700">
                    You are solely responsible for the documents you upload.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Medication Reminders</h3>
                  <p className="text-gray-700">
                    This feature is a convenience tool. You are solely responsible for managing your
                    medications and checking the prescriptions from your doctor. Clinico is not
                    liable for any missed doses logged in the reminder logs.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">User Content</h3>
                  <p className="text-gray-700">
                    You are responsible for any content you post, including reviews and journal
                    entries.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">5. For Professionals: Specific Terms</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-[#174880]">Verification</h3>
                  <p className="text-gray-700">
                    You agree to our verification process and understand that your verification
                    status ('Verified') can be revoked if you provide false information or violate
                    these Terms.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Volunteer Status</h3>
                  <p className="text-gray-700">
                    If you are registered as a volunteer, you agree to provide services without
                    expectation of payment from Clinico.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Professional Responsibility</h3>
                  <p className="text-gray-700">
                    You are solely responsible for the quality and accuracy of the medical advice,
                    diagnosis, and prescriptions you provide to Patients. You agree to maintain all
                    necessary licenses and adhere to all relevant telemedicine guidelines (e.g.,
                    Telemedicine Practice Guidelines, Govt. of India).
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">6. Prohibited Conduct</h2>
              <p className="text-gray-700">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Post any abusive, defamatory, or obscene content.</li>
                <li>Impersonate any person or entity.</li>
                <li>Violate any applicable local, state, national, or international law.</li>
                <li>Reverse-engineer or attempt to harm the application's infrastructure.</li>
              </ul>
            </section>

            <Separator />

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">7. Termination of Service</h2>
              <p className="text-gray-700">
                We may terminate or suspend your account immediately, without prior notice or
                liability, for any reason whatsoever, including if you breach these Terms.
              </p>
              <p className="text-gray-700">
                If you are a Patient, you may delete your account at any time from the Settings menu
                in the app.
              </p>
            </section>

            <Separator />

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">8. Disclaimers and Limitation of Liability</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-[#174880]">Service Provided "AS-IS"</h3>
                  <p className="text-gray-700">
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis, without
                    warranties of any kind.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">No Warranty on Professional Advice</h3>
                  <p className="text-gray-700">
                    Clinico does not endorse and is not responsible for the advice, diagnosis, or
                    treatment provided by any Professional on the platform. Any reviews or ratings
                    are the opinions of other users and not an endorsement by Clinico.
                  </p>
                </div>
                <div>
                  <h3 className="text-[#174880]">Limitation of Liability</h3>
                  <p className="text-gray-700">
                    In no event shall Clinico, its directors, or its employees be liable for any
                    indirect, incidental, or consequential damages (including, but not limited to,
                    damages from medical malpractice or faulty advice from a Professional) arising
                    out of or in connection with your use of the Service.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">9. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed in accordance with the laws of India, without regard
                to its conflict of law provisions. Our failure to enforce any right or provision of
                these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <Separator />

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">10. Changes to These Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. We will provide
                at least 30 days' notice of any significant changes, likely via an in-app
                notification.
              </p>
            </section>

            <Separator />

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="text-[#174880]">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at:
              </p>
              <Card className="bg-blue-50 border-[#174880]">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#174880]" />
                    <a href="mailto:legal@clinico.org" className="text-[#174880] hover:underline">
                      legal@clinico.org
                    </a>
                  </div>
                </CardContent>
              </Card>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}