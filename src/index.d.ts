import type { App, Plugin } from 'vue';
import { VBottomSheet } from 'vuetify/labs/VBottomSheet';
import { VBtn } from 'vuetify/lib/components/VBtn/index.mjs';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import { VDialog } from 'vuetify/lib/components/VDialog/index.mjs';
import { VListItem } from 'vuetify/lib/components/VList/index.mjs';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';

export type PluginOptions = {
  vuetify: Plugin;
  defaults?: {
    dialog?: {
      component?: VDialog['$props'];
      card?: VCard['$props'];
    };
    notify?: VSnackbar['$props'];
    bottomSheet?: VBottomSheet['$props'];
  };
};

export type Level = 'warning' | 'error' | 'info' | 'success';

export type DialogButton = Omit<Omit<VBtn['$props'], 'text'>, 'key'> & { title: string; key: string | boolean };

export type CreateDialogOptions = {
  title: string;
  text: string;
  buttons?: DialogButton[];
  level?: Level;
  cardOptions?: VCard['$props'];
};

export type CreateNotifyOptions = {
  text: string;
  level?: string;
  location?: string;
  notifyOptions?: VSnackbar['$props'];
};

export type CreateBottomSheetOptions = {
  title?: string;
  text?: string;
  items?: VListItem['$props'][];
  dialogOptions?: CreateDialogOptions;
};

//SFC dialogs methods
export function createDialog(options: CreateDialogOptions): Promise<string>;
export function warnDialog(
  text: string,
  title?: string,
  cardOptions?: VCard['$props'],
  buttonOptions?: DialogButton,
): Promise<string>;
export function errorDialog(
  text: string,
  title?: string,
  cardOptions?: VCard['$props'],
  buttonOptions?: DialogButton,
): Promise<string>;
export function infoDialog(
  text: string,
  title?: string,
  cardOptions?: VCard['$props'],
  buttonOptions?: DialogButton,
): Promise<string>;
export function successDialog(
  text: string,
  title?: string,
  cardOptions?: VCard['$props'],
  buttonOptions?: DialogButton,
): Promise<string>;
export function confirmDialog(
  title: string,
  text: string,
  level?: Level,
  cancelText?: string,
  confirmationText?: string,
  cardOptions?: VCard['$props'],
  cancelButtonOptions?: DialogButton,
  confirmationButtonOptions?: DialogButton,
): Promise<boolean>;

//SFC snackbars methods
export function createNotification(options: CreateNotifyOptions): Promise<string>;
export function notifyWarning(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;
export function notifyError(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;
export function notifyInfo(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;
export function notifySuccess(text: string, notifyOptions?: VSnackbar['$props']): Promise<string>;

//SFC bottom sheets methods
export function createBottomSheet(options: CreateBottomSheetOptions): Promise<string>;
export function createBottomSheetList(
  items: VListItem['$props'][],
  options?: CreateBottomSheetOptions,
): Promise<string>;

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

    $bottomSheet: {
      create: (options: CreateBottomSheetOptions) => Promise<string>;
      createList: (items: VListItem['$props'][], options?: CreateBottomSheetOptions) => Promise<string>;
    };
  }
}

type Vuetify3DialogsPlugin = {
  install(app: App, options: PluginOptions): void;
};

export const Vuetify3Dialog: Vuetify3DialogsPlugin;
