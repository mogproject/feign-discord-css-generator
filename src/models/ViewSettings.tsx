
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
  front: boolean;
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

export class ViewSettings {
  fei: FeiSettings;
  avatar: AvatarSettings;
  username: UsernameSettings;

  static readonly DEFAULT_TOP_MARGIN = 40;
  static readonly DEFAULT_BOTTOM_MARGIN = 18;
  static readonly FEI_WIDTH = 134;
  static readonly FEI_HEIGHT = 200;
  static readonly AVATAR_WIDTH = 120;
  static readonly AVATAR_HEIGHT = 120;
  static readonly DEFAULT_AVATAR_OVERLAP = 132;
  static readonly DEFAULT_USERNAME_OVERLAP = 22;
  static readonly USERNAME_WIDTH = 126; // FEI_WIDTH - 8
  static readonly USERNAME_HEIGHT = 36;

  constructor(feiSettings: FeiSettings, avatarSettings: AvatarSettings, usernameSettings: UsernameSettings) {
    this.fei = feiSettings;
    this.avatar = avatarSettings;
    this.username = usernameSettings;
  }

  // Dimensions.
  getFeiWidth(): number { return ViewSettings.FEI_WIDTH; }
  getFeiHeight(): number { return ViewSettings.FEI_HEIGHT; }
  getAvatarWidth(): number { return ViewSettings.AVATAR_WIDTH; }
  getAvatarHeight(): number { return ViewSettings.AVATAR_HEIGHT; }
  getUsernameWidth(): number { return ViewSettings.USERNAME_WIDTH; }
  getUsernameHeight(): number { return ViewSettings.USERNAME_HEIGHT; }

  // Positions relative to Fei's top.
  getFeiTopRelative(): number { return 0; }
  getFeiBottomRelative(): number { return this.getFeiHeight(); }
  getAvatarTopRelative(): number {
    return this.getFeiBottomRelative() +
      (this.avatar.show ? (this.avatar.offsetY - ViewSettings.DEFAULT_AVATAR_OVERLAP) : 0);
  }
  getAvatarBottomRelative(): number {
    return this.getAvatarTopRelative() + (this.avatar.show ? this.getAvatarHeight() : 0);
  }
  getUsernameTopRelative(): number {
    return this.getAvatarBottomRelative() +
      (this.username.show ? (this.username.offsetY - ViewSettings.DEFAULT_USERNAME_OVERLAP) : 0);
  }
  getUsernameBottomRelative(): number {
    return this.getUsernameTopRelative() + (this.username.show ? this.getUsernameHeight() : 0);
  }

  // Top-most and bottom-most elements.
  getTopElementRelative(): number { return Math.min(this.getFeiTopRelative(), this.getAvatarTopRelative(), this.getUsernameTopRelative()); }
  getBottomElementRelative(): number { return Math.max(this.getFeiBottomRelative(), this.getAvatarBottomRelative(), this.getUsernameBottomRelative()); }

  // Margins (relative to their parent nodes).
  getFeiMarginTop(): number { return ViewSettings.DEFAULT_TOP_MARGIN - this.getTopElementRelative(); }
  getAvatarMarginTop(): number { return this.getAvatarTopRelative() - this.getFeiBottomRelative(); }
  getUsernameMarginTop(): number { return this.getUsernameTopRelative() - this.getAvatarBottomRelative(); }
  getUsernameMarginBottom(): number { return ViewSettings.DEFAULT_BOTTOM_MARGIN; }

  // Overall height.
  getHeight(): number {
    return this.getFeiMarginTop() + this.getBottomElementRelative() + ViewSettings.DEFAULT_BOTTOM_MARGIN;
  }
};
