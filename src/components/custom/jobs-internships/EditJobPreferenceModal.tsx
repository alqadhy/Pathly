import  { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialog';
import { X, Pencil, Search, XCircle, Plus, Trash2 } from 'lucide-react';

import ALL_JOB_TITLES from '../../../../public/mocked/jobs/jobTitles.json';
import type { EditJobPreferenceModalProps, JobPreferenceData } from '../../../types/preferences.types';

const INITIAL_DATA: JobPreferenceData = {
  jobTitles: [
    'User Interface Designer',
    'User Interface Designer',
    'User Experience Designer',
    'User Experience Designer',
    'User Experience Researcher',
  ],
  locationTypes: ['On-site', 'Hybrid', 'Remote'],
  locations: ['Cairo, Cairo, Egypt'],
  employmentTypes: ['Full time'],
  privacy: 'everyone',
};

const LOCATION_TYPE_OPTIONS = ['On-site', 'Hybrid', 'Remote'];

type EditingSection = 'jobTitles' | 'locationTypes' | null;

export default function EditJobPreferenceModal({ isOpen, onClose }: EditJobPreferenceModalProps) {
  const [selectedJobs, setSelectedJobs] = useState<string[]>(INITIAL_DATA.jobTitles);
  const [jobSearchOpen, setJobSearchOpen] = useState(false);
  const [jobSearchTerm, setJobSearchTerm] = useState('');

  const [selectedLocationTypes, setSelectedLocationTypes] = useState<string[]>(INITIAL_DATA.locationTypes);
  const [locationTypeAddOpen, setLocationTypeAddOpen] = useState(false);

  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const filteredJobOptions = useMemo(() => {
    if (!jobSearchTerm.trim()) return [];
    const lowerSearch = jobSearchTerm.toLowerCase();
    return ALL_JOB_TITLES.filter(
      (title : string) => title.toLowerCase().includes(lowerSearch) && !selectedJobs.includes(title)
    );
  }, [jobSearchTerm, selectedJobs]);

  const remainingLocationTypeOptions = useMemo(
    () => LOCATION_TYPE_OPTIONS.filter((option) => !selectedLocationTypes.includes(option)),
    [selectedLocationTypes]
  );

  const toggleSection = (section: EditingSection) => {
    setEditingSection((prev) => (prev === section ? null : section));
  
    setJobSearchOpen(false);
    setJobSearchTerm('');
    setLocationTypeAddOpen(false);
  };

  const handleAddJob = (jobTitle: string) => {
    if (!selectedJobs.includes(jobTitle)) {
      setSelectedJobs([...selectedJobs, jobTitle]);
    }
    setJobSearchTerm('');
  };

  const handleRemoveJob = (jobTitle: string) => {
    setSelectedJobs(selectedJobs.filter((job) => job !== jobTitle));
  };

  const handleAddLocationType = (type: string) => {
    if (!selectedLocationTypes.includes(type)) {
      setSelectedLocationTypes([...selectedLocationTypes, type]);
    }
    setLocationTypeAddOpen(false);
  };

  const handleRemoveLocationType = (type: string) => {
    setSelectedLocationTypes(selectedLocationTypes.filter((t) => t !== type));
  };

  const handleDelete = () => {
    setIsDeleteConfirm(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
     
      <DialogContent
        className="sm:max-w-[600px] max-h-[90vh] p-0 px-2 gap-0 overflow-hidden bg-white border-none shadow-card rounded-2xl [&_button:has(.sr-only)]:hidden"
        hideCloseButton={true}
      >
        
        <div className="relative px-6 pt-6 ">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 text-text-primary hover:text-normal transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={2.5} />
          </button>

          <DialogTitle className="text-text-secondary! text-h3! font-bold leading-tight pr-10">
            Edit job preference
          </DialogTitle>
          <DialogDescription className="mt-1 text-normal!  text-body-sm! pr-4">
            We use these to tailor your job recommendations that appear at the top of your Jobs tab.
          </DialogDescription>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h6 className="text-text-primary font-bold text-h6">Job titles</h6>
              <button
                onClick={() => toggleSection('jobTitles')}
                className="text-normal hover:text-primary transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            {editingSection === 'jobTitles' ? (
              <>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedJobs.map((title, index) => (
                    <div
                      key={`${title}-${index}`}
                      className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-primary text-white rounded-full text-body-sm"
                    >
                      {title}
                      <button
                        onClick={() => handleRemoveJob(title)}
                        className="hover:bg-primary-hover rounded-full p-0.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setJobSearchOpen((open) => !open)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-text-primary text-body-sm font-medium hover:bg-light transition-colors"
                  >
                    Add <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {jobSearchOpen && (
                  <div className="relative mt-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-normal w-4 h-4" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search"
                      className="w-full pl-10 pr-3 py-2.5 bg-input border border-transparent focus:border-ring rounded-full text-body-sm outline-none transition-all placeholder:text-text-light"
                      value={jobSearchTerm}
                      onChange={(e) => setJobSearchTerm(e.target.value)}
                    />

                    {jobSearchTerm.trim() !== '' && (
                      <div className="absolute z-10 left-0 right-0 mt-2 border border-border rounded-lg bg-white shadow-md max-h-40 overflow-y-auto p-1">
                        {filteredJobOptions.length > 0 ? (
                          filteredJobOptions.map((title: string) => (
                            <button
                              key={title}
                              onClick={() => handleAddJob(title)}
                              className="w-full text-left px-3 py-2 text-body-sm text-text-primary hover:bg-primary-light rounded-md transition-colors"
                            >
                              {title}
                            </button>
                          ))
                        ) : (
                          <p className="text-text-light text-body-sm px-3 py-2 text-center">
                            No results found
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-normal text-body-sm">{selectedJobs.join(' - ')}</p>
            )}
          </div>

          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h6 className="text-text-primary font-bold text-h6">Location types</h6>
              <button
                onClick={() => toggleSection('locationTypes')}
                className="text-normal hover:text-primary transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            {editingSection === 'locationTypes' ? (
              <div className="relative">
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedLocationTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-primary text-white rounded-sm text-body-sm"
                    >
                      {type}
                      <button
                        onClick={() => handleRemoveLocationType(type)}
                        className="hover:bg-primary-hover rounded-full p-0.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {remainingLocationTypeOptions.length > 0 && (
                    <button
                      onClick={() => setLocationTypeAddOpen((open) => !open)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-sm border border-border border-primary text-primary text-body-sm font-medium hover:bg-light transition-colors"
                    >
                      Add <Plus className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {locationTypeAddOpen && (
                  <div className="absolute z-10 left-0 mt-2 border border-border rounded-lg bg-white shadow-md p-1 min-w-[160px]">
                    {remainingLocationTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleAddLocationType(type)}
                        className="w-full text-left px-3 py-2 text-body-sm text-text-primary hover:bg-primary-light rounded-md transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-normal text-body-sm">{selectedLocationTypes.join(' - ')}</p>
            )}
          </div>

          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h6 className="text-text-primary font-bold text-h6">Locations</h6>
              <button className="text-normal hover:text-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-normal text-body-sm">{INITIAL_DATA.locations.join(', ')}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h6 className="text-text-primary font-bold text-h6">Employment types</h6>
              <button className="text-normal hover:text-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-normal text-body-sm">{INITIAL_DATA.employmentTypes.join(' - ')}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h6 className="text-text-primary font-bold text-h6">
                Control who can view your job preferences
              </h6>
              <button className="text-normal hover:text-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-normal text-body-sm">{INITIAL_DATA.privacy}</p>
          </div>

          <div className=" rounded-xl ">
            {isDeleteConfirm ? (
              <div className="space-y-3 mb-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-danger! font-bold! ">Delete</h4>
                  <button
                    onClick={() => setIsDeleteConfirm(false)}
                    aria-label="Close delete confirmation"
                    className="text-danger hover:text-danger-hover transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-normal text-body-sm">
                  Jobs based on your preferences will no longer appear on the Jobs tab and your Open to
                  Work status will be removed
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteConfirm(false)}
                    className="px-5 py-2 rounded-sm border border-primary text-primary font-semibold text-body-sm hover:bg-primary-light transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-5 py-2 rounded-sm bg-danger text-white font-semibold text-body-sm hover:bg-danger-hover transition-colors"
                  >
                    Remove
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsDeleteConfirm(true)}
                className="w-full flex items-center justify-between"
              >
                <span className="text-danger font-semibold text-body-md!">Delete</span>
                <Trash2 className="w-4 h-4 text-danger" />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}