export type SamuelType = {
  getContext: () => SamuelContext;
  getUser: () => SamuelUser;
  getTheme: () => SamuelTheme;
  getConfig: () => SamuelConfig;
  on: (eventName: string, callback: (params?: any) => any) => any;
  off: (eventName: string, callback: (params?: any) => any) => any;
};

export type SamuelUser = {
  uid: string;
  firstName: string;
  lastName?: string;
  email: string;
};

export type SamuelContext = any;

export type SamuelTheme = {
  palette?: {
    background?: string;
    backgroundDefault?: string;
    foreground?: string;
    primary?: {
      default?: string;
      light?: string;
      dark?: string;
      foreground?: string;
    };
    ring?: string;
  };
  avatar?: string;
};

export type SamuelConfig = {
  appId: string;
  widgetKey: string;
  chatWidgetAIPersonaId?: string;
  serverUrl: string;
  theme?: SamuelTheme;
};
