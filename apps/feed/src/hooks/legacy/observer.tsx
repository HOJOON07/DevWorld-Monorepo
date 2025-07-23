import { RefObject, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '0%' },
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [inView, setInView] = useState(false);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    setInView(entry.isIntersecting);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    const observerParams = { threshold, root, rootMargin };

    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

  return { entry, inView };
};
