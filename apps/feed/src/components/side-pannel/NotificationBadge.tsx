interface NotificationBadgeProps {
  count: number;
  show?: boolean;
}

export default function NotificationBadge({ count, show = true }: NotificationBadgeProps) {
  if (!show || count === 0) return null;

  return (
    <div className='-top-1 -right-1 absolute h-2 w-2 rounded-full bg-red-500'>
      {count > 1 && <span className='sr-only'>{count} unread notifications</span>}
    </div>
  );
}
