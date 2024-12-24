import { ViewSettings, AvatarShape, AnimationSettings } from './ViewSettings';
import { FEI_COLORS, APP_VERSION } from "./Context";

function hex2rgba(hex: string, alpha: number): string {
  if (hex.length !== 7 || !hex.startsWith("#")) return hex;
  const colors = [1, 3, 5].map((i: number) => parseInt(hex.substring(i, i + 2), 16).toString()).join(",");
  return `rgba(${colors},${alpha})`;
}

function animationString(settings: AnimationSettings, prefix: string): string {
  const ret = [
    [`${prefix}flash`, settings.flash],
    ["jump", settings.jump],
  ].reduce((acc, [t, enabled]) => {
    if (!enabled) return acc;
    const delimiter = acc === "" ? "" : ",";
    return acc + delimiter + `750ms infinite alternate ease-in-out speak-${t}`;
  }, "");
  return ret === "" ? "none" : ret;
}

const glowFilter = (x: number, c: string) => {
  const prefix = `drop-shadow(0 0 ${x}px ${c}) brightness(100%) `;
  const suffix = [
    [2, 2],
    [-2, -2],
    [-2, 2],
    [2, -2],
  ]
    .map(([i, j]) => `drop-shadow(${i}px ${j}px 0px ${c})`)
    .join(" ");
  return prefix + suffix;
};

export function buildCSS(feignPlayers: string[], settings: ViewSettings): string {
  const avatarBorderWidth = 5;
  const glowAmount = 6;

  const now = new Date().toISOString();
  const prefix = `/* CSS built on https://feign.mogproject.com (v${APP_VERSION}). ${now}. */\n\n`;

  const fei = feignPlayers.flatMap((id: string, i: number) =>
    id === ""
      ? []
      : [
        // Character
        `.voice_state[data-userid="${id}"]::before {`,
        `  background-image: var(--feign-icon-${FEI_COLORS[i]});`,
        `  background-size: ${settings.getFeiWidth()}px ${settings.getFeiHeight()}px;`,
        "  display: inline-block;",
        '  content: "";',
        `  width: ${settings.getFeiWidth()}px;`,
        `  height: ${settings.getFeiHeight()}px;`,
        "  border-radius: 0;",
        "  filter: brightness(65%);",
        "  text-align: center;",
        `  margin-top: ${settings.getFeiMarginTop()}px;`,
        "  position: relative;",
        "  top: 0px;",
        settings.fei.mirror ? "  -webkit-transform: scaleX(-1);" : "",
        settings.fei.mirror ? "  transform: scaleX(-1);" : "",
        settings.avatar.front ? '' : '  z-index: 1;',
        "}",

        // Animation
        `.wrapper_speaking[data-userid="${id}"]::before {`,
        `  animation: ${animationString(settings.fei.speaking, "")};`,
        "  animation-fill-mode: forwards;",
        "  filter: brightness(100%);",
        "}",
      ]
  );

  const animJumpFei = settings.fei.speaking.jump ? ["@keyframes speak-jump { 0% {top: 0px;} 50% {top: -20px;} 100% {top: 0px;} }"] : [];

  const animFlashFei = settings.fei.speaking.flash
    ? [
      "@keyframes speak-flash {",
      `  0% {filter:${glowFilter(2, settings.fei.speaking.flashColor)};}`,
      `  50% {filter:${glowFilter(glowAmount, settings.fei.speaking.flashColor)};}`,
      `  100% {filter:${glowFilter(2, settings.fei.speaking.flashColor)};}`,
      "}",
    ]
    : [];

  const animFlashAvatar = settings.avatar.speaking.flash
    ? [
      "@keyframes speak-avatar-flash {",
      `  0% {filter:${glowFilter(2, settings.avatar.speaking.flashColor)};}`,
      `  50% {filter:${glowFilter(glowAmount, settings.avatar.speaking.flashColor)};}`,
      `  100% {filter:${glowFilter(2, settings.avatar.speaking.flashColor)};}`,
      "}",
    ]
    : [];

  const animation = [...animJumpFei, ...animFlashFei, ...animFlashAvatar];

  const avatarRadius =
    { [AvatarShape.Circle]: 50, [AvatarShape.RoundedRectangle]: 12, [AvatarShape.Rectangle]: 0 }[settings.avatar.shape] ?? 0;

  const usernameOpacity = 0.95;

  const avatarAnimation = [`  animation: ${animationString(settings.avatar.speaking, "avatar-")};`, "  animation-fill-mode: forwards;"];

  const data = [
    ".voice_states {display: flex; flex-wrap: nowrap; margin: 0px 15px 0px 15px; padding: 0;}",
    `.voice_state {height: auto; margin: 0 ${settings.fei.interval}px 0 0; display: flex; flex-direction: column;}`,

    // Avatar image
    ".voice_avatar {",
    settings.avatar.show ? "" : "display: none;",
    `  margin: ${settings.getAvatarMarginTop()}px auto 0px auto;`,
    `  width: ${settings.getAvatarWidth()}px;`,
    `  height: ${settings.getAvatarHeight()}px;`,
    `  border-radius: ${avatarRadius}%;`,
    `  border-width: ${avatarBorderWidth}px;`,
    "  filter: brightness(35%);",
    "  position: relative;",
    "  top: 0px;",
    "}",

    // Avatar speaking
    'img[class*="Voice_avatarSpeaking"] {',
    `  border-color: ${settings.avatar.speaking.outline ? settings.avatar.speaking.outlineColor : "transparent"} !important;`,
    "  filter: brightness(100%);",
    ...avatarAnimation,
    "}",

    // User name
    ".voice_username {",
    settings.username.show ? "" : "display: none;",
    `  height: ${settings.getUsernameHeight()}px;`,
    `  margin: ${settings.getUsernameMarginTop()}px 0 ${settings.getUsernameMarginBottom()}px 0;`,
    '  padding: 0;',
    "}",
    '[class*="Voice_name__"] {',
    `  font-size: ${settings.username.fontSize}px !important;`,
    `  color: ${settings.username.fontColor} !important;`,
    `  background-color: ${hex2rgba(settings.username.backgroundColor, usernameOpacity)} !important;`,
    "  height: 100%;",
    `  width: ${settings.getUsernameWidth()}px;`,
    `  margin: 0 auto 0px auto;`,
    "  padding: 10px 0px 0px 0px;",
    "  box-sizing: border-box;",
    "  text-overflow: clip;",
    "  white-space: nowrap;",
    "  overflow: hidden;",
    "  display: block;",
    "  text-align: center;",
    "  position: relative;",
    settings.avatar.front ? '' : '  z-index: 2;',
    "}",
  ];
  return (
    prefix +
    [...fei, ...animation, ...data]
      .map((s) => s.trim())
      .filter((s) => s)
      .join("\n")
  );
}