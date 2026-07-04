export interface JobPreferenceData {
  jobTitles: string[];
  locationTypes: string[];
  locations: string[];
  employmentTypes: string[];
  privacy: string;
}

export interface EditJobPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}