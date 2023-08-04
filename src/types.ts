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
  cardOptions?: any;
};

export type CreateNotifyOptions = {
  text: string;
  level?: string;
  location?: string;
  notifyOptions?: any;
};
