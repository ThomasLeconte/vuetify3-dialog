import { Plugin } from 'vue';
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
  bottomSheetOptions?: VBottomSheet['$props'];
};
