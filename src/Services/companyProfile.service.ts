export interface CompanyProfile {
  id: string;
  name: string;
  logoUrl: string;
  location: string;
  about: string;
}

// TODO: replace with a real endpoint via api-client once the backend exists.
// For now this mirrors the shape found in public/mocked so the preview
// component has something real to render.
const MOCKED_COMPANY: CompanyProfile = {
  id: "company-abb",
  name: "ABB Company",
  logoUrl: "/mocked/Community/abb-logo.png",
  location: "6th of October, Cairo, Egypt",
  about:
    "ABB aims to bridge the gap between restaurants & their diners, building lasting relationships using technology enabled solutions. Through a loyalty engine and a gamified online ordering experience, ABB enables restaurants to collect critical diner data, identify trends in customer behavior, and directly communicate with diners to generate recurring business.",
};

export async function getCurrentCompanyProfile(): Promise<CompanyProfile> {
  // Simulated network latency so loading states can be exercised in the UI.
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCKED_COMPANY;
}