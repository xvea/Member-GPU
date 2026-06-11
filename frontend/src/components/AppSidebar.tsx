'use client'

import { GearSixIcon, NotepadIcon } from '@phosphor-icons/react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import DashboardNavigation, { type RouteGroup } from './NavMain'
import { NavUser } from './NavUser'

export function AppSidebar({ session }: { session: any }) {
  const routeGroups: RouteGroup[] = [
    {
      id: 'all-my-tasks',
      title: 'All my Tasks',
      icon: NotepadIcon,
      url: '/tasks/all',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: GearSixIcon,
      url: '/settings',
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <div>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent-foreground" />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-black dark:text-white">Task Manager</span>
                  </div>
                </div>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <DashboardNavigation items={routeGroups} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  )
}
