declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialog: {
      createDialog: (title: string, text: string, buttons?: any[], level?: string) => Promise<string>;
    };
  }
}
