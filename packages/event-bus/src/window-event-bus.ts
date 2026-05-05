import type { AppEventMap } from './events';

export const emit = <K extends keyof AppEventMap>(
  event: K,
  payload: AppEventMap[K],
): void => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(event, { detail: payload }));
};

export const on = <K extends keyof AppEventMap>(
  event: K,
  handler: (payload: AppEventMap[K]) => void,
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<AppEventMap[K]>).detail);
  window.addEventListener(event, listener);
  return () => window.removeEventListener(event, listener);
};
