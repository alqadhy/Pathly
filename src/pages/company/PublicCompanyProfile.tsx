import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { getCurrentUser } from "../../components/custom/Profile/crud/profileStorage";
import { ProfileHeader } from "../../components/custom/Profile";
import { AboutSection } from "../../components/custom/Profile";
import { TabNavigation } from "../../components/custom/CompanyProfile/TabNavigation";
import {
  CompanyInfoSection,
  VisionMissionSection,
  HiringInfoSection,
  CultureValuesSection,
  JobsSection,
  PeopleSection,
} from "../../components/custom/CompanyProfile";

const PublicCompanyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    // const currentUser = getCurrentUser();
    
    // If current user is a company, redirect to company dashboard
    // if (currentUser?.role === 'company') {
    //   navigate('/company/dashboard');
    //   return;
    // }

    const fetchCompany = async () => {
      try {
        const response = await fetch('/mocked/Community/company-profiles.json');
        if (!response.ok) {
          throw new Error("Failed to load company data");
        }
        const data = await response.json();
        const companyData = data.companies[id || ""];

        if (companyData) {
          setCompany(companyData);
        } else {
          setCompany(null);
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id, navigate]);

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
        <p className="text-[#6b7280]">Company not found</p>
        <button
          onClick={() => navigate("/student/community")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
        >
          Back to Community
        </button>
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
              email: company.companyInfo?.email || '',
              phone: company.companyInfo?.phone || '',
              location: company.location,
              currentPosition: company.industry,
              industry: company.industry,
              links: company.companyInfo?.website ? [{
                platform: 'Website',
                url: company.companyInfo.website
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
          isPublicView={true}
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
                isPublicView={true}
              />
              
              {/* Vision & Mission */}
              <VisionMissionSection
                vision={company.vision}
                mission={company.mission}
                isPublicView={true}
              />
            </>
          )}
          
          {/* Jobs Section */}
          {activeTab === 'jobs' && (
            <JobsSection
              jobs={company.jobs}
              isPublicView={true}
            />
          )}
          
          {/* People Section */}
          {activeTab === 'people' && (
            <PeopleSection
              managementTeam={company.people.managementTeam}
              designerTeam={company.people.designerTeam}
              isPublicView={true}
            />
          )}
        </div>

        {/* Right Column - 1/3 width (Sidebar) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Company Info */}
          <CompanyInfoSection
            foundedYear={company.companyInfo.foundedYear}
            employeeCount={company.companyInfo.employeeCount}
            email={company.companyInfo.email}
            phone={company.companyInfo.phone}
            website={company.companyInfo.website}
            isPublicView={true}
          />
          
          {/* Hiring Info */}
          <HiringInfoSection
            openPositions={company.hiringInfo.openPositions}
            avgTimeToHire={company.hiringInfo.avgTimeToHire}
            acceptanceRate={company.hiringInfo.acceptanceRate}
            remotePolicy={company.hiringInfo.remotePolicy}
            isPublicView={true}
          />
          
          {/* Culture & Values */}
          <CultureValuesSection
            values={company.cultureValues}
            isPublicView={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicCompanyProfile;