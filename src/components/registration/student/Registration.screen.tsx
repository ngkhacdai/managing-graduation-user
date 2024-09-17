"use client";
import React, { useEffect } from "react";
import TableRegistration from "./TableRegistration";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getListRegisForstudent } from "@/redux/slices/RegistrationSlice";
import { Button } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RegistrationScreenStudent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();
  const data = useSelector(
    (state: RootState) => state.registration.studentData
  );
  useEffect(() => {
    dispatch(getListRegisForstudent());
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl my-2 text-zinc-400 font-semibold">
          Submitted Registrations
        </p>
        <Link href={`/${pathName.split("/")[1]}/registration/signup`}>
          <Button>Sign up project</Button>
        </Link>
      </div>
      <TableRegistration data={data} />
    </div>
  );
};

export default RegistrationScreenStudent;
