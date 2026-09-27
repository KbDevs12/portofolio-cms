import { Html } from "@elysiajs/html";
import { Layout } from "../Layout";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";

interface DashboardLayoutProps {
  title: string;
  children: JSX.Element | JSX.Element[] | string;
  pathname: string;
}

export const DashboardLayout = ({
  title,
  children,
  pathname,
}: DashboardLayoutProps) => (
  <Layout title={title}>
    <div class="min-h-screen">
      <div class="mx-auto flex">
        <Sidebar pathname={pathname} />

        <div class="min-w-0 flex-1">
          <Header />

          <main class="px-6 py-10 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  </Layout>
);
