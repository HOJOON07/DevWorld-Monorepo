import { emit } from './window-event-bus';

export const globalNavigate = (path: string): void => {
  if (!path.startsWith('/')) {
    console.error('[globalNavigate] path must start with "/":', path);
    return;
  }
  emit('global:navigate', path);
};
