const ja = {
  // Common terms.
  edit: '編集',
  save: '保存',
  add: '追加',
  cancel: 'キャンセル',
  name: '名前',
  remove: '削除',
  copy: 'コピー',
  copied: 'コピー完了!',
  copy_failed: 'コピー失敗!',
  show: '表示',
  color: '色',

  app_title: 'もぐぷろふぇいん',

  // Colors.
  colors: {
    white: '白',
    salmon: '薄橙',
    purple: '紫',
    green: '緑',
    blue: '青',
    red: '赤',
    yellow: '黄色',
    lime: '黄緑',
    sky: '水色',
    pink: '薄桃',
    brown: '茶色',
    rose: '濃桃',
    orange: '濃橙',
  },
  features: {
    features: '特徴',
    part1: '全ての設定は、お使いのブラウザにのみ保存されます。設定内容が外部に送信されることはありません。',
    part2: '単一の CSS で Discord アイコンと Feign のキャラクターを同時に表示します。',
    part3: 'CSS 内部に画像情報を保存しているため、外部依存を減らすことができます。',
    part4: '簡易的なユーザー管理により、過去の情報を再利用できます。',
  },
  settings: {
    settings: '設定',
    saveload: {
      save_all: '全ての設定を保存',
      save_all_but_view: '表示設定以外を保存',
      save_all_but_view_anonymized: '表示設定以外を匿名化して保存',
      save_view_only: '表示設定のみを保存',
      load_all: '全ての設定を読み込み',
      load_all_but_view: '表示設定以外を読み込み',
      load_view_only: '表示設定のみを読み込み',
      initialize_all: '全ての設定を初期化',
      initialization: '初期設定に戻す',
      confirm_initialization: '全ての設定を初期状態に戻します。よろしいですか?',
      cancel: 'キャンセル',
      initialize: '初期設定に戻す',
    },
    discord_voice_channel: 'Discord ボイスチャンネル',
    channel: {
      description: 'Discord を起動し、対象のボイスチャンネルを右クリック → 「リンクをコピー」を選択。以下のフォームに貼り付けてください。',
      placeholder: 'URL を入力',
      feedback: 'https://discord.com/channels/ で始まる URL を入力してください',
    },
    discord_user_management: 'Discord ユーザー管理',
    discord: {
      description: 'Discord のユーザー ID を取得するには、まず「設定」 → 「詳細設定」 → 「開発者モード」を有効にします。' +
        ' その後、対象のユーザーを右クリック → 「ユーザーIDをコピー」を行い、以下に貼り付けてください。' +
        ' ここで登録する名前は、Discord 上の名前と異なっていても問題ありません。',
      already_exists: '既に存在します',
      number_only: 'ID には数字のみ含まれます',
      name_placeholder: '名前を入力',
      id_placeholder: 'Discord ID を入力',
      removal: 'Discord ユーザーの削除',
      confirm_removal: '以下のユーザーを削除します。よろしいですか?',
    },
    feign_player_settings: 'Feign プレイヤー設定',
    overlay_settings: 'オーバーレイ詳細設定',
    overlay: {
      initialize: '初期設定に戻す',
      initialization: '初期設定に戻す',
      initialization_description: '表示設定を初期状態に戻します。よろしいですか?',
      feign_characters: 'Feign キャラクター',
      facing: '顔の向き',
      facing_left: '左向き',
      facing_right: '右向き',
      interval: '間隔',
      speaking_behavior: '会話中の動作',
      discord_avatar: 'Discord アバター',
      show_front: '前面に表示',
      shape: '形状',
      circle: '丸',
      rounded_rectangle: '角丸四角',
      rectangle: '四角',
      vertical_offset: '縦位置調整',
      username: 'ユーザー名',
      font: 'フォント',
      size: 'サイズ',
      font_color: 'フォント色',
      background: '背景色',
      background_color: '背景色',
      jump: 'ぴょこぴょこ',
      flash: '発光',
      flash_color: '発光色',
      outline: '縁取り',
      outline_color: '縁取り色',
      show_my_avatar_first: '自分を先頭に表示',
    },
  },
  preview: {
    preview: 'プレビュー',
    description: 'アイコンをクリックすると会話状態が切り替わります。',
  },
  obs: {
    obs_settings: 'OBS 設定',
    description: '「ソース」 → 「ブラウザ」 のプロパティ画面にて、以下の内容を設定してください。',
    width: '幅',
    height: '高さ',
    size_notes: 'これらより大きい値を入力しても、動作に影響はありません。',
    custom_css: 'カスタム CSS',
    copy_to_clipboard: 'クリップボードにコピー',
    save_as_file: 'ファイルとして保存',
    invalid_channel_url: 'ボイスチャンネル URL が正しく設定されていません',
  },
  add_feign_player: 'Feign プレイヤーを追加してください。',
};
export default ja;
