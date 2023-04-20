import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/header';
import Sidebar from "@/components/sidebar";
import FlowbiteContext from '@/context/FlowbiteContext';
import { SidebarProvider } from "@/context/SidebarContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FlowbiteContext>
      <SidebarProvider>
        <Header />
        <div className="flex dark:bg-gray-900 bg-white">
          <main className="order-2 mx-4 mt-4 mb-24 flex-[1_0_16rem]">
            <Component {...pageProps} />
          </main>
          <div className="order-1">
            <Sidebar />
          </div>
        </div>
      </SidebarProvider>
    </FlowbiteContext>
  )
}
