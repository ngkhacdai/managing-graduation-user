import NavBarUser from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import SideBarScreen from "@/components/SideBar.screen";

export default function RootLayout({ children }) {
  return (
    <div>
      <SideBarScreen>{children}</SideBarScreen>
    </div>
  );
}
