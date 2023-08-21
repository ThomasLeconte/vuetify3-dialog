import { App } from 'vue';

export default abstract class Notifier {
  protected _app: App;

  constructor(app: App) {
    this._app = app;
  }

  abstract initContext(): void;
}
