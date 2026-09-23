import { useMemo, useState } from 'react';
export function useListFilter<T>(items: T[], query: string, match: (item: T, q: string) => boolean) {
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => items.filter(item => !query || match(item, query)).filter(item => active === 'All' || match(item, active)), [items, query, active, match]);
  return { active, setActive, filtered };
}
