import classNames from "classnames";
import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import type { FC, PropsWithChildren } from "react";
import { BiMovie } from "react-icons/bi";
import { BsChatQuote } from "react-icons/bs";
import { HiUser } from "react-icons/hi";
import { useSidebarContext } from "../context/SidebarContext";
import { useRouter } from "next/router";

const Sidebar: FC<PropsWithChildren<Record<string, unknown>>> = function () {
  const { isOpenOnSmallScreens: isSidebarOpenOnSmallScreens } =
    useSidebarContext();
  const router = useRouter();
  
  return (
    <div
      className={classNames(
        "fixed overflow-auto top-0 h-screen z-10 lg:sticky lg:!block",
        {
          hidden: !isSidebarOpenOnSmallScreens,
        }
      )}
    >
      <FlowbiteSidebar>
        <FlowbiteSidebar.Items>
          <FlowbiteSidebar.ItemGroup>
            <FlowbiteSidebar.Item href="/movies" icon={BiMovie} active={router.asPath === '/movies'}>
              Movies
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="/characters" icon={HiUser} active={router.asPath === '/characters'}>
              Characters
            </FlowbiteSidebar.Item>
            <FlowbiteSidebar.Item href="/quotes" icon={BsChatQuote} active={router.asPath === '/quotes'}>
              Quotes
            </FlowbiteSidebar.Item>
          </FlowbiteSidebar.ItemGroup>
        </FlowbiteSidebar.Items>
      </FlowbiteSidebar>
    </div>
  );
};

export default Sidebar;
