import type { App, Plugin } from 'vue';

type Level = 'warning' | 'error' | 'info' | 'success';

type DialogButton = {
  key: string | boolean;
  title: string;
  color?: string;
  variant?: string;
};

type CreateDialogOptions = {
  title: string;
  text: string;
  buttons?: DialogButton[];
  level?: Level;
};

type CreateNotifyOptions = {
  text: string;
  level?: string;
  location?: string;
  notifyOptions?: any;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: {
      create: (options: CreateDialogOptions) => Promise<string>;
      warn: (text: string, title?: string, cardOptions?: any) => Promise<string>;
      error: (text: string, title?: string, cardOptions?: any) => Promise<string>;
      info: (text: string, title?: string, cardOptions?: any) => Promise<string>;
      success: (text: string, title?: string, cardOptions?: any) => Promise<string>;
      confirm: (
        title: string,
        text: string,
        level?: Level,
        cancelText?: string,
        confirmationText?: string,
        cardOptions?: any,
      ) => Promise<boolean>;
    };

    $notify: {
      create: (options: CreateNotifyOptions) => Promise<string>;
      warn: (text: string, title?: string, notifyOptions?: any) => Promise<string>;
      error: (text: string, title?: string, notifyOptions?: any) => Promise<string>;
      info: (text: string, title?: string, notifyOptions?: any) => Promise<string>;
      success: (text: string, title?: string, notifyOptions?: any) => Promise<string>;
    };
  }
}

type Vuetify3DialogsPlugin = {
  install(app: App, options: { vuetify: Plugin }): void;
};

export const Vuetify3Dialog: Vuetify3DialogsPlugin;
