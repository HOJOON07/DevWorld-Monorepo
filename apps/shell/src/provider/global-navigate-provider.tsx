import { on } from '@devworld/event-bus';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function GlobalNavigateProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();

  useEffect(() => {
    return on('global:navigate', (path) => {
      if (path.startsWith('/')) navigate(path, { replace: true });
    });
  }, [navigate]);

  return <>{children}</>;
}
