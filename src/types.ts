import { Plugin } from 'vue';
import { VCard } from 'vuetify/lib/components/VCard/index.mjs';
import { VDialog } from 'vuetify/lib/components/VDialog/index.mjs';
import { VSnackbar } from 'vuetify/lib/components/VSnackbar/index.mjs';

export type DialogButton = {
  key: string | boolean;
  title: string;
  color?: string;
  variant?: string;
};

export type Level = 'warning' | 'error' | 'info' | 'success';

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

export type PluginOptions = {
  vuetify: Plugin;
  defaults?: {
    dialog?: {
      component?: VDialog['$props'];
      card?: VCard['$props'];
    };
    notify?: VSnackbar['$props'];
  };
};
