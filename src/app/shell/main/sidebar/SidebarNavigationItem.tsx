import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui';
import { CaretRightIcon, type Icon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export type SidebarNavigationItemDefinition = {
  label: string;
  to: string;
  icon: Icon;
  items?: Array<{ label: string; to: string }>;
};

export function SidebarNavigationItem({ item }: { item: SidebarNavigationItemDefinition }) {
  const { pathname } = useLocation();
  const hasChildren = Boolean(item.items?.length);
  const isActive = pathname === item.to || pathname.startsWith(`${item.to}/`);
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton render={<NavLink to={item.to} />} isActive={isActive} tooltip={item.label}>
        <item.icon />
        <span>{item.label}</span>
      </SidebarMenuButton>

      {hasChildren ? (
        <SidebarMenuAction
          aria-expanded={isOpen}
          aria-label={`Toggle ${item.label} navigation`}
          className={isOpen ? 'rotate-90' : undefined}
          onClick={() => setIsOpen((open) => !open)}
        >
          <CaretRightIcon />
        </SidebarMenuAction>
      ) : null}

      {hasChildren && isOpen ? (
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.to}>
              <SidebarMenuSubButton
                render={<NavLink to={subItem.to} />}
                isActive={pathname === subItem.to}
              >
                <span>{subItem.label}</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}
