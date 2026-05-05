import type { MFEAppType } from '@devworld/event-bus';
import type React from 'react';
import { Outlet } from 'react-router-dom';
import useAppEvent from '../hooks/use-app-event';

interface AppRoutingManagerProps {
  type: MFEAppType;
}

const AppRoutingManager: React.FC<AppRoutingManagerProps> = ({ type }) => {
  useAppEvent(type);

  return <Outlet />;
};

export default AppRoutingManager;
