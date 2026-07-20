import { useQuery } from "@tanstack/react-query";
import { getCurrentCompanyProfile } from "../Services/companyProfile.service";

export function useCompanyProfile() {
  return useQuery({
    queryKey: ["company-profile", "current"],
    queryFn: getCurrentCompanyProfile,
    staleTime: 5 * 60 * 1000,
  });
}