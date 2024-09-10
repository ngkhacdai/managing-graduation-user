import Menu from "@/components/public/Menu";

export default function UserLayout({ children }) {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
}
