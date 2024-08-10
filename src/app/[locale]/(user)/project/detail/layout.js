import Navigation from "@/components/project-detail/Navigation";

export default function RootLayout({ children }) {
  return (
    <div>
      {/* <Navigation children={children} /> */}
      {children}
    </div>
  );
}
