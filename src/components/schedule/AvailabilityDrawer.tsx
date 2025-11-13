import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface AvailabilityDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSlot: (slot: any) => void;
  onAddRecurring: (template: any) => void;
}

export function AvailabilityDrawer({ open, onOpenChange, onAddSlot, onAddRecurring }: AvailabilityDrawerProps) {
  const [singleDate, setSingleDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [recurringStartTime, setRecurringStartTime] = useState("");
  const [recurringEndTime, setRecurringEndTime] = useState("");
  const [slotDuration, setSlotDuration] = useState("30");
  const [applyFrom, setApplyFrom] = useState<Date>();
  const [applyUntil, setApplyUntil] = useState<Date>();

  const daysOfWeek = [
    { label: "Mon", value: "monday" },
    { label: "Tue", value: "tuesday" },
    { label: "Wed", value: "wednesday" },
    { label: "Thu", value: "thursday" },
    { label: "Fri", value: "friday" },
    { label: "Sat", value: "saturday" },
    { label: "Sun", value: "sunday" },
  ];

  const handleAddSingleSlot = () => {
    if (singleDate && startTime && endTime) {
      onAddSlot({
        date: singleDate,
        startTime,
        endTime,
      });
      // Reset form
      setSingleDate(undefined);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleGenerateRecurring = () => {
    if (selectedDays.length > 0 && recurringStartTime && recurringEndTime && applyFrom && applyUntil) {
      onAddRecurring({
        days: selectedDays,
        startTime: recurringStartTime,
        endTime: recurringEndTime,
        slotDuration: parseInt(slotDuration),
        applyFrom,
        applyUntil,
      });
      // Reset form
      setSelectedDays([]);
      setRecurringStartTime("");
      setRecurringEndTime("");
      setSlotDuration("30");
      setApplyFrom(undefined);
      setApplyUntil(undefined);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[500px] overflow-y-auto">
        <SheetHeader className="pb-6 border-b px-6 pt-6">
          <SheetTitle style={{ color: "#174880", fontSize: "18px" }}>Manage Availability</SheetTitle>
          <SheetDescription className="text-gray-600">
            Set your working hours and create availability slots for patients to book appointments.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="single" className="mt-6 px-6 pb-6">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="single">Add Single Slot</TabsTrigger>
            <TabsTrigger value="recurring">Set Recurring Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6 mt-4 px-1">
            <div className="space-y-2">
              <Label className="text-sm">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {singleDate ? format(singleDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={singleDate}
                    onSelect={setSingleDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Start Time</Label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">End Time</Label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <Button 
              className="w-full mt-8" 
              onClick={handleAddSingleSlot}
              style={{ backgroundColor: "#174880" }}
              disabled={!singleDate || !startTime || !endTime}
            >
              Add Slot
            </Button>
          </TabsContent>

          <TabsContent value="recurring" className="space-y-6 mt-4 px-1">
            <div className="space-y-2">
              <Label className="text-sm">Days of Week</Label>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {daysOfWeek.map((day) => (
                  <div key={day.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.value}
                      checked={selectedDays.includes(day.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDays([...selectedDays, day.value]);
                        } else {
                          setSelectedDays(selectedDays.filter((d) => d !== day.value));
                        }
                      }}
                    />
                    <label htmlFor={day.value} className="text-sm cursor-pointer">
                      {day.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Start Time</Label>
                <Input
                  type="time"
                  value={recurringStartTime}
                  onChange={(e) => setRecurringStartTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">End Time</Label>
                <Input
                  type="time"
                  value={recurringEndTime}
                  onChange={(e) => setRecurringEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Slot Duration</Label>
              <Select value={slotDuration} onValueChange={setSlotDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Apply From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {applyFrom ? format(applyFrom, "PPP") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={applyFrom}
                    onSelect={setApplyFrom}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Apply Until</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {applyUntil ? format(applyUntil, "PPP") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={applyUntil}
                    onSelect={setApplyUntil}
                    initialFocus
                    disabled={(date) => {
                      const today = new Date(new Date().setHours(0, 0, 0, 0));
                      return date < today || (applyFrom ? date < applyFrom : false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button 
              className="w-full mt-8" 
              onClick={handleGenerateRecurring}
              style={{ backgroundColor: "#174880" }}
              disabled={
                selectedDays.length === 0 || 
                !recurringStartTime || 
                !recurringEndTime || 
                !applyFrom || 
                !applyUntil
              }
            >
              Generate Schedule
            </Button>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}