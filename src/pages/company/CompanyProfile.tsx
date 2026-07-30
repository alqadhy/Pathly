import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ProfileHeader } from '../../components/custom/Profile';
import { AboutSection } from '../../components/custom/Profile';
import ShareModal from '../../components/custom/Profile/ShareModal';
import { TabNavigation } from '../../components/custom/CompanyProfile/TabNavigation';
import {
  CompanyInfoSection,
  VisionMissionSection,
  HiringInfoSection,
  CultureValuesSection,
  JobsSection,
  PeopleSection,
} from '../../components/custom/CompanyProfile';
import CompanyEditModal from '../../components/custom/CompanyProfile/crud/CompanyEditModal';
import {
  getStoredCompanyProfile,
  saveStoredCompanyProfile,
} from '../../components/custom/CompanyProfile/crud/companyProfileStorage';
import { getCurrentUser } from '../../components/custom/Profile/crud/profileStorage';
import type { CompanyProfile, Job, TeamMember } from '../../components/custom/CompanyProfile/types';
import { APP_ROUTES } from '../../constants';

// Import seed applications data
import seedApplications from '../../../public/mocked/applications/seed-applications.json';

const CompanyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('about');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteModal, setDeleteModal] = useState<{ section: string; title: string } | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    // Check if user is logged in as company
    if (!currentUser || currentUser.role !== 'company') {
      // Redirect to login if not a company
      navigate(APP_ROUTES.auth.login);
      return;
    }
    
    fetchCompanyProfile();
  }, [navigate, currentUser]);

  useEffect(() => {
    if (company) {
      saveStoredCompanyProfile(company);
    }
  }, [company]);

  // Sync currentUser changes to company profile
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'company') {
      return;
    }

    // Update company profile with currentUser data
    setCompany((prev) => {
      if (!prev) return prev;
      
      // Check if any currentUser fields have changed
      const hasChanges = 
        prev.id !== currentUser.id ||
        prev.name !== currentUser.fullName ||
        prev.email !== currentUser.email ||
        prev.phone !== currentUser.phone;

      if (!hasChanges) return prev;

      // Update only the fields that come from currentUser
      const updated = {
        ...prev,
        id: currentUser.id,
        name: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone,
      };

      console.log("Syncing currentUser changes to company profile:", updated);
      return updated;
    });
  }, [currentUser]); // Re-run when currentUser changes

  // Load hired people from seed applications
  useEffect(() => {
    if (!company || !currentUser) return;

    console.log('Loading hired people for company:', company.name);
    console.log('Current company people:', company.people);

    // Get hired applications for this company
    const hiredApplications = (seedApplications as any[]).filter(
      (app) => app.companyName === company.name && app.status === 'hired'
    );

    console.log('Found hired applications:', hiredApplications.length);
    console.log('Hired applications:', hiredApplications);

    if (hiredApplications.length === 0) {
      console.log('No hired applications found for this company');
      return;
    }

    // Convert applications to team members
    const hiredTeamMembers: TeamMember[] = hiredApplications.map((app) => ({
      id: app.id,
      name: app.name,
      position: app.jobTitle,
      image: app.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=553be6&color=fff`,
      mutualConnections: Math.floor(Math.random() * 50) + 1, // Random number for demo
    }));

    console.log('Converted to team members:', hiredTeamMembers);

    // Add hired people to the people section (as management team by default)
    setCompany((prev) => {
      if (!prev) return prev;

      // Check if we already have these people loaded
      const existingIds = new Set([
        ...prev.people.managementTeam.map(p => p.id),
        ...prev.people.designerTeam.map(p => p.id)
      ]);

      const newMembers = hiredTeamMembers.filter(m => !existingIds.has(m.id));
      
      console.log('New members to add:', newMembers.length);

      if (newMembers.length === 0) {
        console.log('All members already exist');
        return prev;
      }

      const updated = {
        ...prev,
        people: {
          managementTeam: [...prev.people.managementTeam, ...newMembers],
          designerTeam: prev.people.designerTeam,
        },
      };

      console.log('Updated company with hired people:', updated.people);
      console.log('Saved to localStorage');
      // Explicitly save to localStorage
      saveStoredCompanyProfile(updated);
      return updated;
    });
  }, [company?.name, currentUser, saveStoredCompanyProfile]); // Only re-run when company name or currentUser changes

  const fetchCompanyProfile = async () => {
    try {
      // FIRST: Check for stored profile in localStorage to preserve CRUD changes
      const storedProfile = getStoredCompanyProfile();
      if (storedProfile) {
        console.log("Loading stored company profile from localStorage");
        setCompany(storedProfile);
        setLoading(false);
        return;
      }

      // SECOND: If no stored profile, check for currentUser and create profile from it
      const currentUser = getCurrentUser();
      console.log("Current user from localStorage:", currentUser);
      
      if (currentUser?.role === 'company') {
        console.log("Creating new company profile from currentUser");
        // Create a company profile from the user data
        const companyProfile: CompanyProfile = {
          id: currentUser.id,
          name: currentUser.fullName,
          industry: "",
          location: "",
          followers: 0,
          about: "",
          vision: "",
          mission: "",
          foundedYear: undefined,
          employeeCount: "",
          email: currentUser.email,
          phone: currentUser.phone,
          website: "",
          openPositions: 0,
          avgTimeToHire: "",
          acceptanceRate: "",
          remotePolicy: "",
          cultureValues: [],
          jobs: [],
          people: {
            managementTeam: [],
            designerTeam: []
          },
          coverImage: { url: "", alt: "" },
          avatarImage: { url: "", alt: currentUser.fullName },
        };

        saveStoredCompanyProfile(companyProfile);
        setCompany(companyProfile);
        setLoading(false);
        return;
      }

      // No profile found - user needs to log in as company
      console.log("No company profile found - user not logged in as company");
      setCompany(null);
    } catch (error) {
      console.error("Error fetching company profile:", error);
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: string, item?: any) => {
    setEditingSection(section);
    setSelectedItem(item || null);
  };

  const handleSave = (section: string, data: any) => {
    setCompany((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      
      switch (section) {
        case "about":
          updated.about = data;
          break;
        case "companyInfo":
          updated.foundedYear = data.foundedYear;
          updated.employeeCount = data.employeeCount;
          updated.email = data.email;
          updated.phone = data.phone;
          updated.website = data.website;
          updated.links = data.links;
          break;
        case "vision":
          updated.vision = data;
          break;
        case "mission":
          updated.mission = data;
          break;
        case "visionMission":
          updated.vision = data.vision;
          updated.mission = data.mission;
          break;
        case "jobs":
          if (selectedItem) {
            const index = updated.jobs.findIndex((j) => j.id === selectedItem.id);
            if (index !== -1) {
              updated.jobs[index] = { ...data, id: selectedItem.id };
            }
          } else {
            updated.jobs = [...updated.jobs, { ...data, id: `job-${Date.now()}` }];
          }
          break;
        case "people":
          if (selectedItem) {
            const mgmtIndex = updated.people?.managementTeam.findIndex((p) => p.id === selectedItem.id);
            const designerIndex = updated.people?.designerTeam.findIndex((p) => p.id === selectedItem.id);
            
            if (mgmtIndex !== -1 && updated.people) {
              updated.people.managementTeam[mgmtIndex] = { ...data, id: selectedItem.id };
            } else if (designerIndex !== -1 && updated.people) {
              updated.people.designerTeam[designerIndex] = { ...data, id: selectedItem.id };
            }
          }
          break;
        case "cultureValues":
          updated.cultureValues = Array.isArray(data) ? data : [];
          break;
        case "hiringInfo":
          updated.openPositions = data.openPositions;
          updated.avgTimeToHire = data.avgTimeToHire;
          updated.acceptanceRate = data.acceptanceRate;
          updated.remotePolicy = data.remotePolicy;
          break;
        default:
          break;
      }
      return updated;
    });
    setEditingSection(null);
    setSelectedItem(null);
  };

  const handleCloseModal = () => {
    setEditingSection(null);
    setSelectedItem(null);
  };

  const handleDeleteClick = (section: string, title: string) => {
    setDeleteModal({ section, title });
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleShareClose = () => {
    setIsShareModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteModal || !company) return;
    
    setCompany((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };
      
      switch (deleteModal.section) {
        case "mission":
          updated.mission = "";
          break;
        case "vision":
          updated.vision = "";
          break;
        case "about":
          updated.about = "";
          break;
        default:
          break;
      }
      return updated;
    });
    
    setDeleteModal(null);
  };

  const handleAvatarChange = (imageUrl: string) => {
    setCompany((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        avatarImage: {
          url: imageUrl,
          alt: prev.name || "Company logo",
        },
      };
    });
  };

  const handleCoverChange = (imageUrl: string) => {
    setCompany((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        coverImage: {
          url: imageUrl,
          alt: prev.name || "Cover image",
        },
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9fc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#553be6] mx-auto"></div>
          <p className="mt-4 text-[#6b7280]">Loading company profile...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-12 bg-[#f8f9fc]">
        <p className="text-[#6b7280]">Company profile not found</p>
        <p className="text-[#6b7280] mt-2">Please log in as a company to view your profile</p>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'people', label: 'People' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 max-sm:px-0 py-6 bg-[#f8f9fc]">
      {/* Profile Header - Full Width */}
      <div className="mb-4">
        <ProfileHeader 
          profile={{
            id: company.id,
            name: company.name,
            title: company.industry,
            followers: company.followers,
            location: company.location,
            industry: company.industry,
            about: company.about,
            coverImage: company.coverImage,
            avatarImage: company.avatarImage,
            personalInfo: {
              username: company.name.toLowerCase().replace(/\s+/g, ''),
              email: company.email || '',
              phone: company.phone || '',
              location: company.location,
              currentPosition: company.industry,
              industry: company.industry,
              links: company.website ? [{
                platform: 'Website',
                url: company.website
              }] : []
            },
            activities: [],
            skills: [],
            certifications: [],
            experience: [],
            education: [],
            courses: [],
            tracks: [],
            cv: null
          } as any}
          subtitle={company.industry}
          isPublicView={false}
          onAvatarChange={handleAvatarChange}
          onCoverChange={handleCoverChange}
          onShareClick={handleShareClick}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - 2/3 width (Main Content) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* About Section */}
          {activeTab === 'about' && (
            <>
              <AboutSection
                about={company.about}
                title="About"
                isPublicView={false}
                onEdit={() => handleEdit("about")}
              />
              
               {/* Vision & Mission */}
               <VisionMissionSection
                 vision={company.vision}
                 mission={company.mission}
                 isPublicView={false}
                 onEdit={() => handleEdit("visionMission", company)}
                 onDeleteVision={() => handleDeleteClick("vision", "Vision")}
                 onDeleteMission={() => handleDeleteClick("mission", "Mission")}
               />
            </>
          )}
          
          {/* Jobs Section */}
          {activeTab === 'jobs' && (
            <JobsSection
              jobs={company.jobs}
              isPublicView={false}
              onEdit={(job) => handleEdit("jobs", job)}
              onAdd={() => handleEdit("jobs")}
            />
          )}
          
          {/* People Section */}
          {activeTab === 'people' && (
            <PeopleSection
              managementTeam={company.people?.managementTeam || []}
              designerTeam={company.people?.designerTeam || []}
              isPublicView={false}
              onEdit={(person) => handleEdit("people", person)}
              onAdd={() => handleEdit("people")}
            />
          )}
        </div>

        {/* Right Column - 1/3 width (Sidebar) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Company Info */}
          <CompanyInfoSection
            foundedYear={company.foundedYear}
            employeeCount={company.employeeCount}
            email={company.email}
            phone={company.phone}
            website={company.website}
            links={company.links}
            isPublicView={false}
            onEdit={() => handleEdit("companyInfo", {
              foundedYear: company.foundedYear,
              employeeCount: company.employeeCount,
              email: company.email,
              phone: company.phone,
              website: company.website,
              links: company.links,
            })}
          />
          
          {/* Hiring Info */}
          <HiringInfoSection
            openPositions={company.openPositions}
            avgTimeToHire={company.avgTimeToHire}
            acceptanceRate={company.acceptanceRate}
            remotePolicy={company.remotePolicy}
            isPublicView={false}
            onEdit={() => handleEdit("hiringInfo", {
              openPositions: company.openPositions,
              avgTimeToHire: company.avgTimeToHire,
              acceptanceRate: company.acceptanceRate,
              remotePolicy: company.remotePolicy,
            })}
          />
          
          {/* Culture & Values */}
          <CultureValuesSection
            values={company.cultureValues}
            isPublicView={false}
            onEdit={() => handleEdit("cultureValues", company.cultureValues)}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {editingSection && (
        <CompanyEditModal
          isOpen={!!editingSection}
          onClose={handleCloseModal}
          section={editingSection}
          data={selectedItem || company[editingSection as keyof CompanyProfile]}
          onSave={(data) => handleSave(editingSection, data)}
          profile={company}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
            style={{ minWidth: "400px" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Delete {deleteModal.title}
              </h2>
              <button
                onClick={() => setDeleteModal(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to delete the {deleteModal.title.toLowerCase()} section?
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleShareClose}
        profileName={company.name}
        profileUrl={`${window.location.origin}/company/profile/${company.id}`}
      />
    </div>
  );
};

export default CompanyProfile;