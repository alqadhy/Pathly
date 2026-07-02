export interface UserProfileCard {
  type: "User" | "Job";
  picture: string;
  username: string;
  headline: string;
  connections?: { profilePic: string; text: string };
}
