import { type injectFunctionType, useShellEvent } from '@devworld/shell-router';
import { importRemote } from '@module-federation/utilities';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { appAuthBaseName } from '../constants/prefix';

export default function AppAuth() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent('app-auth', appAuthBaseName);

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }

    isFirstRunRef.current = false;
    importRemote<{ default: injectFunctionType }>({
      // url: process.env.REACT_APP_MICROAPP_FEED_URL!,
      url: 'http://localhost:3002',
      scope: 'auth',
      module: 'injector',
      remoteEntryFileName: 'remoteEntry.js',
    })
      .then(({ default: inject }) => {
        unmountRef.current = inject({
          routerType: 'memory',
          rootElement: wrapperRef.current!,
          basePath: location.pathname.replace(appAuthBaseName, ''),
        });
      })
      .catch((error) => {
        console.error('Failed to load remote module:', error);
      });
  }, [location]);

  useEffect(() => {
    return () => {
      unmountRef.current();
    };
  }, []);

  return <div ref={wrapperRef} id='app-auth' />;
}
