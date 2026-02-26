import Footer from "@/components/shared/Footer";
import { MainNavigationOptimized } from "@/components/shared/MainNavigationOptimized";

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNavigationOptimized />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
