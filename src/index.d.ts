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

//SFC dialogs methods
export function createDialog(options: CreateDialogOptions): Promise<string>;
export function warnDialog(text: string, title?: string, cardOptions?: VCard['$props']): Promise<string>;
export function errorDialog(text: string, title?: string, cardOptions?: VCard['$props']): Promise<string>;
export function infoDialog(text: string, title?: string, cardOptions?: VCard['$props']): Promise<string>;
export function successDialog(text: string, title?: string, cardOptions?: VCard['$props']): Promise<string>;
export function confirm(
  title: string,
  text: string,
  level?: Level,
  cancelText?: string,
  confirmationText?: string,
  cardOptions?: VCard['$props'],
): Promise<boolean>;

//SFC snackbars methods
export function createNotification(options: CreateNotifyOptions): Promise<string>;
export function notifyWarning(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;
export function notifyError(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;
export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;
export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;

//Vue augmented module declaration
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
