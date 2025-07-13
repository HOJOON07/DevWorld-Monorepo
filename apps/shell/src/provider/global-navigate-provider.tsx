import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
