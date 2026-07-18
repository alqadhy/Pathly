import React from 'react';
import { Edit2, Plus, Trash2, Briefcase, MapPin, Clock, Users } from 'lucide-react';
import type { Job } from './types';

interface JobsSectionProps {
  jobs: Job[];
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onAdd?: () => void;
  isPublicView?: boolean;
}

const JobsSection: React.FC<JobsSectionProps> = ({
  jobs,
  onEdit,
  onDelete,
  onAdd,
  isPublicView = false,
}) => {
  const getTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'remote':
        return 'bg-green-100 text-green-700';
      case 'hybrid':
        return 'bg-blue-100 text-blue-700';
      case 'on-site':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Jobs</h3>
        {!isPublicView && (
          <div className="flex items-center gap-2">
            {onAdd && (
              <button
                onClick={onAdd}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{job.title}</h4>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>over {job.applicants} applicant{job.applicants !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                    <div className="flex items-center gap-1 mt-3 text-sm text-green-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.postedDate}</span>
                    </div>
                </div>
                
                {!isPublicView && (
                  <div className="flex items-center gap-2 ml-4">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(job)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(job)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No open positions at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsSection;