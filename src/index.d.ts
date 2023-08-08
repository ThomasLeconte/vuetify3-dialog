import type { App, Plugin } from 'vue';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import { VDialog } from 'vuetify/lib/components/VDialog/index.mjs';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';

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
  cardOptions?: VCard['$props'];
};

type CreateNotifyOptions = {
  text: string;
  level?: string;
  location?: string;
  notifyOptions?: VSnackbar['$props'];
};

type PluginOptions = {
  vuetify: Plugin;
  defaults?: {
    dialog?: {
      component?: VDialog['$props'];
      card?: VCard['$props'];
    };
    notify?: VSnackbar['$props'];
  };
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
  install(app: App, options: PluginOptions): void;
};

export const Vuetify3Dialog: Vuetify3DialogsPlugin;
