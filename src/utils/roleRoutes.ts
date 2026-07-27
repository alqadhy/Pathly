import { ROLES } from "../roles";

export const getRoleRoute = (
  role: string,
  path: "profile" | "notifications"
) => {
  switch (role) {
    case ROLES.ADMIN:
      return path === "notifications"
        ? `/${ROLES.ADMIN}/notifications`
        : `/${ROLES.ADMIN}/profile`;

    case ROLES.COMPANY:
      return path === "notifications"
        ? `/${ROLES.COMPANY}/notifications`
        : `/${ROLES.COMPANY}/profile`;

    case ROLES.USER:
    default:
      return path === "notifications"
        ? `/${ROLES.USER}/notifications`
        : `/${ROLES.USER}/profile`;
  }
};