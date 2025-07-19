import { type injectFunctionType, useShellEvent } from '@devworld/shell-router';
import { importRemote } from '@module-federation/utilities';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { appWorkspaceBaseName } from '../constants/prefix';

export default function AppWorkspace() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent('app-workspace', appWorkspaceBaseName);

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }

    isFirstRunRef.current = false;
    importRemote<{ default: injectFunctionType }>({
      url: 'http://localhost:3003',
      scope: 'workspace',
      module: 'injector',
      remoteEntryFileName: 'remoteEntry.js',
    })
      .then(({ default: inject }) => {
        unmountRef.current = inject({
          routerType: 'memory',
          rootElement: wrapperRef.current!,
          basePath: location.pathname.replace(appWorkspaceBaseName, ''),
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

  return <div ref={wrapperRef} id='app-workspace' />;
}
