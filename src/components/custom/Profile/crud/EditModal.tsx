import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload } from "lucide-react";
import type { Profile } from "../../../../types/profile";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const currentSkills = Array.isArray(formData)
    ? formData
    : Array.isArray(formData?.skills)
      ? formData.skills
      : [];

  useEffect(() => {
    setFormData(data);
    setErrors({});
  }, [data]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    switch (section) {
      case "experience":
        if (!formData.title?.trim()) {
          newErrors.title = "Job title is required";
        }
        if (!formData.company?.trim()) {
          newErrors.company = "Company is required";
        }
        if (!formData.startDate?.trim()) {
          newErrors.startDate = "Start date is required";
        }
        break;
      case "education":
        if (!formData.degree?.trim()) {
          newErrors.degree = "Degree is required";
        }
        if (!formData.institution?.trim()) {
          newErrors.institution = "Institution is required";
        }
        if (!formData.startDate?.trim()) {
          newErrors.startDate = "Start date is required";
        }
        break;
      case "certifications":
        if (!formData.name?.trim()) {
          newErrors.name = "Certification name is required";
        }
        if (!formData.issuer?.trim()) {
          newErrors.issuer = "Issuing organization is required";
        }
        if (!formData.issuedDate?.trim()) {
          newErrors.issuedDate = "Issue date is required";
        }
        break;
      case "courses":
        if (!formData.name?.trim()) {
          newErrors.name = "Course name is required";
        }
        if (!formData.provider?.trim()) {
          newErrors.provider = "Provider is required";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getSectionTitle = () => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  const renderSectionFields = () => {
    switch (section) {
      case "about":
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

      case "personalInfo":
        const [links, setLinks] = useState<{ platform: string; url: string }[]>(
          formData.links || [],
        );
        const [showLinkForm, setShowLinkForm] = useState(false);
        const [newLinkPlatform, setNewLinkPlatform] = useState("");
        const [newLinkUrl, setNewLinkUrl] = useState("");

        useEffect(() => {
          setLinks(formData.links || []);
        }, [formData.links]);

        const handleAddLink = () => {
          if (newLinkPlatform.trim() && newLinkUrl.trim()) {
            const updatedLinks = [
              ...links,
              { platform: newLinkPlatform, url: newLinkUrl },
            ];
            setLinks(updatedLinks);
            setFormData({ ...formData, links: updatedLinks });
            setNewLinkPlatform("");
            setNewLinkUrl("");
            setShowLinkForm(false);
          }
        };

        const handleRemoveLink = (index: number) => {
          const updatedLinks = links.filter((_, i) => i !== index);
          setLinks(updatedLinks);
          setFormData({ ...formData, links: updatedLinks });
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Design & Technology"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Current position
              </label>
              <input
                type="text"
                value={formData.currentPosition}
                onChange={(e) =>
                  setFormData({ ...formData, currentPosition: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Senior Product Designer"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Cairo, Egypt"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                phone number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="+201012345678"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-body-sm font-medium text-foreground">
                  Links
                </label>
                <button
                  type="button"
                  onClick={() => setShowLinkForm(!showLinkForm)}
                  className="px-3 py-1.5 bg-[#553be6] text-white rounded-lg text-body-sm font-medium hover:bg-[#4d35cf] transition-colors duration-200 flex items-center gap-1"
                >
                  add Link
                  <span className="text-lg">+</span>
                </button>
              </div>

              {links.length > 0 && (
                <div className="space-y-2">
                  {links.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-border"
                    >
                      <div className="flex-1">
                        <p className="text-body-sm font-medium text-foreground capitalize">
                          {link.platform}
                        </p>
                        <p className="text-body-sm text-muted-foreground">
                          {link.url}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(index)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                        title="Remove link"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {showLinkForm && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-border space-y-2">
                  <input
                    type="text"
                    value={newLinkPlatform}
                    onChange={(e) => setNewLinkPlatform(e.target.value)}
                    placeholder="Platform name (e.g., Behance)"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                  />
                  <input
                    type="text"
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="URL (e.g., behance.net/username)"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="w-full px-3 py-2 bg-[#553be6] text-white rounded-lg text-body-sm font-medium hover:bg-[#4d35cf] transition-colors duration-200"
                  >
                    Save Link
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "skills":
        return (
          <div>
            <label className="block text-body-sm font-medium text-foreground mb-2">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={currentSkills.map((s: any) => s.name).join(", ")}
              onChange={(e) => {
                const skillNames = e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
                setFormData(
                  skillNames.map((name, index) => ({
                    id: `skill-${Date.now()}-${index}`,
                    name,
                  })),
                );
              }}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              placeholder="UI Design, Figma, User Research"
            />
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Job title
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.title ? "border-red-500" : "border-border"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Company
              </label>
              <input
                type="text"
                value={formData.company || ""}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.company ? "border-red-500" : "border-border"
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Employment type
              </label>
              <select
                value={formData.employmentType || ""}
                onChange={(e) =>
                  setFormData({ ...formData, employmentType: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              >
                <option value="">Select type</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Start date
              </label>
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                placeholder="MM/YYYY"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.startDate ? "border-red-500" : "border-border"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                End date
              </label>
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                placeholder="MM/YYYY or Present"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                value={formData.description?.join("\n") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Line 1: Achievements\nLine 2: Responsibilities"
              />
            </div>
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Degree
              </label>
              <input
                type="text"
                value={formData.degree || ""}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.degree ? "border-red-500" : "border-border"
                }`}
              />
              {errors.degree && (
                <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field || ""}
                onChange={(e) =>
                  setFormData({ ...formData, field: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Institution
              </label>
              <input
                type="text"
                value={formData.institution || ""}
                onChange={(e) =>
                  setFormData({ ...formData, institution: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.institution ? "border-red-500" : "border-border"
                }`}
              />
              {errors.institution && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.institution}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  placeholder="MM/YYYY"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                    errors.startDate ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  End date
                </label>
                <input
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  placeholder="MM/YYYY or Present"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Certification Name
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Issuing Organization
              </label>
              <input
                type="text"
                value={formData.issuer || ""}
                onChange={(e) =>
                  setFormData({ ...formData, issuer: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.issuer ? "border-red-500" : "border-border"
                }`}
              />
              {errors.issuer && (
                <p className="text-red-500 text-xs mt-1">{errors.issuer}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={formData.issuedDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, issuedDate: e.target.value })
                  }
                  placeholder="MM/YYYY"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                    errors.issuedDate ? "border-red-500" : "border-border"
                  }`}
                />
                {errors.issuedDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.issuedDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-body-sm font-medium text-foreground mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  placeholder="MM/YYYY or No Expiry"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Credential ID (Optional)
              </label>
              <input
                type="text"
                value={formData.credentialId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, credentialId: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="ABC123XYZ"
              />
            </div>
          </div>
        );

      case "activities":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Activity Content
              </label>
              <textarea
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Share your thoughts, achievements, or projects..."
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Course name
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Organization
              </label>
              <input
                type="text"
                value={formData.provider || ""}
                onChange={(e) =>
                  setFormData({ ...formData, provider: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.provider ? "border-red-500" : "border-border"
                }`}
              />
              {errors.provider && (
                <p className="text-red-500 text-xs mt-1">{errors.provider}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Duration
              </label>
              <input
                type="date"
                value={formData.completionDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, completionDate: e.target.value })
                }
                placeholder="Feb 2024"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Course Level
              </label>
              <input
                type="text"
                value={formData.level || ""}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                placeholder="Intermediate"
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Skills Acquired (comma separated)
              </label>
              <textarea
                value={formData.skills?.join("\n") || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value.split("\n").filter(Boolean),
                  })
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Design Systems&#10;Component Libraries&#10;Accessibility (WCAG)&#10;UX Consistency"
              />
            </div>
          </div>
        );

      case "cv":
        return (
          <div className="text-center py-8">
            <div className="border-2 border-dashed border-border rounded-lg p-8">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground mb-2">Upload your CV</p>
              <p className="text-body-sm text-muted-foreground mb-4">
                PDF, DOC, DOCX (Max 5MB)
              </p>
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

  const modalElement = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{ minWidth: "700px" }}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            Edit {getSectionTitle()}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {renderSectionFields()}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                if (validateForm()) {
                  onSave(formData);
                }
              }}
              className="px-4 py-2 bg-[#553be6] text-white rounded-lg hover:bg-[#4d35cf] transition-colors duration-200 flex items-center font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

export default EditModal;
