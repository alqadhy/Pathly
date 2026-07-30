export const formatTimeAgo = (
  date: string
) => {
  const now = new Date().getTime();

  const created = new Date(date).getTime();

  const diff = now - created;

  const minutes = Math.floor(
    diff / (1000 * 60)
  );

  if (minutes < 1)
    return "Just now";

  if (minutes < 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);

  if (days === 1) return "Yesterday";

  return `${days} days ago`;
};