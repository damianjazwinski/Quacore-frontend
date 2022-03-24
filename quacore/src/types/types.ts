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
  joinDate: Date;
};

export type JwtToken = {
  User: string;
  Username: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
};

export type GetFeedResponse = {
  quacks: Quack[];
  areAnyQuacksLeft: boolean;
};
