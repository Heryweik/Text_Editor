'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navItems } from "./UserNav"



export default function DashboardNav() {

    const pathname = usePathname()

  return (
    <nav className='grid items-start gap-2 mt-[10vh]'>
        {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
                <span className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    // los && son para aplicar una clase si se cumple la condición
                    pathname === item.href && "bg-accent text-accent-foreground"
                )}>
                    <item.icon className="mr-2 w-4 h-4 text-primary" />
                    <span>{item.name}</span>
                </span>
            </Link>
        ))}
    </nav>
  )
}
