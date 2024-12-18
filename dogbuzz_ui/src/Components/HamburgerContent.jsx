// import React from 'react';
// import { FaTachometerAlt,FaCog,FaPaw, FaChartLine ,  FaUsers, FaBoxes,FaDog,FaMoneyBillWave,FaBriefcase, FaShoppingBag,FaSignOutAlt } from 'react-icons/fa';
// import { MdShoppingBasket ,MdSchedule,MdAdd} from 'react-icons/md';
// import Cookies from "js-cookie";
// const Logout = () => {
//   // Clear session or local storage
//   sessionStorage.clear();
//   localStorage.clear();
//   Cookies.clear("sessionToken");

// };
// const HamburgerContent = [
//   {
//     title: "Dashboard",
//     icon: <FaTachometerAlt />,
//     link: "/Dashboard" // Changed to lowercase
//   },
//   {
//     title: "Sales",
//     icon: < FaChartLine />,
//     link: "/Sales" // Changed to lowercase
//   },
//   {
//     title: "Procurement",
//     icon: <MdShoppingBasket />,
//     link: "/Procurement" // Changed to lowercase
//   },
//   {
//     title: "Breeding",
//     icon: <FaShoppingBag />,
//     link: "/Breeding" // Changed to lowercase
//   },
//   {
//     title: "Items and Inventory",
//     icon: < FaBoxes />,
//     link: "/ItemsandInventoryManagement" // Changed to lowercase
//   },
//   {
//     title: "Human Resources Management", 
//     icon: < FaUsers />,
//     link: "/HumanResourcesManagement" // Changed to lowercase
//   },
//   {
//     title: "Finance",
//     icon: <FaMoneyBillWave />,
//     link: "/Finance" // Changed to lowercase
//   },
//   {
//     title: "Kennel management",
//     icon: < FaDog />,
//     link: "/KennelManagement" // Changed to lowercase
//   },
//   {
//     title: "Health Hubb",
//     icon: <FaPaw  />,
//     link: "/Healthhubb" // Changed to lowercase
//   },
//   {
//     title: "Settings",
//     icon: <FaCog />,
//     link: "/Settings" // Changed to lowercase
//   },
//   {
//     title: "Task Schedule",
//     icon: <MdSchedule />,
//     link: "/Taskschedule" // Changed to lowercase
//   },
//   {
//     title: "Dimension",
//     icon: <FaBriefcase />,
//     link: "/Dimension" // Changed to lowercase
//   },
//   {
//     title: "Asset Management",
//     icon: <MdAdd />,
//     link: "/Assetsmanagement" // Changed to lowercase
//   },
//   {
//     title: "Logout",
//     icon: <FaSignOutAlt />,
//     link:"/",
//    onclick : Logout
//   }

// ];

// export default HamburgerContent;

import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaTachometerAlt, FaCog, FaPaw, FaChartLine, 
  FaUsers, FaBoxes, FaDog, FaMoneyBillWave, 
  FaBriefcase, FaShoppingBag, FaSignOutAlt 
} from 'react-icons/fa';
import { MdShoppingBasket, MdSchedule, MdAdd } from 'react-icons/md';
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  sessionStorage.clear();
  localStorage.clear();
  Cookies.remove("username");
  Cookies.remove("sessionToken");

  navigate("/"); // Redirect to the login page
};

const HamburgerContent = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    link: "/dashboard" // Changed to lowercase
  },
  {
    title: "Sales",
    icon: <FaChartLine />,
    link: "/sales" // Changed to lowercase
  },
  {
    title: "Procurement",
    icon: <MdShoppingBasket />,
    link: "/procurement" // Changed to lowercase
  },
  {
    title: "Breeding",
    icon: <FaShoppingBag />,
    link: "/breeding" // Changed to lowercase
  },
  {
    title: "Items and Inventory",
    icon: <FaBoxes />,
    link: "/items-and-inventory-management" // Changed to lowercase and hyphenated
  },
  {
    title: "Human Resources Management",
    icon: <FaUsers />,
    link: "/human-resources-management" // Changed to lowercase and hyphenated
  },
  {
    title: "Finance",
    icon: <FaMoneyBillWave />,
    link: "/finance" // Changed to lowercase
  },
  {
    title: "Kennel Management",
    icon: <FaDog />,
    link: "/kennel-management" // Changed to lowercase
  },
  {
    title: "Health Hubb",
    icon: <FaPaw />,
    link: "/health-hubb" // Changed to lowercase and hyphenated
  },
  {
    title: "Settings",
    icon: <FaCog />,
    link: "/settings" // Changed to lowercase
  },
  {
    title: "Task Schedule",
    icon: <MdSchedule />,
    link: "/task-schedule" // Changed to lowercase and hyphenated
  },
  {
    title: "Dimension",
    icon: <FaBriefcase />,
    link: "/dimension" // Changed to lowercase
  },
  {
    title: "Asset Management",
    icon: <MdAdd />,
    link: "/asset-management" // Changed to lowercase and hyphenated
  },
  {
    title: "Logout",
    icon: <FaSignOutAlt />,
    link: "/", // Log out action link
    onClick: Logout // Corrected onClick property
  }
];

export default HamburgerContent;
