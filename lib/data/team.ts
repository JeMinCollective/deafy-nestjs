import type { TeamMember } from "@/types/team";

/**
 * Swap `image` for files in `/public/team/` when you have assets, e.g.
 * `/team/alex.jpg`. Source: `lib/data/team.ts`.
 */
export const teamMembers: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Product & accessibility",
    bio: "Leading Deafy product with inclusive, Deaf-led design decisions.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Jordan Kim",
    role: "ML & computer vision",
    bio: "Building the models that power Deafy's hand-signing recognition.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Sam Okonkwo",
    role: "Mobile engineering",
    bio: "Shipping a fast, private Deafy experience on Android.",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces",
  },
  {
    name: "Morgan Lee",
    role: "Community & beta",
    bio: "Running the Deafy beta and turning tester feedback into better accuracy.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces",
  },
];
