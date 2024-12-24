import React from "react";
import { AvatarSettings, AvatarShape, FeiSettings, UsernameSettings, ViewSettings } from "./ViewSettings";

export const APP_VERSION = '0.0.1'

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
  updateVoiceChannelURL: (url: string) => void;
  discordUsers: DiscordUser[];
  updateDiscordUsers: (users: DiscordUser[]) => void;
  feignPlayers: string[];
  updateFeignPlayers: (players: string[]) => void;
  viewSettings: ViewSettings;
  updateFeiSettings: (settings: FeiSettings) => void;
  updateAvatarSettings: (settings: AvatarSettings) => void;
  updateUsernameSettings: (settings: UsernameSettings) => void;
}

const defaultFeiSettings: FeiSettings = {
  mirror: true,
  speaking: {
    jump: true,
    flash: true,
    flashColor: "#ffffff",
    outline: false,
    outlineColor: "#3ba53b",
  },
  interval: 0,
};

const defaultAvatarSettings: AvatarSettings = {
  show: true,
  shape: AvatarShape.Circle,
  speaking: {
    jump: false,
    flash: false,
    flashColor: "#ffffff",
    outline: true,
    outlineColor: "#3ba53b",
  },
  offsetY: 0,
};

const defaultUsernameSettings: UsernameSettings = {
  show: true,
  fontSize: 20,
  fontColor: "#ffffff",
  backgroundColor: "#1e2124",
  offsetY: 0,
};

export const defaultConf = {
  channelURL: "",
  serverID: "",
  channelID: "",
  updateVoiceChannelURL: () => { },
  discordUsers: [],
  updateDiscordUsers: () => { },
  feignPlayers: Array(13).fill(""),
  updateFeignPlayers: () => { },
  viewSettings: new ViewSettings(defaultFeiSettings, defaultAvatarSettings, defaultUsernameSettings),
  updateFeiSettings: () => { },
  updateAvatarSettings: () => { },
  updateUsernameSettings: () => { },
};

// Create a global context.
export const ConfContext = React.createContext<Configuration>(defaultConf);
