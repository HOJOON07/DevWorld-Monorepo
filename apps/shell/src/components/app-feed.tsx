import { type injectFunctionType, useShellEvent } from '@devworld/shell-router';
import { importRemote } from '@module-federation/utilities';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { appFeedBasename } from '../constants/prefix';

export default function AppFeed() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useShellEvent('app-feed', appFeedBasename);

  const isFirstRunRef = useRef(true);
  const unmountRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!isFirstRunRef.current) {
      return;
    }

    isFirstRunRef.current = false;
    importRemote<{ default: injectFunctionType }>({
      url: process.env.REACT_APP_MICROAPP_FEED_URL!,
      scope: 'feed',
      module: 'injector',
      remoteEntryFileName: 'remoteEntry.js',
    })
      .then(({ default: inject }) => {
        unmountRef.current = inject({
          routerType: 'memory',
          rootElement: wrapperRef.current!,
          basePath: location.pathname.replace(appFeedBasename, ''),
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

  return <div ref={wrapperRef} id="app-feed" />;
}
