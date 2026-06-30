import React, { useState, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import type { Profile } from '../../../types/profile';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  data: any;
  onSave: (data: any) => void;
  profile: Profile;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  section,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState(data);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const renderSectionFields = () => {
    switch (section) {
      case 'about':
        return (
          <div>
            <label className="block text-body-sm font-medium text-foreground mb-2">
              About
            </label>
            <textarea
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              placeholder="Tell us about yourself..."
            />
          </div>
        );

      case 'personalInfo':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Current Position
              </label>
              <input
                type="text"
                value={formData.currentPosition}
                onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
          </div>
        );

      case 'skills':
        return (
          <div>
            <label className="block text-body-sm font-medium text-foreground mb-2">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={formData.map((s: any) => s.name).join(', ')}
              onChange={(e) => {
                const skillNames = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                setFormData(skillNames.map((name, index) => ({
                  id: `skill-${Date.now()}-${index}`,
                  name,
                })));
              }}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              placeholder="UI Design, Figma, User Research"
            />
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {!isAdding && formData.id && (
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
            )}
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Company
              </label>
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                value={formData.description?.join('\n') || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  description: e.target.value.split('\n').filter(Boolean)
                })}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Line 1: Achievements\nLine 2: Responsibilities"
              />
            </div>
          </div>
        );

      case 'cv':
        return (
          <div className="text-center py-8">
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground mb-2">Upload your CV</p>
              <p className="text-body-sm text-muted-foreground mb-4">PDF, DOC, DOCX (Max 5MB)</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200">
                Choose File
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-muted-foreground">
            Edit form for {section} section coming soon...
          </div>
        );
    }
  };

  const getSectionTitle = () => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-overlay bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-card">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-h2 font-semibold text-foreground">Edit {getSectionTitle()}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="p-6">
          {renderSectionFields()}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;