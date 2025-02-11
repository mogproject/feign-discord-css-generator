import React from "react";
import { AvatarSettings, AvatarShape, FeiSettings, StreamerSettings, UsernameSettings, ViewSettings } from "./ViewSettings";
import packageJson from '../../package.json'; // Adjust the path as needed

export const APP_VERSION = packageJson.version

export interface DiscordUser {
  name: string;
  id: string;
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
  discordUserEditing: { index: number, name: string, id: string };
  updateDiscordUsers: (users: DiscordUser[]) => void;
  cleanDiscordId: (id: string) => void;
  updateDiscordUserEditing: (index: number, name: string, id: string) => void;
  feignPlayers: string[];
  updateFeignPlayers: (players: string[]) => void;
  viewSettings: ViewSettings;
  updateFeiSettings: (settings: FeiSettings) => void;
  updateAvatarSettings: (settings: AvatarSettings) => void;
  updateUsernameSettings: (settings: UsernameSettings) => void;
  updateStreamerSettings: (settings: StreamerSettings) => void;
  isSpeaking: boolean[];
  updateIsSpeaking: (data: boolean[]) => void;
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
  front: true,
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

const defaultStreamerSettings: StreamerSettings = {
  showStreamerFirst: false,
};

export const defaultConf = {
  channelURL: "",
  serverID: "",
  channelID: "",
  updateVoiceChannelURL: () => { },
  discordUsers: [],
  discordUserEditing: { index: 0, name: '', id: '' },
  updateDiscordUsers: () => { },
  cleanDiscordId: () => { },
  updateDiscordUserEditing: () => { },
  feignPlayers: Array(13).fill(""),
  updateFeignPlayers: () => { },
  viewSettings: new ViewSettings(defaultFeiSettings, defaultAvatarSettings, defaultUsernameSettings, defaultStreamerSettings),
  updateFeiSettings: () => { },
  updateAvatarSettings: () => { },
  updateUsernameSettings: () => { },
  updateStreamerSettings: () => { },
  isSpeaking: [],
  updateIsSpeaking: () => { },
};

// Create a global context.
export const ConfContext = React.createContext<Configuration>(defaultConf);

const CHANNEL_URL_PATTERN = /^https:[/][/]discord.com[/]channels[/](\d+)[/](\d+)[/]?$/;

export function isValidVoiceChannelURL(voiceChannelURL: string): boolean {
  return CHANNEL_URL_PATTERN.test(voiceChannelURL);
}

export function retrieveChannelIDs(voiceChannelURL: string): [string, string] {
  const result = voiceChannelURL.match(CHANNEL_URL_PATTERN);
  return result ? [result[1], result[2]] : ["", ""];
}

export function players2array(feignPlayers: string[]) {
  const numActivePlayers = feignPlayers.filter((id: string) => id !== '').length;
  return Array(numActivePlayers).fill(false);
}
