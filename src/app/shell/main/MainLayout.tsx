import { MainHeader } from '@/app/shell/header';
import { MainSidebar } from '@/app/shell/sidebar';
import { SidebarInset, SidebarProvider } from '@/shared/ui';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <MainHeader />
        <div className="flex flex-1 flex-col overflow-auto p-4 md:p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
