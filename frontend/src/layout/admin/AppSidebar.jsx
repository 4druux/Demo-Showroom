"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
// Import react-icons
import {
  MdDashboard,
  MdFormatListBulleted,
  MdKeyboardArrowDown,
  MdMoreHoriz,
} from "react-icons/md";

const navItems = [
  {
    icon: <MdDashboard />,
    name: "Dashboard",
    subItems: [{ name: "Dashboard", path: "/admin" }],
  },
  {
    name: "Produk",
    icon: <MdFormatListBulleted />,
    subItems: [
      { name: "Katalog Produk", path: "/admin/produk" },
      { name: "Layanan Produk", path: "/admin/layanan-produk" },
    ],
  },
];

const AppSidebar = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    setIsMobileOpen,
    isMobile,
  } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  const renderMenuItems = (navItems, menuType) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`relative flex items-center w-full gap-3 px-3 py-2 font-medium text-sm rounded-xl cursor-pointer group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-sky-50 text-sky-500"
                  : "text-neutral-700 hover:bg-neutral-100"
              } ${
                !isExpanded && !isHovered
                  ? "xl:justify-center"
                  : "xl:justify-start"
              }`}
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-sky-500 text-2xl"
                    : "text-neutral-500 group-hover:text-neutral-700 text-2xl"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <MdKeyboardArrowDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-xl text-theme-sm ${
                  isActive(nav.path)
                    ? "bg-sky-50 text-brand-500"
                    : "text-gray-700 hover:bg-gray-100 group-hover:text-gray-700"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "text-brand-500"
                      : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-normal ${
                        isActive(subItem.path)
                          ? "bg-sky-50 text-sky-500"
                          : "text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});
  const isActive = useCallback((path) => path === pathname, [pathname]);

  useEffect(() => {
    if (isMobile && isMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [pathname, isMobile]);

  useEffect(() => {
    let submenuMatched = false;
    const menuType = "main";
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: menuType,
              index,
            });
            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-15 lg:mt-19 flex flex-col xl:mt-0 top-0 px-5 left-0 bg-white text-gray-900
         h-screen transition-all duration-300 ease-in-out z-50 xl:border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        xl:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "xl:justify-center" : "justify-center"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className=""
                src="/images/Logo/logo.png"
                alt="Logo"
                width={180}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/Logo/logo.png"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div
        className="flex flex-col overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "xl:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <MdMoreHoriz className="text-2xl" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
