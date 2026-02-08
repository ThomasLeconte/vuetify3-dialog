import { CreateBannerOptions } from '../types';
import { VBanner } from 'vuetify/lib/components/VBanner/index.mjs';
import PluginContext from '../PluginContext';
import { h, render } from 'vue';
import Banner from '../vue-components/Banner.vue';

export function infoBanner(text: string, bannerOptions?: VBanner['$props']) {
  createBanner({ text, level: 'info', bannerOptions });
}

export function successBanner(text: string, bannerOptions?: VBanner['$props']) {
  createBanner({ text, level: 'success', bannerOptions });
}

export function warningBanner(text: string, bannerOptions?: VBanner['$props']) {
  createBanner({ text, level: 'warning', bannerOptions });
}

export function errorBanner(text: string, bannerOptions?: VBanner['$props']) {
  createBanner({ text, level: 'error', bannerOptions });
}

export function createBanner(options: CreateBannerOptions) {
  try {
    if (!isNotEmptyAndNotNull(options.text)) throw new Error('Banner text is required!');

    const vMainDiv = document.getElementsByClassName('v-main').item(0);
    if (!vMainDiv) throw new Error('v-main is missing!');

    // Create the container div
    const bannerContainer = document.createElement('div');
    bannerContainer.className = 'vuetify3-dialog-banner-container';

    // Insert as first child using insertBefore for better performance
    if (vMainDiv.firstChild) {
      vMainDiv.insertBefore(bannerContainer, vMainDiv.firstChild);
    } else {
      vMainDiv.appendChild(bannerContainer);
    }

    return new Promise((resolve, reject) => {
      const props = {
        bannerOptions: options?.bannerOptions ?? PluginContext.getPluginOptions()?.defaults?.banner,
        text: options?.text,
        level: options.level,
        onCloseBanner: (value: string | boolean) => {
          // Clean up the banner container when closed
          if (bannerContainer.parentNode) {
            bannerContainer.parentNode.removeChild(bannerContainer);
          }
          resolve(value);
        },
      };

      const vNode = h(Banner, props);
      vNode.appContext = PluginContext.getApp()._context;
      render(vNode, bannerContainer);
    });
  } catch (err: any) {
    console.error(`[Vuetify3Dialog] ${err.message} [${err.stack}]`);
  }
}

function isNotEmptyAndNotNull(value: string | boolean): boolean {
  if (value === undefined || value === null) return false;
  return typeof value === 'boolean' ? true : value.trim().length > 0 && value !== '';
}
