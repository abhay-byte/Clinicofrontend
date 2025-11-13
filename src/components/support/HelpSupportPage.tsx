import { useState } from "react";
import { DashboardLayout } from "../schedule/DashboardLayout";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardDescription } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Search,
  Smartphone,
  Stethoscope,
  Lock,
  Mail,
  Briefcase,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

interface HelpSupportPageProps {
  onNavigate: (page: string) => void;
}

type CategoryType = "all" | "patients" | "professionals" | "security";

interface FAQ {
  id: string;
  category: "patients" | "professionals" | "security";
  question: string;
  answer: string;
}

const FAQ_DATA: FAQ[] = [
  // For Patients
  {
    id: "p1",
    category: "patients",
    question: "How do I book my first appointment?",
    answer:
      'You can book an appointment in two ways: 1) Use the "Find a Doctor" feature on the Home screen to search for a specific type of doctor, or 2) Chat with our AI Care Companion, which will guide you to the right professional based on your symptoms.',
  },
  {
    id: "p2",
    category: "patients",
    question: "Is the AI Chat a real doctor?",
    answer:
      "No. The AI Care Companion is an advanced artificial intelligence designed to provide health information, help you understand your symptoms, and guide you to the right resources. It is not a substitute for professional medical advice, diagnosis, or treatment.",
  },
  {
    id: "p3",
    category: "patients",
    question: "How do I add a report to my Medical Vault?",
    answer:
      'From your Profile page, tap "Medical Vault." You can then select a category (e.g., "Lab Reports") and tap the "Upload Document" button. You can also upload a report that your doctor has requested from the "Appointments" page.',
  },
  {
    id: "p4",
    category: "patients",
    question: "Where can I find my prescription?",
    answer:
      'After your doctor completes a consultation and issues a prescription, it will automatically appear in the "Prescription List" section of your Profile page. You will also receive a notification.',
  },
  {
    id: "p5",
    category: "patients",
    question: "How do I cancel an appointment?",
    answer:
      'Go to your "Appointments" page, select the upcoming appointment you wish to cancel, and tap the "Cancel Appointment" button. Please note our cancellation policy.',
  },
  // For Professionals
  {
    id: "pr1",
    category: "professionals",
    question: "How do I sign up as a volunteer professional?",
    answer:
      'From our website, click the "For Professionals" link. You will be guided through a sign-up process where you\'ll provide your contact details and upload your medical credentials for verification.',
  },
  {
    id: "pr2",
    category: "professionals",
    question: "How long does the verification process take?",
    answer:
      "Our admin team reviews new applications typically within 3-5 business days. You will receive an email notification once your verification_status is updated to 'Verified'.",
  },
  {
    id: "pr3",
    category: "professionals",
    question: "How do I set my availability?",
    answer:
      'Log in to your Doctor Portal and go to the "My Schedule" page. From here, you can click on any day in the calendar to add new availability_slots for patients to book.',
  },
  {
    id: "pr4",
    category: "professionals",
    question: "What happens if I miss a scheduled consultation?",
    answer:
      "If you fail to join a live consultation, the appointment will be marked as 'Cancelled' by the system. The patient will be notified and asked to reschedule. Please manage your schedule carefully.",
  },
  // Account & Security
  {
    id: "s1",
    category: "security",
    question: "How do I reset my password?",
    answer:
      'On the Login page, click the "Forgot Password?" link. You will be asked to enter your registered email address to receive a password reset link.',
  },
  {
    id: "s2",
    category: "security",
    question: "Is my health data secure?",
    answer:
      "Yes. Data security is our highest priority. All your personal and medical data is encrypted both in transit and at rest. We comply with all relevant data protection regulations. You can read more in our Privacy Policy.",
  },
  {
    id: "s3",
    category: "security",
    question: "How do I delete my account?",
    answer:
      "In the app, go to Profile > Settings > Delete Account. Please be aware that this action is permanent and will securely erase your personal data in accordance with our data retention policy.",
  },
];

