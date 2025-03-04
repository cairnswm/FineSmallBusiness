import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Users, FileText, Settings } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const DashboardSidebar: React.FC = () => {
  const { state } = useSidebar();

  const menuItems = [
    { title: 'Home', url: '/app', icon: Home },
    { title: 'Clients', url: '/app/clients', icon: Users },
    { title: 'Quotes & Invoices', url: '/app/quotes', icon: FileText },
    { title: 'Settings', url: '/app/settings', icon: Settings },
  ];

  return (
    <Sidebar className={`bg-primary text-primary-foreground shadow-lg border-r border-border ${state === 'collapsed' ? 'w-[--sidebar-width-icon]' : 'w-[--sidebar-width]'}`}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5" />
                      <span className={`${state === 'collapsed' ? 'hidden' : 'block'}`}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;