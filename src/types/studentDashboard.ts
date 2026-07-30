export interface PostProps {
  post: {
    id: string;
    author: {
      name: string;
      headline: string;
      avatar: string;
      timeAgo: string;
    };
    content: string;
    image?: string;
    engagement: {
      likes: number;
      comments: number;
      reposts: number;
    };
    comments?: {
      id: string;
      author: {
        name: string;
        headline: string;
        avatar: string;
        timeAgo: string;
      };
      content: string;
      likes: number;
    }[];
  };
}
