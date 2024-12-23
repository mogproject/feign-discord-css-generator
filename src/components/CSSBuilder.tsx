import { FEI_COLORS } from "./Context";

export function buildCSS(feignPlayers: string[]): string {
  const feiWidth = 134;
  const feiHeight = 200;

  const prefix = ["/* CSS built on https://feign.mogproject.com */", ""];

  const fei = feignPlayers.flatMap((id: string, i: number) =>
    id === ""
      ? []
      : [
          // Character
          `.voice_state[data-userid="${id}"]::before  {`,
          `  background-image: var(--feign-icon-${FEI_COLORS[i]});`,
          `  background-size: ${feiWidth}px ${feiHeight}px;`,
          "  display: inline-block;",
          '  content:"";',
          "  position: relative;",
          `  width: ${feiWidth}px;`,
          `  height: ${feiHeight}px;`,
          "  border-radius: 0;",
          "  filter: brightness(65%);",
          "  text-align: center;",
          "  margin-top: 20px;",
          "  top: 20px;",
          "  -webkit-transform: scaleX(-1);",
          "  transform: scaleX(-1);",
          "}",

          // Animation
          `.wrapper_speaking[data-userid="${id}"]::before  {`,
          "  animation: 750ms infinite alternate ease-in-out speak-light, 750ms infinite alternate ease-in-out speak-jump;",
          "  animation-duration: 750ms;",
          "  animation-fill-mode: forwards;",
          "  animation-iteration-count: infinite;",
          "  filter: brightness(100%);",
          "}",
        ]
  );

  const animation = [
    // Jump
    "@keyframes speak-jump { 0% {top: 20px;} 50% {top: 0px;} 100% {top: 20px;} }",

    // Light
    "@keyframes speak-light {",
    "  0% {filter: drop-shadow(0 0 2px #ffffff) brightness(100%) drop-shadow(2px 2px 0px #ffffff) drop-shadow(-2px -2px 0px #ffffff) drop-shadow(-2px 2px 0px #ffffff) drop-shadow(2px -2px 0px #ffffff);}",
    "  50% {filter: drop-shadow(0 0 4px #ffffff) brightness(100%) drop-shadow(2px 2px 0px #ffffff) drop-shadow(-2px -2px 0px #ffffff) drop-shadow(-2px 2px 0px #ffffff) drop-shadow(2px -2px 0px #ffffff);}",
    "  100% {filter: drop-shadow(0 0 2px #ffffff) brightness(100%) drop-shadow(2px 2px 0px #ffffff) drop-shadow(-2px -2px 0px #ffffff) drop-shadow(-2px 2px 0px #ffffff) drop-shadow(2px -2px 0px #ffffff);}",
    "}",
  ];

  const data = [
    ".voice_states {display: flex; flex-wrap: nowrap; margin: 0px 15px 0px 15px; padding: 0;}",
    ".voice_state {height: auto; margin-bottom: 0; display: flex; flex-direction: column;}",

    // Avatar image
    ".voice_avatar {",
    "  margin: -112px 4px 0px 12px;",
    "  width: 120px;",
    "  height: 120px;",
    "  border-radius: 50%;",
    "  filter: brightness(35%);",
    "}",

    // Avatar speaking
    'img[class*="Voice_avatarSpeaking"] {',
    "  border-width: 5px;",
    "  filter: brightness(100%);",
    "}",

    // User name
    ".voice_username {margin-left: 6px;}",
    '[class*="Voice_name__"] {',
    "  font-size: 25px !important;",
    "  height: 36px;",
    "  width: 130px;",
    "  margin: -40px 0px 0px 0px;",
    "  padding: 10px 0px 0px 0px;",
    "  box-sizing: border-box;",
    "  text-overflow: clip;",
    "  white-space: nowrap;",
    "  overflow: hidden;",
    "  display: block;",
    "  text-align: center;",
    "  position: relative;",
    "}",
  ];
  return [...prefix, ...fei, ...animation, ...data].map((s) => s.trim()).join("\n");
}
