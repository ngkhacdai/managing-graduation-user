import NavBarUser from "@/components/NavBar";
import SideBar from "@/components/SideBar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen">
      <NavBarUser />
      <div className="flex">
        <div className="w-1/6">
          <SideBar />
        </div>
        <div className="w-5/6 ">{children}</div>
      </div>
    </div>
  );
}
