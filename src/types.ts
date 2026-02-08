import { Component, Plugin } from 'vue';
import { VBottomSheet } from 'vuetify/lib/components/VBottomSheet/index.mjs';
import { VBtn } from 'vuetify/lib/components/VBtn/index.mjs';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import { VDialog } from 'vuetify/lib/components/VDialog/index.mjs';
import { VListItem } from 'vuetify/lib/components/VList/index.mjs';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';
import { VBanner } from 'vuetify/lib/components/VBanner/index.mjs';

export type PluginOptions = {
  defaults?: {
    dialog?: {
      component?: VDialog['$props'];
      card?: VCard['$props'];
    };
    notify?: VSnackbar['$props'];
    bottomSheet?: VBottomSheet['$props'];
    banner?: VBanner['$props'];
  };
  vuetify?: Plugin;
};

export type Level = 'warning' | 'error' | 'info' | 'success';

export type DialogButton = Omit<Omit<VBtn['$props'], 'text'>, 'key'> & { title: string; key: string | boolean };

export type ComponentOptions = {
  component: Component;
  props: any;
};

export type BasicDialogOptions = {
  text: string;
  title?: string;
  icon?: string;
  cardOptions?: VCard['$props'];
  buttonOptions?: DialogButton;
};

export type ConfirmDialogOptions = {
  title: string;
  text: string;
  icon?: string;
  level?: Level;
  cancelText?: string;
  confirmationText?: string;
  cardOptions?: VCard['$props'];
  cancelButtonOptions?: DialogButton;
  confirmationButtonOptions?: DialogButton;
};

export type CreateDialogOptions = {
  title: string;
  text: string;
  buttons?: DialogButton[];
  icon?: string;
  level?: Level;
  customComponent?: ComponentOptions;
  dialogOptions?: VDialog['$props'];
  cardOptions?: VCard['$props'];
};

export type CreateNotifyOptions = {
  text?: string;
  htmlContent?: string;
  level?: Level;
  location?: VSnackbar['$props']['location'];
  notifyOptions?: VSnackbar['$props'];
};

export type CreateBottomSheetOptions = {
  title?: string;
  text?: string;
  items?: VListItem['$props'][];
  dialogOptions?: CreateDialogOptions;
  bottomSheetOptions?: VBottomSheet['$props'];
};

export type CreateBannerOptions = {
  text: string;
  level?: Level;
  closable?: boolean;
  bannerOptions?: VBanner['$props'];
};
