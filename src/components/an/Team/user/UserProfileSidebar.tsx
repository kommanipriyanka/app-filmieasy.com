import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  name?: string;
  status?: string;
  gender?: string;
  dob?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  department?: string;
  languages?: string[];
  roleType?: string;
  talentTags?: string[];
  experience?: string;
  association?: string;
}

interface UserProfileSidebarProps {
  profile: UserProfile | null;
}

// Helper component for displaying contact/personal info
const InfoItem: React.FC<{
  icon: React.ReactNode;
  value?: string | null;
  smallText?: boolean;
}> = ({ icon, value, smallText = false }) => {
  if (!value) return null;

  return (
    <div className="flex items-start gap-3 text-sm">
      {icon}
      <span className={`text-zinc-400 ${smallText ? "text-xs" : ""} break-all`}>
        {value}
      </span>
    </div>
  );
};

// Helper component for professional detail sections
const DetailSection: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  if (!children) return null;

  return (
    <div>
      <p className="text-xs text-zinc-500 mb-2">{label}</p>
      {children}
    </div>
  );
};

function UserProfileSidebar({ profile }: UserProfileSidebarProps) {
  if (!profile) return null;

  const statusColors: Record<string, string> = {
    available: "bg-green-500/20 text-green-400 border-green-500/30",
    unavailable: "bg-red-500/20 text-red-400 border-red-500/30",
    "partially-available":
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  };

  const hasProfessionalDetails =
    profile.department ||
    (profile.languages && profile.languages.length > 0) ||
    profile.roleType ||
    (profile.talentTags && profile.talentTags.length > 0) ||
    profile.experience ||
    profile.association;

  return (
    <aside className="w-full lg:w-[280px] xl:w-[300px] border-r border-zinc-800/50 p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 overflow-y-auto">
      {" "}
      <div className="flex flex-col items-start gap-3">
        <Avatar className="w-16 h-16 lg:w-20 lg:h-20 border-2 border-zinc-800 rounded-md">
          <AvatarImage
            src={profile.avatar}
            alt={profile.name}
            className="object-cover"
          />
          <AvatarFallback className="bg-zinc-900 text-zinc-400 text-lg lg:text-xl rounded-md">
            {profile.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-lg lg:text-xl font-semibold text-white mb-2">
            {profile.name}
          </h1>
          {profile.status && (
            <Badge
              className={`${
                statusColors[profile.status] ||
                "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
              } border rounded-full px-3 py-1 text-xs font-medium capitalize`}
            >
              {profile.status.replace("-", " ")}
            </Badge>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <InfoItem
          icon={
            <svg
              className="w-4 h-4 text-zinc-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
          value={profile.gender}
        />

        <InfoItem
          icon={
            <svg
              className="w-4 h-4 text-zinc-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
          value={profile.dob}
        />

        <InfoItem
          icon={
            <svg
              className="w-4 h-4 text-zinc-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          }
          value={profile.email}
          smallText
        />

        <InfoItem
          icon={
            <svg
              className="w-4 h-4 text-zinc-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          }
          value={profile.phone}
        />

        <InfoItem
          icon={
            <svg
              className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          value={profile.address}
          smallText
        />
      </div>
      {/* Professional Details */}
      {hasProfessionalDetails && (
        <div className="pt-4 lg:pt-6 border-t border-zinc-800/50">
          <h3 className="text-sm font-semibold text-white mb-4">
            Professional Details
          </h3>

          <div className="space-y-4">
            <DetailSection label="Department">
              {profile.department && (
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.department}
                </Badge>
              )}
            </DetailSection>

            <DetailSection label="Languages Known">
              {profile.languages && profile.languages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <Badge
                      key={lang}
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/20"
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              )}
            </DetailSection>

            <DetailSection label="Role Type">
              {profile.roleType && (
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.roleType}
                </Badge>
              )}
            </DetailSection>

            <DetailSection label="Talent Tags">
              {profile.talentTags && profile.talentTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {profile.talentTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </DetailSection>

            <DetailSection label="Acting Experience">
              {profile.experience && (
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.experience}
                </Badge>
              )}
            </DetailSection>

            <DetailSection label="Association Membership">
              {profile.association && (
                <Badge className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-800">
                  {profile.association}
                </Badge>
              )}
            </DetailSection>
          </div>
        </div>
      )}
    </aside>
  );
}

export default UserProfileSidebar;
