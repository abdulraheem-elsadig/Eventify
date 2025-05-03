export type Event = {
  id: number;
  title: string;
  location: string;
  description: string;
  type:
    | "Conference"
    | "Exhibition"
    | "Seminar"
    | "Festival"
    | "Expo"
    | "Concert"
    | "Competition";
  starts_at: string;
  expires_at: string;
  image_url: string;
};
