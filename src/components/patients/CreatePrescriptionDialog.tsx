import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Trash2, Save, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface Medication {
  id: string;
  name: string;
  category: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface CreatePrescriptionDialogProps {
  open: boolean;
  onClose: () => void;
  patientName: string;
  patientId: string;
}

export function CreatePrescriptionDialog({
  open,
  onClose,
  patientName,
  patientId,
}: CreatePrescriptionDialogProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [currentMedication, setCurrentMedication] = useState({
    name: "",
    category: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });
  const [prescriptionNotes, setPrescriptionNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  const handleAddMedication = () => {
    if (!currentMedication.name || !currentMedication.dosage) {
      toast.error("Please fill in at least medication name and dosage");
      return;
    }

    const newMedication: Medication = {
      id: Date.now().toString(),
      ...currentMedication,
    };

    setMedications([...medications, newMedication]);
    setCurrentMedication({
      name: "",
      category: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
    toast.success("Medication added to prescription");
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  const handleSaveDraft = () => {
    toast.success("Prescription draft saved successfully");
    // In production: save to database
  };

  const handleSendPrescription = () => {
    if (medications.length === 0) {
      toast.error("Please add at least one medication");
      return;
    }

    toast.success(`Prescription sent to ${patientName} successfully!`);
    // In production: send to patient via notification/email
    
    // Reset and close
    setMedications([]);
    setCurrentMedication({
      name: "",
      category: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });
    setPrescriptionNotes("");
    setFollowUpDate("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Prescription</DialogTitle>
          <DialogDescription>
            Creating prescription for {patientName} (ID: {patientId})
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Add Medication Form */}
            <Card className="border-[#174880]/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Add Medication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="medName">Medication Name *</Label>
                    <Input
                      id="medName"
                      placeholder="e.g., Amoxicillin"
                      value={currentMedication.name}
                      onChange={(e) =>
                        setCurrentMedication({ ...currentMedication, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medCategory">Category</Label>
                    <Select
                      value={currentMedication.category}
                      onValueChange={(value) =>
                        setCurrentMedication({ ...currentMedication, category: value })
                      }
                    >
                      <SelectTrigger id="medCategory">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="antibiotic">Antibiotic</SelectItem>
                        <SelectItem value="analgesic">Analgesic</SelectItem>
                        <SelectItem value="antipyretic">Antipyretic</SelectItem>
                        <SelectItem value="antacid">Antacid</SelectItem>
                        <SelectItem value="antihistamine">Antihistamine</SelectItem>
                        <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage *</Label>
                    <Input
                      id="dosage"
                      placeholder="e.g., 500mg"
                      value={currentMedication.dosage}
                      onChange={(e) =>
                        setCurrentMedication({ ...currentMedication, dosage: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      placeholder="e.g., 3 times/day"
                      value={currentMedication.frequency}
                      onChange={(e) =>
                        setCurrentMedication({ ...currentMedication, frequency: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 5 days"
                      value={currentMedication.duration}
                      onChange={(e) =>
                        setCurrentMedication({ ...currentMedication, duration: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Input
                    id="instructions"
                    placeholder="e.g., Take after meals"
                    value={currentMedication.instructions}
                    onChange={(e) =>
                      setCurrentMedication({ ...currentMedication, instructions: e.target.value })
                    }
                  />
                </div>

                <Button
                  onClick={handleAddMedication}
                  className="w-full bg-[#174880]"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medication to Prescription
                </Button>
              </CardContent>
            </Card>

            {/* Current Prescription List */}
            {medications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Current Prescription ({medications.length} medication{medications.length !== 1 ? "s" : ""})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {medications.map((med, index) => (
                      <Card key={med.id} className="border-l-4 border-l-[#174880]">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium">
                                  {index + 1}. {med.name}
                                </p>
                                {med.category && (
                                  <Badge variant="outline" className="text-xs">
                                    {med.category}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {med.dosage}
                                {med.frequency && ` • ${med.frequency}`}
                                {med.duration && ` • ${med.duration}`}
                              </p>
                              {med.instructions && (
                                <p className="text-xs text-gray-500">
                                  Instructions: {med.instructions}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveMedication(med.id)}
                              className="h-8 w-8 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prescriptionNotes">Important Notes</Label>
                  <Textarea
                    id="prescriptionNotes"
                    placeholder="e.g., Complete the full course of antibiotics, avoid alcohol..."
                    rows={3}
                    value={prescriptionNotes}
                    onChange={(e) => setPrescriptionNotes(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followUpDate">Follow-up Date (Optional)</Label>
                  <Input
                    id="followUpDate"
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveDraft} disabled={medications.length === 0}>
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button 
            className="bg-[#174880]" 
            onClick={handleSendPrescription}
            disabled={medications.length === 0}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Prescription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
