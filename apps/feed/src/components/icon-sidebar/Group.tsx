import { Bell, House, Pencil, Search } from '@devworld/ui';
import React, { useState } from 'react';
import Item from './Item';

type ItemType = {
  text: string;
  icon: React.ReactNode;
};

const ItemList: ItemType[] = [
  {
    text: 'Feed',
    icon: <House />,
  },
  {
    text: 'Search',
    icon: <Search />,
  },
  {
    text: 'Notifications',
    icon: <Bell />,
  },
  {
    text: 'Workspace',
    icon: <Pencil />,
  },
];

export default function Group() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className='self-start'>
      {ItemList.map(({ text, icon }, idx) => (
        <Item
          text={text}
          icon={icon}
          key={idx}
          isActive={hoveredItem ? hoveredItem === text : text === 'Feed'}
          onHover={(itemText) => setHoveredItem(itemText)}
          onLeave={() => setHoveredItem(null)}
        />
      ))}
    </div>
  );
}
