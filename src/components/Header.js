import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [userRole, setUserRole] = useState(null);
  const authContext = useContext(AuthContext);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://servers-beit.onrender.com/api/login", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserRole(response.data.check);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const navigation = {
    Account: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/home.png") },
      { to: "/account-stock-in", label: "Stock In", icon: require("../assets/stockIn.png") },
      { to: "/job-card", label: "Stock In Table", icon: require("../assets/stockInTable.png") },
      { to: "/account-stock-out", label: "Stock Out", icon: require("../assets/stockOut.png") },
      { to: "/stock-out-data", label: "Stock Out Table", icon: require("../assets/stockOutta.png") },
    ],
    Dispatch: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/dispatch-stock", label: "Dispatch Stock In", icon: require("../assets/aso.jpeg") },
      { to: "/dispatch-data", label: "Dispatch Stock Table", icon: require("../assets/aso.jpeg") },
    ],
    Heat: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/heat-issue", label: "Heatset Issue", icon: require("../assets/aso.jpeg") },
      { to: "/heat-issue-table", label: "Heatset Issue Table", icon: require("../assets/aso.jpeg") },
    ],
    Process: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/processing-issue", label: "Processing Issue", icon: require("../assets/aso.jpeg") },
      { to: "/processing-issue-table", label: "Processing Issue Table Completed", icon: require("../assets/aso.jpeg") },
      { to: "/processing-issue-table-reject", label: "Processing Issue Table Reject", icon: require("../assets/aso.jpeg") },
    ],
    Finish: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/finish-issue", label: "Finish Issue", icon: require("../assets/aso.jpeg") },
      { to: "finish-issue-table", label: "Finish Issue Table", icon: require("../assets/aso.jpeg") },
      { to: "/finish-issue-table-reject", label: "Finish Issue Table Reject", icon: require("../assets/aso.jpeg") },
    ],
    Grey: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/grey-stock", label: "Grey Stock IN", icon: require("../assets/aso.jpeg") },
      { to: "/grey-table", label: "Grey Table", icon: require("../assets/aso.jpeg") },
      { to: "/grey-table-reject", label: "Grey Table Reject", icon: require("../assets/aso.jpeg") },
    ],
    Admin: [
      { to: "dashboard-account", label: "Dashboard", icon: require("../assets/dis.jpeg") },
      { to: "/job-card", label: "Account Stock IN", icon: require("../assets/aso.jpeg") },
      { to: "/grey-table", label: "Grey Data", icon: require("../assets/aso.jpeg") },
      { to: "/heat-issue-table", label: "Heat Data", icon: require("../assets/aso.jpeg") },
      { to: "finish-issue-table", label: "Finish Data", icon: require("../assets/aso.jpeg") },
      { to: "/dispatch-data", label: "Dispatch Data", icon: require("../assets/aso.jpeg") },
      { to: "/stock-out-data", label: "Account Stock Out Table", icon: require("../assets/aso.jpeg") },
      { to: "/add-user", label: "Add User", icon: require("../assets/aso.jpeg") },
      { to: "/add-party", label: "Add Party", icon: require("../assets/aso.jpeg") },
      { to: "/add-quality", label: "Add Quality", icon: require("../assets/aso.jpeg") },
      { to: "/greyreport", label: "Grey Report", icon: require("../assets/aso.jpeg") },
      { to: "/dispatchreport", label: "Dispatch Report", icon: require("../assets/aso.jpeg") },
      { to: "/partyreport", label: "Party Sum Report", icon: require("../assets/aso.jpeg") },
      { to: "/pendencyreport", label: "Pendency Report", icon: require("../assets/aso.jpeg") },
    ],
  };

  const userNavigation = (navigation[userRole] || []).concat([{ name: "Sign out", href: "#" }]);

  const handleSignOut = async () => {
    try {
      const response = await fetch("https://servers-beit.onrender.com/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        toast("Logout Successful!", { autoClose: 2000 });
        setTimeout(() => {
          localStorage.removeItem("user");
          authContext.signout();
        }, 2000);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-nav p-3 shadow-gray-600">
          {({ open }) => (
            <>
              <div className="ml-[10px]">
                <div className="flex items-center justify-between">
                  <Link to="/dashboard-account">
                    <div className="flex gap-2">
                      <img
                        className="h-[41px] w-[40px]"
                        src={require("../assets/Slogo2.png")}
                        alt="Inventory Management System"
                      />
                      <p className="items-center mt-2 font-login font-semibold">SINGHANIA FINISHERS</p>
                    </div>
                  </Link>
                  <div className="flex items-center">
                    {/* need to add link into it */}
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-8 md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                      </button>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <div className="flex gap-[24px] items-center justify-center">
                              <img
                                className="h-[24px] w-[24px]"
                                src={require("../assets/searchicon.png")}
                                alt="Inventory Management System"
                              />
                              <img
                                className="h-[24px] w-[24px]"
                                src={require("../assets/commentIcon.png")}
                                alt="Inventory Management System"
                              />
                              <img
                                className="h-[24px] w-[24px]"
                                src={require("../assets/notificationIcon.png")}
                                alt="Inventory Management System"
                              />
                              <div>
                                <p className="font-semibold font-footer text-[14px]">Rohit</p>
                                <p className="font-medium font-footer text-[12px] text-footer_red">Log Out</p>
                              </div>
                              <img
                                className="h-[48px] w-[48px] rounded-full"
                                src={require("../assets/footer_img.png")}
                                alt="profile"
                              />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                    onClick={item.name === "Sign out" ? handleSignOut : undefined}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-[1px] py-[2px] text-sm text-gray-700"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="mr-2 flex md:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-darkgray focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {(navigation[userRole] || []).map((item) => (
                    <Link to={item.to} key={item.label}>
                      <Disclosure.Button
                        key={item.label}
                        as="a"
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:bg-gray hover:text-white mt-2 w-[300px]",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                      >
                        {item.label}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <Link to={"/profile-page"}
                      onClick={() => {
                        // closePanel();
                      }}
                    >
                      <div>
                        <div className="text-base font-medium leading-none text-black">
                          {localStorageData.firstName} {localStorageData.lastName}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {localStorageData.email}
                        </div>
                      </div>
                    </Link>
                    {/* <button
                      type="button"
                      className="ml-auto flex-shrink-0 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    ></button> */}
                  </div>
                  <div className="space-y-1 ml-1">
                    {userNavigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={item.name === "Sign out" ? handleSignOut : undefined}
                        className="block ml-4 text-base font-medium text-gray-400 hover:bg-gray-700 hover:bg-gray hover:text-white rounded-lg"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}