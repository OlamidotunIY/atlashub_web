import { MERCHANT_ROUTES } from "@/constants"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui"
import { CodeIcon, ShieldCheckIcon } from "@phosphor-icons/react"
import { NavLink } from "react-router-dom"

const utilityItems = [
  {
    label: "Compliance",
    to: MERCHANT_ROUTES.COMPLIANCE,
    icon: ShieldCheckIcon,
  },
  { label: "Developers", to: MERCHANT_ROUTES.DEVELOPERS, icon: CodeIcon },
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
