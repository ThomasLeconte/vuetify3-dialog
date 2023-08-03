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
};

export type CreateNotifyOptions = {
  text: string;
  timeout?: number;
  level?: string;
  variant?: string;
  rounded?: string | boolean;
  location?: string;
};
