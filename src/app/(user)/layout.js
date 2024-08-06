import NavBarUser from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import SideBarScreen from "@/components/SideBar.screen";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen">
      <NavBarUser />
      <SideBarScreen>{children}</SideBarScreen>
    </div>
  );
}
