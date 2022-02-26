export type Quack = {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  username: string;
  mentions: string[];
};

export type Profile = {
  description: string | null;
  avatarImageLink: string | null;
  bannerImageLink: string | null;
  username: string;
};
