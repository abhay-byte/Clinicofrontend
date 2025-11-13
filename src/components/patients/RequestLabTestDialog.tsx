import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Activity, Send, FileText } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface RequestLabTestDialogProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
  patientId: string;
}

const COMMON_TESTS = {
  blood: [
    { id: "cbc", name: "CBC (Complete Blood Count)", description: "Measures different components of blood" },
    { id: "bmp", name: "BMP (Basic Metabolic Panel)", description: "Measures glucose, calcium, electrolytes" },
    { id: "lipid", name: "Lipid Profile", description: "Cholesterol and triglycerides" },
    { id: "hba1c", name: "HbA1c", description: "Average blood sugar over 3 months" },
    { id: "thyroid", name: "Thyroid Function Test", description: "TSH, T3, T4 levels" },
    { id: "liver", name: "Liver Function Test", description: "AST, ALT, bilirubin" },
    { id: "kidney", name: "Kidney Function Test", description: "Creatinine, BUN, eGFR" },
  ],
  imaging: [
    { id: "xray-chest", name: "X-Ray (Chest)", description: "Chest radiograph" },
    { id: "xray-abdomen", name: "X-Ray (Abdomen)", description: "Abdominal radiograph" },
    { id: "ultrasound", name: "Ultrasound", description: "Abdominal/Pelvic ultrasound" },
    { id: "ct-scan", name: "CT Scan", description: "Computed tomography" },
    { id: "mri", name: "MRI", description: "Magnetic resonance imaging" },
  ],
  other: [
    { id: "urine", name: "Urine Analysis", description: "Complete urine examination" },
    { id: "stool", name: "Stool Examination", description: "Stool analysis" },
    { id: "ecg", name: "ECG", description: "Electrocardiogram" },
    { id: "echo", name: "Echocardiogram", description: "Cardiac ultrasound" },
  ],
};

export function RequestLabTestDialog({
  open,
  onClose,
  patientName,
  patientId,
}: RequestLabTestDialogProps) {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [customTest, setCustomTest] = useState("");
  const [urgency, setUrgency] = useState("routine");
  const [dueDate, setDueDate] = useState("");
  const [clinicalIndication, setClinicalIndication] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [activeCategory, setActiveCategory] = useState<"blood" | "imaging" | "other">("blood");

  const handleToggleTest = (testId: string) => {
    setSelectedTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  const handleAddCustomTest = () => {
    if (!customTest.trim()) {
      toast.error("Please enter a test name");
      return;
    }
    setSelectedTests([...selectedTests, `custom-${Date.now()}`]);
    toast.success(`Added: ${customTest}`);
    setCustomTest("");
  };

  const handleSendRequest = () => {
    if (selectedTests.length === 0) {
      toast.error("Please select at least one test");
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    toast.success(`Lab test request sent to ${patientName} successfully!`);
    
    // Reset and close
    setSelectedTests([]);
    setCustomTest("");
    setUrgency("routine");
    setDueDate("");
    setClinicalIndication("");
    setAdditionalNotes("");
    onClose();
  };

  const getSelectedTestNames = () => {
    const allTests = [...COMMON_TESTS.blood, ...COMMON_TESTS.imaging, ...COMMON_TESTS.other];
    return selectedTests
      .map((id) => {
        const test = allTests.find((t) => t.id === id);
        return test ? test.name : id.startsWith("custom-") ? customTest : "";
      })
      .filter(Boolean);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Request Lab Test</DialogTitle>
          <DialogDescription>
            Creating lab test request for {patientName} (ID: {patientId})
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Test Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Select Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Category Tabs */}
                  <div className="flex gap-2">
                    <Button
                      variant={activeCategory === "blood" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory("blood")}
                      className={activeCategory === "blood" ? "bg-[#174880]" : ""}
                    >
                      Blood Tests
                    </Button>
                    <Button
                      variant={activeCategory === "imaging" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory("imaging")}
                      className={activeCategory === "imaging" ? "bg-[#174880]" : ""}
                    >
                      Imaging
                    </Button>
                    <Button
                      variant={activeCategory === "other" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory("other")}
                      className={activeCategory === "other" ? "bg-[#174880]" : ""}
                    >
                      Other
                    </Button>
                  </div>

                  {/* Test List */}
                  <div className="space-y-2">
                    {COMMON_TESTS[activeCategory].map((test) => (
                      <div
                        key={test.id}
                        className="flex items-start space-x-3 rounded-lg border p-3 hover:bg-gray-50"
                      >
                        <Checkbox
                          id={test.id}
                          checked={selectedTests.includes(test.id)}
                          onCheckedChange={() => handleToggleTest(test.id)}
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={test.id}
                            className="cursor-pointer font-medium"
                          >
                            {test.name}
                          </Label>
                          <p className="text-xs text-gray-500">{test.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Test */}
                  <div className="space-y-2 border-t pt-4">
                    <Label>Add Custom Test</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter custom test name..."
                        value={customTest}
                        onChange={(e) => setCustomTest(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAddCustomTest();
                          }
                        }}
                      />
                      <Button onClick={handleAddCustomTest} variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Tests Summary */}
            {selectedTests.length > 0 && (
              <Card className="border-[#174880]/20">
                <CardHeader>
                  <CardTitle className="text-base">
                    Selected Tests ({selectedTests.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedTestNames().map((testName, index) => (
                      <Badge key={index} className="bg-[#174880]">
                        {testName}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Request Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency</Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger id="urgency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="stat">STAT (Immediate)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinicalIndication">Clinical Indication</Label>
                  <Textarea
                    id="clinicalIndication"
                    placeholder="e.g., Monitor treatment progress for hypertension..."
                    rows={3}
                    value={clinicalIndication}
                    onChange={(e) => setClinicalIndication(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Instructions</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="e.g., Fasting required, patient should arrive at 8 AM..."
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Patient Instructions Preview */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Patient Will Receive
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Tests Requested:</span>{" "}
                  {getSelectedTestNames().join(", ") || "None selected"}
                </p>
                <p>
                  <span className="font-medium">Priority:</span> {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                </p>
                <p>
                  <span className="font-medium">Complete By:</span> {dueDate || "Not specified"}
                </p>
                {clinicalIndication && (
                  <p>
                    <span className="font-medium">Reason:</span> {clinicalIndication}
                  </p>
                )}
                {additionalNotes && (
                  <p>
                    <span className="font-medium">Instructions:</span> {additionalNotes}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-[#174880]" 
            onClick={handleSendRequest}
            disabled={selectedTests.length === 0 || !dueDate}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Request to Patient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
