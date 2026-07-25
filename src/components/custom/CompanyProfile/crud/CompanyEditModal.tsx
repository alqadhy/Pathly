import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import type { CompanyProfile, Link } from "../types";

interface CompanyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  data: any;
  onSave: (data: any) => void;
  profile: CompanyProfile;
}

const CompanyEditModal: React.FC<CompanyEditModalProps> = ({
  isOpen,
  onClose,
  section,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(data);
    setErrors({});
  }, [data]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    switch (section) {
      case "about":
        if (!formData?.trim()) {
          newErrors.about = "About section is required";
        }
        break;
      case "companyInfo":
        if (!formData?.email?.trim()) {
          newErrors.email = "Email is required";
        }
        break;
      case "jobs":
        if (!formData?.title?.trim()) {
          newErrors.title = "Job title is required";
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
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-2">
                About
              </label>
              <textarea
                value={formData || ""}
                onChange={(e) => setFormData(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Tell us about your company..."
              />
              {errors.about && (
                <p className="text-red-500 text-xs mt-1">{errors.about}</p>
              )}
            </div>
          </div>
        );

      case "companyInfo":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Company's name
              </label>
              <input
                type="text"
                value={formData?.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Vortex AI"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Industry
              </label>
              <input
                type="text"
                value={formData?.industry || ""}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Artificial Intelligence & SaaS"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Foundation year
              </label>
              <input
                type="number"
                value={formData?.foundedYear || ""}
                onChange={(e) =>
                  setFormData({ ...formData, foundedYear: parseInt(e.target.value) || undefined })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="1992"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData?.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Giza, Egypt"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Company size
              </label>
              <input
                type="text"
                value={formData?.employeeCount || ""}
                onChange={(e) =>
                  setFormData({ ...formData, employeeCount: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="320 employees"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Foundation year
              </label>
              <input
                type="number"
                value={formData?.foundedYear || ""}
                onChange={(e) =>
                  setFormData({ ...formData, foundedYear: parseInt(e.target.value) || undefined })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="1992"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData?.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Giza, Egypt"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Company size
              </label>
              <input
                type="text"
                value={formData?.employeeCount || ""}
                onChange={(e) =>
                  setFormData({ ...formData, employeeCount: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="320 employees"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData?.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
                placeholder="contact@company.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData?.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="+201012345678"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Website
              </label>
              <input
                type="url"
                value={formData?.website || ""}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="https://company.com"
              />
            </div>
            
            {/* Links Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-body-sm font-medium text-foreground">
                  Links
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newLink: Link = { platform: "", url: "" };
                    setFormData({
                      ...formData,
                      links: [...(formData?.links || []), newLink],
                    });
                  }}
                  className="px-3 py-1.5 bg-[#553be6] text-white text-sm rounded-lg hover:bg-[#4d35cf] transition-colors duration-200 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  add Link
                </button>
              </div>
              
              {formData?.links && formData.links.length > 0 && (
                <div className="space-y-2">
                  {formData.links.map((link: Link, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={link.platform}
                          onChange={(e) => {
                            const newLinks = [...formData.links];
                            newLinks[index] = { ...newLinks[index], platform: e.target.value };
                            setFormData({ ...formData, links: newLinks });
                          }}
                          placeholder="Platform (e.g., Behance, LinkedIn)"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...formData.links];
                            newLinks[index] = { ...newLinks[index], url: e.target.value };
                            setFormData({ ...formData, links: newLinks });
                          }}
                          placeholder="https://example.com/profile"
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newLinks = formData.links.filter((_: Link, i: number) => i !== index);
                          setFormData({ ...formData, links: newLinks });
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 mt-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "vision":
        return (
          <div className="space-y-2">
            <label className="block text-body-sm font-medium text-foreground mb-2">
              Vision
            </label>
            <div className="relative">
              <textarea
                value={formData || ""}
                onChange={(e) => setFormData(e.target.value)}
                rows={4}
                maxLength={300}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 resize-none"
                placeholder="To become the leading AI technology company in the Middle East and Africa, empowering businesses with intelligent, human-centered solutions that drive innovation, productivity, and sustainable growth."
              />
            </div>
            <div className="text-left">
              <span className="text-xs text-muted-foreground">{(formData || "").length}/300</span>
            </div>
          </div>
        );

      case "mission":
        return (
          <div className="space-y-2">
            <label className="block text-body-sm font-medium text-foreground mb-2">
              Mission
            </label>
            <div className="relative">
              <textarea
                value={formData || ""}
                onChange={(e) => setFormData(e.target.value)}
                rows={4}
                maxLength={300}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 resize-none"
                placeholder="At Vortex AI, our mission is to build accessible and reliable AI-powered products that help organizations solve real-world challenges. Through cutting-edge technology, exceptional user experiences, and a culture of continuous innovation, we enable businesses to work smarter, make data-driven decisions, and unlock their full potential."
              />
            </div>
            <div className="text-left">
              <span className="text-xs text-muted-foreground">{(formData || "").length}/300</span>
            </div>
          </div>
        );

      case "visionMission":
        return (
          <div className="space-y-6">
            {/* Vision Section */}
            <div className="space-y-2">
              <label className="block text-body-sm font-medium text-foreground mb-2">
                Vision
              </label>
              <textarea
                value={formData?.vision || ""}
                onChange={(e) =>
                  setFormData({ ...formData, vision: e.target.value })
                }
                rows={4}
                maxLength={300}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 resize-none"
                placeholder="To become the leading AI technology company in the Middle East and Africa, empowering businesses with intelligent, human-centered solutions that drive innovation, productivity, and sustainable growth."
              />
              <div className="text-left">
                <span className="text-xs text-muted-foreground">{(formData?.vision || "").length}/300</span>
              </div>
            </div>

            {/* Mission Section */}
            <div className="space-y-2">
              <label className="block text-body-sm font-medium text-foreground mb-2">
                Mission
              </label>
              <textarea
                value={formData?.mission || ""}
                onChange={(e) =>
                  setFormData({ ...formData, mission: e.target.value })
                }
                rows={4}
                maxLength={300}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200 resize-none"
                placeholder="At Vortex AI, our mission is to build accessible and reliable AI-powered products that help organizations solve real-world challenges. Through cutting-edge technology, exceptional user experiences, and a culture of continuous innovation, we enable businesses to work smarter, make data-driven decisions, and unlock their full potential."
              />
              <div className="text-left">
                <span className="text-xs text-muted-foreground">{(formData?.mission || "").length}/300</span>
              </div>
            </div>
          </div>
        );

      case "jobs":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={formData?.title || ""}
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
                Job Type
              </label>
              <select
                value={formData?.type || ""}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              >
                <option value="">Select type</option>
                <option value="on-site">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Experience Level
              </label>
              <input
                type="text"
                value={formData?.experience || ""}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Entry Level, 3-5 years, etc."
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData?.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Cairo, Egypt"
              />
            </div>
          </div>
        );

      case "people":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData?.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Position
              </label>
              <input
                type="text"
                value={formData?.position || ""}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Chief Executive Officer"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData?.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        );

      case "cultureValues":
        const recommendations = [
          "Diverse Team",
          "Flexible hours",
          "Continuous learning",
          "Open communication",
          "Work-life balance",
        ];
        
        const currentValues = Array.isArray(formData) ? formData : [];
        
        const addRecommendation = (value: string) => {
          if (!currentValues.includes(value)) {
            setFormData([...currentValues, value]);
          }
        };
        
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-2">
                Culture Values
              </label>
              <textarea
                value={Array.isArray(formData) ? formData.join(", ") : formData || ""}
                onChange={(e) =>
                  setFormData(
                    e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  )
                }
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Innovation, Collaboration, Work-life balance"
              />
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Recommendations
              </h4>
              <div className="flex flex-wrap gap-2">
                {recommendations.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => addRecommendation(value)}
                    disabled={currentValues.includes(value)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 ${
                      currentValues.includes(value)
                        ? "bg-purple-50 text-[#553be6] border-purple-200 cursor-default"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#553be6] hover:text-[#553be6] cursor-pointer"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "hiringInfo":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Open Positions
              </label>
              <input
                type="number"
                value={formData?.openPositions || 0}
                onChange={(e) =>
                  setFormData({ ...formData, openPositions: parseInt(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Average Time to Hire
              </label>
              <input
                type="text"
                value={formData?.avgTimeToHire || ""}
                onChange={(e) =>
                  setFormData({ ...formData, avgTimeToHire: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="15 days"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Acceptance Rate
              </label>
              <input
                type="text"
                value={formData?.acceptanceRate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, acceptanceRate: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="15%"
              />
            </div>
            <div>
              <label className="block text-body-sm font-medium text-foreground mb-1">
                Remote Policy
              </label>
              <input
                type="text"
                value={formData?.remotePolicy || ""}
                onChange={(e) =>
                  setFormData({ ...formData, remotePolicy: e.target.value })
                }
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-all duration-200"
                placeholder="Flexible, Hybrid, On-site"
              />
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
            {section === 'companyInfo' ? "company's info" : `Edit ${getSectionTitle()}`}
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
              onClick={onClose}
              className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
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

export default CompanyEditModal;