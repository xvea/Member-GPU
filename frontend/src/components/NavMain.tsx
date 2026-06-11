'use client'

import { CaretRightIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export type RouteItem = {
  title: string
  url: string
}

export type RouteGroup = {
  id: string
  title: string
  icon: React.ElementType
  url?: string
  isActive?: boolean
  items?: RouteItem[]
}

export default function DashboardNavigation({ items }: { items: RouteGroup[] }) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  const isLinkActive = (url: string) => {
    if (url === '/') return pathname === url
    return pathname?.startsWith(url)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={cn(isCollapsed && 'hidden')}>Menu</SidebarGroupLabel>
      <SidebarMenu className="gap-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const hasSubItems = item.items && item.items.length > 0
          const isActive = item.url ? isLinkActive(item.url) : false

          if (!hasSubItems && item.url) {
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  className={cn('transition-all duration-150 ease-in-out', isCollapsed && 'justify-center px-0')}
                  render={
                    <Link href={item.url} className={cn('flex items-center', isCollapsed && 'w-full justify-center')}>
                      <Icon className="size-4 shrink-0 transition-transform duration-150" />
                      <span
                        className={cn(
                          'ml-2 transition-all duration-150 ease-in-out',
                          isCollapsed ? 'hidden w-0 opacity-0' : 'w-auto opacity-100'
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  }
                ></SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={item.id}
              defaultOpen={item.isActive}
              render={
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        className={cn('transition-all duration-150 ease-in-out', isCollapsed && 'justify-center px-0')}
                      >
                        <Icon className="size-4 shrink-0 transition-transform duration-150" />
                        <span
                          className={cn(
                            'ml-2 whitespace-nowrap transition-all duration-150 ease-in-out',
                            isCollapsed ? 'hidden w-0 opacity-0' : 'w-auto opacity-100'
                          )}
                        >
                          {item.title}
                        </span>
                        {!isCollapsed && (
                          <CaretRightIcon className="ml-auto size-4 shrink-0 transition-transform duration-150 data-[state=open]:rotate-90" />
                        )}
                      </SidebarMenuButton>
                    }
                  ></CollapsibleTrigger>
                  {!isCollapsed && (
                    <CollapsibleContent className="transition-all duration-150 ease-in-out">
                      <SidebarMenuSub className="mt-1 gap-y-1">
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              isActive={pathname === subItem.url}
                              render={
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              }
                            ></SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              }
            ></Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
