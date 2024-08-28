// import { searchBranch } from "@/redux/slices/HomeSlice";
// import { RootState } from "@/redux/store";
// import { Checkbox, Col, Row } from "antd";
// import Search from "antd/es/input/Search";
// import { useTranslations } from "next-intl";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Branch = ({ selected, onSelect }) => {
//   const dispatch = useDispatch();
//   const listBranch = useSelector(
//     (state: RootState) => state.home.filteredBranch
//   );

//   const onChange = (checkedValues) => {
//     onSelect(checkedValues);
//   };

//   const t = useTranslations("HomePage");

//   const onSearch = (value) => {
//     dispatch(searchBranch(value.target.value));
//   };

//   return (
//     <div className="select-none">
//       <div>
//         <Search
//           className="h-10 md:w-1/2"
//           placeholder={`${t("search input")}`}
//           size="middle"
//           onChange={onSearch}
//         />
//         <Checkbox.Group
//           className="w-full flex flex-col max-w-full"
//           onChange={onChange}
//           value={selected} // Bind selected values to Checkbox.Group
//         >
//           <Row>
//             {listBranch &&
//               listBranch.map((item) => (
//                 <Col key={item.id}>
//                   <Checkbox
//                     className="truncate whitespace-nowrap flex mr-2"
//                     value={item.id}
//                   >
//                     {item.name}
//                   </Checkbox>
//                 </Col>
//               ))}
//           </Row>
//         </Checkbox.Group>
//       </div>
//     </div>
//   );
// };

// export default Branch;
