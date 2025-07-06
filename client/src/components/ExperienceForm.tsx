// components/ExperienceForm.tsx
import React from "react";
import { motion } from "framer-motion";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Experience } from "@/types";

interface ExperienceFormProps {
  experience: Experience;
  setExperience: React.Dispatch<React.SetStateAction<Experience>>;
  onSave: (experience: Experience) => void;
  onCancel: () => void;
  editMode: boolean;
}

export default function ExperienceForm({
  experience,
  setExperience,
  onSave,
  onCancel,
  editMode,
}: ExperienceFormProps) {
  // Parse existing duration to extract dates if possible
  const parseDurationToDates = (duration: string): { from?: Date; to?: Date } => {
    if (!duration) return {};
    
    // Try to parse format like "2 Sep 2024 - 2 Dec 2024" or "2 Sep 2024 - Present"
    const parts = duration.split(' - ');
    if (parts.length !== 2) return {};
    
    try {
      const fromDateStr = parts[0].trim();
      const toDateStr = parts[1].trim();
      
      const fromDate = new Date(fromDateStr);
      const toDate = toDateStr === 'Present' ? undefined : new Date(toDateStr);
      
      return {
        from: isNaN(fromDate.getTime()) ? undefined : fromDate,
        to: toDate && isNaN(toDate.getTime()) ? undefined : toDate
      };
    } catch {
      return {};
    }
  };

  const initialDates = parseDurationToDates(experience.duration);
  const [fromDate, setFromDate] = React.useState<Date | undefined>(initialDates.from);
  const [toDate, setToDate] = React.useState<Date | undefined>(initialDates.to);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFromDateChange = (date: Date | undefined) => {
    setFromDate(date);
    setExperience((prev) => ({
      ...prev,
      duration: formatDuration(date, toDate),
    }));
  };

  const handleToDateChange = (date: Date | undefined) => {
    setToDate(date);
    setExperience((prev) => ({
      ...prev,
      duration: formatDuration(fromDate, date),
    }));
  };

  const formatDuration = (from: Date | undefined, to: Date | undefined): string => {
    if (!from && !to) return "";
    if (!from) return to ? format(to, "d MMM yyyy") : "";
    if (!to) return format(from, "d MMM yyyy") + " - Present";
    return `${format(from, "d MMM yyyy")} - ${format(to, "d MMM yyyy")}`;
  };

  const handleHighlightChange = (index: number, value: string) => {
    setExperience((prev) => {
      const updatedHighlights = [...prev.highlights];
      updatedHighlights[index] = value;
      return { ...prev, highlights: updatedHighlights };
    });
  };

  const addHighlight = () => {
    setExperience((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeHighlight = (index: number) => {
    setExperience((prev) => {
      const updatedHighlights = prev.highlights.filter((_, i) => i !== index);
      return {
        ...prev,
        highlights: updatedHighlights.length ? updatedHighlights : [""],
      };
    });
  };

  const handleSubmit = () => {
    // Filter out empty highlights
    const filteredHighlights = experience.highlights.filter(
      (h) => h.trim() !== ""
    );

    const experienceToSave = {
      ...experience,
      highlights: filteredHighlights.length ? filteredHighlights : [],
    };

    onSave(experienceToSave);
  };

  return (
    <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gray-800/20 border border-gray-700 rounded-lg p-4 md:p-6 mb-6 max-w-2xl"
      >
        <h2 className="text-xl font-semibold mb-5 text-cyan-300/90">
          {editMode ? "Edit Experience" : "Add New Experience"}
        </h2>

        <div className="space-y-5">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
              <div>
                <label className="font-semibold block text-sm text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={experience.company}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600/20 p-[10px] text-sm border-[1px] border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-white"
                  required
                />
              </div>

              <div>
                <label className="font-semibold block text-sm text-gray-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={experience.role}
                  onChange={handleInputChange}
                  className="w-full bg-gray-600/20 p-[10px] text-sm border-[1px] border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
              <div>
                <label className="font-semibold block text-sm text-gray-300 mb-1">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-600/20 border-gray-700 text-white hover:bg-gray-600/30 hover:text-white focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "d MMM yyyy") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={handleFromDateChange}
                      initialFocus
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="font-semibold block text-sm text-gray-300 mb-1">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-600/20 border-gray-700 text-white hover:bg-gray-600/30 hover:text-white focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "d MMM yyyy") : "Select end date (optional)"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={handleToDateChange}
                      initialFocus
                      disabled={(date) => fromDate ? date < fromDate : false}
                      className="bg-gray-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mb-2">
              <label className="font-semibold block text-sm text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={experience.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-gray-600/20 p-[10px] text-sm border-[1px] border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-white"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-semibold block text-sm text-gray-300">
                  Highlights
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={addHighlight}
                  className="text-sm bg-gray-700/70 text-cyan-400 py-1 px-3 rounded hover:bg-gray-600/70 inline-flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Highlight
                </motion.button>
              </div>

              {experience.highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <input
                    type="text"
                    required={index === 0}
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(index, e.target.value)
                    }
                    className="flex-grow bg-gray-600/20 p-[10px] text-sm border-[1px] border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    placeholder="Add a key accomplishment or responsibility"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="text-red-400 hover:text-red-300"
                    disabled={experience.highlights.length === 1}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-cyan-500/70 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {editMode ? "Update Experience" : "Save Experience"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onCancel}
                className="bg-gray-700/70 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}