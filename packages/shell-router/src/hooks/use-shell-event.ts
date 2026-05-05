import { emit, on, type MFEAppType } from '@devworld/event-bus';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useShellEvent(type: MFEAppType, basename: string) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    return on(`[${type}] navigated`, (pathname) => {
      const newPathname = pathname === '/' ? basename : `${basename}${pathname}`;
      if (newPathname === location.pathname) return;
      navigate(newPathname);
    });
  }, [basename, location.pathname, navigate, type]);

  useEffect(() => {
    if (location.pathname.startsWith(basename)) {
      emit('[app-shell] navigated', location.pathname.replace(basename, ''));
    }
  }, [basename, location.pathname]);
}
