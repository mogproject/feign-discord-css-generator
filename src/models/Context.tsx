import React from "react";

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

export enum AvatarShape {
  Circle,
  RoundedRectangle,
  Rectangle,
}

export interface AnimationSettings {
  jump: boolean;
  flash: boolean;
  flashColor: string;
  outline: boolean;
  outlineColor: string;
}

export interface FeiSettings {
  mirror: boolean;
  speaking: AnimationSettings;
  interval: number; // additional horizontal margin
}

export interface AvatarSettings {
  show: boolean;
  shape: AvatarShape;
  speaking: AnimationSettings;
  offsetY: number;
}

export interface UsernameSettings {
  show: boolean;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  offsetY: number;
}

export interface ViewSettings {
  fei: FeiSettings;
  avatar: AvatarSettings;
  username: UsernameSettings;
}

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

export const defaultConf = {
  channelURL: "",
  serverID: "",
  channelID: "",
  updateVoiceChannelURL: () => {},
  discordUsers: [],
  updateDiscordUsers: () => {},
  feignPlayers: Array(13).fill(""),
  updateFeignPlayers: () => {},
  viewSettings: {
    fei: {
      mirror: true,
      speaking: {
        jump: true,
        flash: true,
        flashColor: "#ffffff",
        outline: false,
        outlineColor: "#3ba53b",
      },
      interval: 0,
    },
    avatar: {
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
    },
    username: {
      show: true,
      fontSize: 20,
      fontColor: "#ffffff",
      backgroundColor: "#1e2124",
      offsetY: 0,
    },
  },
  updateFeiSettings: () => {},
  updateAvatarSettings: () => {},
  updateUsernameSettings: () => {},
};

// Create a global context.
export const ConfContext = React.createContext<Configuration>(defaultConf);
