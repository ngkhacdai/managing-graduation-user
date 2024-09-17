import FooterHome from "@/components/home/Footer";
import Menu from "@/components/public/Menu";

export default function UserLayout({ children }) {
  return (
    <div>
      <Menu />
      {children}
      <FooterHome />
    </div>
  );
}
