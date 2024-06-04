import PluginContext from 'PluginContext';
import { CreateBottomSheetOptions } from 'types';
import { h, render } from 'vue';
import { VListItem } from 'vuetify/lib/components/VList/index.mjs';
import BottomSheet from './components/BottomSheet.vue';

export default class BottomSheets {
  public static initContext(): void {
    PluginContext.getApp().config.globalProperties.$bottomSheet = {
      create: createBottomSheet,
      createList: createBottomSheetList,
    };
  }
}

export function createBottomSheetList(items: VListItem['$props'][], options?: CreateBottomSheetOptions) {
  items.forEach((item) => {
    if (!isNotEmptyAndNotNull(item.title as any)) throw new Error('title is required for each item');
    if (!isNotEmptyAndNotNull(item.value)) throw new Error('value is required for each item');
  });

  return createBottomSheet({
    items,
    ...options,
  });
}

export function createBottomSheet(options: CreateBottomSheetOptions) {
  try {
    if (options.items && options.dialogOptions) {
      throw new Error('You can not use items and dialogOptions together');
    }

    if (options.dialogOptions) {
      if (!isNotEmptyAndNotNull(options.dialogOptions.title)) throw new Error('title is required');
      if (!isNotEmptyAndNotNull(options.dialogOptions.text)) throw new Error('text is required');
    }

    const div = document.createElement('div');
    return new Promise((resolve, reject) => {
      const props = {
        bottomSheetOptions:
          options?.bottomSheetOptions || PluginContext.getPluginOptions()?.defaults?.bottomSheet || undefined,
        dialogOptions: options?.dialogOptions,
        items: options?.items,
        title: options?.title,
        text: options?.text,
        onCloseBottomSheet: (value: string | boolean) => {
          resolve(value);
        },
      };

      const vNode = h(BottomSheet, props);
      vNode.appContext = PluginContext.getApp()._context;
      render(vNode, div);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
