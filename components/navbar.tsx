"use client"

import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { HiOutlineComputerDesktop } from "react-icons/hi2"
import { IoExtensionPuzzleOutline } from "react-icons/io5"
import { LuTabletSmartphone } from "react-icons/lu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const pathname = usePathname()
  const isAtTopRef = useRef(true)
  const scrollTicking = useRef(false)

  useEffect(() => {
    setIsOpen(false)
    setMobileProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTicking.current) return
      scrollTicking.current = true
      requestAnimationFrame(() => {
        const atTop = window.scrollY < 5
        if (atTop !== isAtTopRef.current) {
          isAtTopRef.current = atTop
          setIsAtTop(atTop)
        }
        scrollTicking.current = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isAtTop ? "w-full bg-transparent px-0 pt-4" : "top-6 px-4 lg:px-2",
        )}
      >
        <div
          className={cn(
            "transition-all duration-300 w-full border-transparent rounded-2xl lg:max-w-7xl lg:mx-auto",
            isAtTop
              ? "px-4 lg:px-8"
              : "border border-borderLight px-6 py-3 bg-foreground/5 backdrop-blur-md",
            isOpen && "max-lg:bg-backgroundSecondary",
          )}
        >
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <img
                src={"/images/vultisig-logo.svg"}
                alt="Vultisig logo"
                width={25}
                height={25}
              />
              <span className="text-xl font-semibold pl-3">Vultisig</span>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center text-textSecondary hover:text-white cursor-pointer">
                    <span>Products</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="bg-backgroundSecondary border border-borderLight shadow-lg rounded-xl p-2 min-w-[220px]"
                >
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="flex items-center gap-3 p-2 pr-4 rounded-lg text-white hover:bg-blue-900/40 transition-colors"
                    >
                      <div className="size-10 bg-primaryAccent/10 text-alertInfo rounded-lg flex items-center justify-center">
                        <product.icon size={22} />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <NavLinks />
            </div>

            <Link
              href="/downloads"
              className={cn(
                buttonVariants({ variant: "primaryBlue" }),
                "max-lg:hidden",
              )}
            >
              Download App
            </Link>

            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-textSecondary hover:text-white p-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-borderLight min-h-[calc(100vh-60px)] bg-backgroundSecondary">
              <div className="flex flex-col space-y-4">
                <div>
                  <button
                    className="flex items-center text-textSecondary hover:text-white cursor-pointer py-2 focus:outline-none"
                    onClick={() => setMobileProductsOpen((v) => !v)}
                    aria-expanded={mobileProductsOpen}
                    aria-controls="mobile-products-menu"
                    type="button"
                  >
                    <span>Products</span>
                    <ChevronDown
                      className={`ml-1 size-4 transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileProductsOpen && (
                    <div
                      id="mobile-products-menu"
                      className="flex flex-col gap-1 pl-2"
                    >
                      {products.map((product) => (
                        <Link
                          key={product.name}
                          href={product.href}
                          className="flex items-center gap-3 p-2 rounded-lg text-white hover:bg-blue-900/40 transition-colors"
                        >
                          <div className="size-10 bg-primaryAccent/10 text-alertInfo rounded-lg flex items-center justify-center">
                            <product.icon size={22} />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <NavLinks />
              </div>
              <Link
                href="/downloads"
                className={cn(
                  buttonVariants({ variant: "primaryBlue" }),
                  "mt-2 w-full",
                )}
              >
                Download App
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {parentLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "text-textSecondary hover:text-white py-2",
            pathname.startsWith(link.href) &&
              "text-white font-semibold tracking-wide",
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}

const products = [
  {
    name: "Vultisig Apps",
    href: "/downloads?tab=mobile",
    icon: LuTabletSmartphone,
  },
  {
    name: "Vultisig Extension",
    href: "/downloads?tab=browser",
    icon: IoExtensionPuzzleOutline,
  },
  {
    name: "Vultisig Web",
    href: "/downloads?tab=mobile",
    icon: HiOutlineComputerDesktop,
  },
]

const parentLinks = [
  {
    name: "How It Works",
    href: "/how-it-works",
  },
  {
    name: "MPC Wallet",
    href: "/mpc",
  },
  {
    name: "Articles",
    href: "/articles",
  },
  {
    name: "$VULT",
    href: "/vult",
  },
]