export function HelpSupportPage({ onNavigate }: HelpSupportPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  const filterFAQs = () => {
    let filtered = FAQ_DATA;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredFAQs = filterFAQs();

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  return (
    <DashboardLayout currentPage="help" onNavigate={onNavigate}>
      <div className="space-y-12 max-w-6xl mx-auto">
        {/* Component 1: Hero & Search Bar */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 text-center">
          <h1 className="text-[#174880] mb-3">How can we help?</h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Search our knowledge base for answers or get in touch with the Clinico support
            team.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="e.g., How do I reset my password?"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory("all");
              }}
              className="pl-12 pr-4 py-6 text-lg bg-white shadow-sm"
            />
          </div>

          {searchQuery && (
            <p className="mt-4 text-sm text-gray-600">
              Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} for "
              {searchQuery}"
            </p>
          )}
        </div>

        {/* Component 2: FAQ Categories */}
        {!searchQuery && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-[#174880] mb-2">Browse by Category</h2>
              <p className="text-gray-600">Choose a topic to find relevant help articles</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: For Patients */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg hover:border-[#174880] ${
                  selectedCategory === "patients"
                    ? "border-[#174880] shadow-md bg-blue-50"
                    : ""
                }`}
                onClick={() => handleCategoryClick("patients")}
              >
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Smartphone className="h-8 w-8 text-[#174880]" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-[#174880]">Using the Clinico App</h3>
                  <p className="text-sm text-gray-600">
                    Help with booking appointments, managing your medical vault, and using the
                    AI chat.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: For Professionals */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg hover:border-[#174880] ${
                  selectedCategory === "professionals"
                    ? "border-[#174880] shadow-md bg-blue-50"
                    : ""
                }`}
                onClick={() => handleCategoryClick("professionals")}
              >
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-purple-100 rounded-full">
                      <Stethoscope className="h-8 w-8 text-purple-700" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-[#174880]">Volunteer & Portal Guide</h3>
                  <p className="text-sm text-gray-600">
                    Help with the web portal, setting your schedule, the verification process,
                    and managing consultations.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Account & Security */}
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg hover:border-[#174880] ${
                  selectedCategory === "security"
                    ? "border-[#174880] shadow-md bg-blue-50"
                    : ""
                }`}
                onClick={() => handleCategoryClick("security")}
              >
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-green-100 rounded-full">
                      <Lock className="h-8 w-8 text-green-700" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-[#174880]">Account & Data Privacy</h3>
                  <p className="text-sm text-gray-600">
                    Questions about your password, account deletion, and how we protect your
                    health data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Component 3: FAQ List (Accordion) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[#174880]">
                {selectedCategory === "all" && !searchQuery && "Most Asked Questions"}
                {selectedCategory === "patients" && "For Patients"}
                {selectedCategory === "professionals" && "For Professionals"}
                {selectedCategory === "security" && "Account & Security"}
                {searchQuery && "Search Results"}
              </h2>
              {selectedCategory !== "all" && !searchQuery && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="text-sm text-[#174880] hover:underline mt-1"
                >
                  ← Back to all categories
                </button>
              )}
            </div>
          </div>

          {filteredFAQs.length > 0 ? (
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:text-[#174880]">
                        <span className="pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-gray-500">
                  No results found for "{searchQuery}". Try a different search term or browse
                  our categories above.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Component 4: "Still Can't Find an Answer?" (Contact Section) */}
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-[#174880] mb-2">Get in Touch</h2>
            <p className="text-gray-600">
              If you can't find your answer in the FAQ, our team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Card 1: General & Patient Support */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-[#174880]" />
                  </div>
                  <h3 className="text-[#174880]">Email Support</h3>
                </div>
                <CardDescription className="text-base">
                  For general inquiries or help with the patient app. We'll get back to you
                  within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:support@clinico.org"
                  className="text-[#174880] hover:underline inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  support@clinico.org
                </a>
              </CardContent>
            </Card>

            {/* Card 2: Professional & Partner Support */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-[#174880]">Partner Support</h3>
                </div>
                <CardDescription className="text-base">
                  For existing professionals, new volunteers, and NGO partners.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:partners@clinico.org"
                  className="text-[#174880] hover:underline inline-flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  partners@clinico.org
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Component 5: Social Media Links */}
        <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-[#174880] mb-2">Follow Us</h2>
            <p className="text-gray-600">
              Stay updated with our latest news, health tips, and success stories
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="https://twitter.com/clinico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Twitter className="h-6 w-6 text-[#1DA1F2]" />
            </a>
            <a
              href="https://facebook.com/clinico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Facebook className="h-6 w-6 text-[#4267B2]" />
            </a>
            <a
              href="https://instagram.com/clinico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors"
            >
              <Instagram className="h-6 w-6 text-[#E4405F]" />
            </a>
            <a
              href="https://linkedin.com/company/clinico"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Linkedin className="h-6 w-6 text-[#0A66C2]" />
            </a>
          </div>
        </div>

        {/* Footer: Legal Links */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-6 items-center">
                <button
                  onClick={() => onNavigate("terms")}
                  className="text-sm text-[#174880] hover:underline"
                >
                  Terms & Conditions
                </button>
                <span className="text-gray-400">•</span>
                <button
                  onClick={() => onNavigate("privacy")}
                  className="text-sm text-[#174880] hover:underline"
                >
                  Privacy Policy
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                © 2025 The Healing Hand Initiative. All rights reserved.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}