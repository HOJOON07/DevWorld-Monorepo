import { useLocation } from 'react-router-dom';
import { useBreadcrumbStore } from '../stores/breadcrumb-store';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  isCurrentPage?: boolean;
}

export function useBreadcrumbItems(): BreadcrumbItem[] {
  const { pathname } = useLocation();
  const { route } = useBreadcrumbStore();

  const pathSegments = pathname.split('/').filter(Boolean);

  const baseItems: BreadcrumbItem[] = [{ label: 'workspace', url: '/docs' }];

  if (pathSegments.includes('docs')) {
    return [...baseItems, { label: 'docs', isCurrentPage: true }];
  }

  if (pathSegments.includes('write')) {
    const items: BreadcrumbItem[] = [...baseItems, { label: 'write', url: '/write' }];

    if (pathSegments.length === 2 && route) {
      items.push({ label: route, isCurrentPage: true });
    } else if (pathSegments.length === 1) {
      items[items.length - 1].isCurrentPage = true;
      delete items[items.length - 1].url;
    }

    return items;
  }

  return [{ label: 'workspace', isCurrentPage: true }];
}
