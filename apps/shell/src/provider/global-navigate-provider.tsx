import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// export function globalNavigate(path: string) {
//   try {
//     if (typeof path !== 'string' || !path.startsWith('/')) {
//       throw new Error('globalNavigate: path must start with "/"');
//     }
//     window.dispatchEvent(new CustomEvent('global:navigate', { detail: path }));
//   } catch (err) {
//     // 개발 중이면 toast, alert 등 추가해도 됨
//     console.error('[globalNavigate] 크로스앱 이동 실패:', err);
//   }
// }

export function GlobalNavigateProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const event = e as CustomEvent<string>;
        const path = event.detail;
        if (typeof path === 'string' && path.startsWith('/')) {
          navigate(path, { replace: true });
        }
      } catch (error) {
        console.error('global:navigate error', error);
      }
    };
    window.addEventListener('global:navigate', handler);
    return () => window.removeEventListener('global:navigate', handler);
  }, [navigate]);

  return <>{children}</>;
}
