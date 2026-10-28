import { MERCHANT_ROUTES } from "@/constants"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui"
import { CodeIcon, GearSixIcon } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"

const utilityItems = [
  {
    label: "Settings",
    to: MERCHANT_ROUTES.SETTINGS,
    icon: GearSixIcon,
  },
  {
    label: "Developers",
    to: MERCHANT_ROUTES.DEVELOPERS,
    icon: CodeIcon,
  },
]

export function SidebarUtilityNavigation() {
  return (
    <SidebarMenu>
      {utilityItems.map((item) => (
        <SidebarMenuItem key={item.to}>
          <SidebarMenuButton
            render={<NavLink to={item.to} />}
            tooltip={item.label}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
