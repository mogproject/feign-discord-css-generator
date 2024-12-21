import React from "react";

export interface DiscordUser {
  name: string;
  id: string;
}

export enum FeiColor {
  FeiWhite = 0,
  FeiSalmon = 1,
  FeiPurple = 2,
  FeiGreen = 3,
  FeiBlue = 4,
  FeiRed = 5,
  FeiYellow = 6,
  FeiLime = 7,
  FeiSky = 8,
  FeiBrown = 9,
  FeiPink = 10,
  FeiRose = 11,
  FeiOrange = 12,
}

export const FEI_COLORS: string[] = [
  "white",
  "salmon",
  "purple",
  "green",
  "blue",
  "red",
  "yellow",
  "lime",
  "sky",
  "pink",
  "brown",
  "rose",
  "orange",
];

interface Configuration {
  channelURL: string;
  serverID: string;
  channelID: string;
  discordUsers: DiscordUser[];
  updateDiscordUsers: (users: DiscordUser[]) => void;
  feignPlayers: string[];
  updateFeignPlayers: (players: string[]) => void;
}

// Create a global context.
export const ConfContext = React.createContext<Configuration>({
  channelURL: "",
  serverID: "",
  channelID: "",
  discordUsers: [],
  updateDiscordUsers: () => {},
  feignPlayers: Array(13).fill(""),
  updateFeignPlayers: () => {},
});
