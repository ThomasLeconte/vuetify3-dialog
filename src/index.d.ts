import type { Plugin } from 'vue';

type CreateDialogOptions = {
  title: string;
  text: string;
  buttons?: DialogButton[];
  level?: Level;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: {
      create: (options: CreateDialogOptions) => Promise<string>;
      warn: (text: string, title?: string) => Promise<string>;
      error: (text: string, title?: string) => Promise<string>;
      info: (text: string, title?: string) => Promise<string>;
      success: (text: string, title?: string) => Promise<string>;
      confirm: (
        title: string,
        text: string,
        level?: Level,
        cancelText?: string,
        confirmationText?: string,
      ) => Promise<boolean>;
    };

    $notify: {
      create: (options: CreateNotifyOptions) => Promise<string>;
      warn: (text: string, title?: string) => Promise<string>;
      error: (text: string, title?: string) => Promise<string>;
      info: (text: string, title?: string) => Promise<string>;
      success: (text: string, title?: string) => Promise<string>;
    };
  }
}

type Vuetify3DialogsPlugin = {
  install(app: App, options: { vuetify: Plugin }): void;
};

export const Vuetify3Dialogs: Vuetify3DialogsPlugin;
