import { MainHeader } from './header';
import { MainSidebar } from './sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <MainHeader />
        <div className="flex flex-1 flex-col overflow-auto p-4 md:p-6 w-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
