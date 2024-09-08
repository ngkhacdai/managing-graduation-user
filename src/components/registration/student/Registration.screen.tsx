"use client";
import React, { useEffect } from "react";
import TableRegistration from "./TableRegistration";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getListRegisForstudent } from "@/redux/slices/RegistrationSlice";

const RegistrationScreenStudent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector(
    (state: RootState) => state.registration.studentData
  );
  useEffect(() => {
    dispatch(getListRegisForstudent());
  }, []);
  if (data && data.length <= 0) {
    return;
  }
  return (
    <div>
      <p className="text-xl my-2 text-zinc-400 font-semibold">Mentor signed</p>
      <TableRegistration data={data} />
    </div>
  );
};

export default RegistrationScreenStudent;
