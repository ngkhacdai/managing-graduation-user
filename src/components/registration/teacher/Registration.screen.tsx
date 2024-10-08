"use client";
import React, { useEffect } from "react";
import TableRegistration from "./TableRegistration";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRegistration } from "@/redux/slices/RegistrationSlice";
import { AppDispatch, RootState } from "@/redux/store";

const RegistrationScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.registration.data);
  const menteeLimit = useSelector(
    (state: RootState) => state.registration.menteeLimit
  );
  useEffect(() => {
    dispatch(fetchDataRegistration());
  }, []);
  if (data && data.length <= 0) {
    return (
      <div className="text-center">
        <p>No registration</p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-xl my-2 text-zinc-400 font-semibold">
        Submitted Registrations
      </p>
      <TableRegistration data={data} />
      <p className="absolute text-white font-semibold bottom-0 p-3 m-2 rounded-lg right-0 border-2 bg-blue-500">
        Mentees limit: {menteeLimit}
      </p>
    </div>
  );
};

export default RegistrationScreen;
