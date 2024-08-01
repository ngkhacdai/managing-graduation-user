import React from "react";
import SignUpScreen from "./SignUp.screen";

const SignUp = () => {
  const fakeListBranch = ["CNTT", "KT", "YH"];
  const fakeListTeacher = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    teacherName: `Teacher ${index}`,
    teacherEmail: `teacher${index}@gmail.com`,
    branch: fakeListBranch[Math.floor(Math.random() * fakeListBranch.length)],
    academicRank: Math.floor(Math.random() * 5),
    studentSignUp: Math.round(Math.random() * 9 + 1),
  }));
  return (
    <SignUpScreen listBranch={fakeListBranch} listTeacher={fakeListTeacher} />
  );
};

export default SignUp;
