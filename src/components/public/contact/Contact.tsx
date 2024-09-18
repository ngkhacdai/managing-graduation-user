import { headers } from "next/headers";
import React from "react";
import ContactScreen from "./Contact.screen";

const ContactComponent = () => {
  const header = headers();
  const role = header.get("role");
  return <ContactScreen role={role} />;
};

export default ContactComponent;
