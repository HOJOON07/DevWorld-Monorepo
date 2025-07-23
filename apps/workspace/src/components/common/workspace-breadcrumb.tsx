import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@devworld/ui';
import { useNavigate } from 'react-router-dom';
import { useBreadcrumbItems } from '../../hooks/use-breadcrumb-items';

export function WorkspaceBreadcrumb() {
  const navigate = useNavigate();
  const breadcrumbItems = useBreadcrumbItems();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={`${item.label}-${index}`} className='flex items-center gap-1'>
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbPage
                  onClick={() => handleNavigate(item.url!)}
                  className='cursor-pointer text-muted-foreground hover:text-foreground'
                >
                  {item.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
