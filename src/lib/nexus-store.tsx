import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  initialNotifications,
  initialReminders,
  teamPosts as seedTeamPosts,
  type NexusNotification,
  type Reminder,
  type TeamPost,
} from "./nexus-data";

export type Idea = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  domain: string;
  skills: string;
  support: string[];
  status: "Pending Review" | "In Pipeline";
};

export type MentorshipRequest = {
  id: string;
  expert: string;
  reason: string;
  message: string;
  time: string;
  status: "Pending";
};

export type Profile = {
  name: string;
  branch: string;
  year: string;
  email: string;
  bio: string;
  skills: string[];
  interests: string[];
};

type Ctx = {
  profile: Profile;
  updateProfile: (p: Partial<Profile>) => void;
  saved: string[];
  toggleSave: (id: string, name: string) => void;
  registered: string[];
  register: (id: string, name: string) => void;
  reminders: Reminder[];
  reminderKeys: string[];
  addReminder: (r: Omit<Reminder, "id">, key: string) => void;
  dismissReminder: (id: string) => void;
  joinedClubs: string[];
  joinClub: (id: string, name: string) => void;
  joinedTeams: string[];
  joinTeam: (id: string, name: string) => void;
  posts: TeamPost[];
  addPost: (p: Omit<TeamPost, "id">) => void;
  ideas: Idea[];
  addIdea: (i: Omit<Idea, "id" | "status">) => void;
  mentorships: MentorshipRequest[];
  addMentorship: (m: Omit<MentorshipRequest, "id" | "status" | "time">) => void;
  notifications: NexusNotification[];
  unread: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

const NexusContext = createContext<Ctx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

export function NexusProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>({
    name: "Aarav Sharma",
    branch: "CSE - AIML",
    year: "2nd Year",
    email: "aarav.sharma@college.edu",
    bio: "2nd year AIML student who likes building useful things. Currently exploring applied ML and cloud.",
    skills: ["Java", "Python", "C", "AI/ML", "Web Development", "DSA"],
    interests: ["Applied AI", "Product Design", "Startups", "Open Source"],
  });
  const [saved, setSaved] = useState<string[]>(["ai-ideathon"]);
  const [registered, setRegistered] = useState<string[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [reminderKeys, setReminderKeys] = useState<string[]>([]);
  const [joinedClubs, setJoinedClubs] = useState<string[]>(["ai-club"]);
  const [joinedTeams, setJoinedTeams] = useState<string[]>([]);
  const [posts, setPosts] = useState<TeamPost[]>(seedTeamPosts);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [mentorships, setMentorships] = useState<MentorshipRequest[]>([]);
  const [notifications, setNotifications] = useState<NexusNotification[]>(initialNotifications);

  const value: Ctx = useMemo(
    () => ({
      profile,
      updateProfile: (p) => {
        setProfile((prev) => ({ ...prev, ...p }));
        toast.success("Profile updated.");
      },
      saved,
      toggleSave: (id, name) => {
        setSaved((prev) => {
          const has = prev.includes(id);
          toast.success(has ? "Removed from saved." : `Opportunity saved — ${name}`);
          return has ? prev.filter((x) => x !== id) : [...prev, id];
        });
      },
      registered,
      register: (id, name) => {
        setRegistered((prev) => (prev.includes(id) ? prev : [...prev, id]));
        toast.success(`Registration initiated — ${name}`);
      },
      reminders,
      reminderKeys,
      addReminder: (r, key) => {
        setReminderKeys((prev) => (prev.includes(key) ? prev : [...prev, key]));
        setReminders((prev) => [{ ...r, id: uid() }, ...prev]);
        toast.success("Reminder added.");
      },
      dismissReminder: (id) => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
        toast("Reminder dismissed.");
      },
      joinedClubs,
      joinClub: (id, name) => {
        setJoinedClubs((prev) => (prev.includes(id) ? prev : [...prev, id]));
        toast.success(`You joined ${name}.`);
      },
      joinedTeams,
      joinTeam: (id, name) => {
        setJoinedTeams((prev) => (prev.includes(id) ? prev : [...prev, id]));
        toast.success(`Request sent to ${name}.`);
      },
      posts,
      addPost: (p) => {
        setPosts((prev) => [{ ...p, id: uid() }, ...prev]);
        toast.success("Team requirement posted successfully.");
      },
      ideas,
      addIdea: (i) => {
        setIdeas((prev) => [{ ...i, id: uid(), status: "Pending Review" }, ...prev]);
        toast.success("Idea submitted successfully.");
      },
      mentorships,
      addMentorship: (m) => {
        setMentorships((prev) => [
          { ...m, id: uid(), status: "Pending", time: "Just now" },
          ...prev,
        ]);
        toast.success("Mentorship request sent successfully.");
      },
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      markRead: (id) =>
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllRead: () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        toast("All notifications marked as read.");
      },
    }),
    [profile, saved, registered, reminders, reminderKeys, joinedClubs, joinedTeams, posts, ideas, mentorships, notifications],
  );

  return <NexusContext.Provider value={value}>{children}</NexusContext.Provider>;
}

export function useNexus() {
  const ctx = useContext(NexusContext);
  if (!ctx) throw new Error("useNexus must be used inside NexusProvider");
  return ctx;
}
