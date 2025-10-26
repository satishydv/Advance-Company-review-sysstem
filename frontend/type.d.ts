export type VibeType = "positive" | "negative" | "neutral";

export type UserType =
  | "individual customer"
  | "business customer"
  | "bank employee"
  | "former employee"
  | "investor"
  | "other";

export interface Review {
  _id: string;
  vibe: VibeType;
  companyName: string;
  isAnonymous: boolean;
  name?: string;
  anonymousId?: string;
  userType: UserType;
  title: string;
  story: string;
  createdAt: string;
  updatedAt: string;
}

export type CompanyType = {
  _id: string;
  name: string;
  positiveCount: number;
  negativeCount: number;
  totalReviews: number;
  nutralCount: number;
  reviews: Review[];
  complaintRate: number;
};
