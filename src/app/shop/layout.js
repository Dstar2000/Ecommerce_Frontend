import ShopHeader from "@/components/shop/ShopHeader";
import ShopSidebar from "@/components/shop/ShopSidebar";
import "../globals.css";


export default function ShopLayout({ children }) {
  return (
    <>
      <ShopHeader />
      <div className="flex min-h-screen">
        <ShopSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
