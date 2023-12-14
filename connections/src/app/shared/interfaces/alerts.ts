export type TAlert = 'error' | 'success' | 'warning' | 'info';

export interface IAlerts {
  message: string,
  type: TAlert,
  isShow: boolean,
}
