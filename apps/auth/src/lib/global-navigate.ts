export function globalNavigate(path: string) {
  try {
    if (typeof path !== 'string' || !path.startsWith('/')) {
      throw new Error('globalNavigate: path must start with "/"');
    }
    window.dispatchEvent(new CustomEvent('global:navigate', { detail: path }));
  } catch (err) {
    // 개발 중이면 toast, alert 등 추가해도 됨
    console.error('[globalNavigate] 크로스앱 이동 실패:', err);
  }
}
