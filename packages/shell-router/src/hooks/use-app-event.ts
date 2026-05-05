import { emit, on, type MFEAppType } from '@devworld/event-bus';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useAppEvent(type: MFEAppType) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    return on('[app-shell] navigated', (pathname) => {
      if (location.pathname === pathname) return;
      navigate(pathname);
    });
  }, [location.pathname, navigate]);

  useEffect(() => {
    emit(`[${type}] navigated`, location.pathname);
  }, [location.pathname, type]);
}
