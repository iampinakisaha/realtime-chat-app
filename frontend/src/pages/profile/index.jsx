import { useAppStore } from "@/store";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colors, getColors } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setSelectedColor(userInfo.color || 0);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is Required.");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const newUserData = {
          id: userInfo.id,
          firstName: firstName,
          lastName: lastName,
          image: image,
          color: selectedColor,
        };
        console.log("new user Data", newUserData);
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, newUserData, {
          withCredentials: true,
        });
        console.log("response is ", response.data);
        console.log("response is ", response.status);
        if (response.status === 200 && response.data) {
          console.log(true);
          console.log("user info is", userInfo);
          setUserInfo({ ...response.data });
          console.log("user info after change is", userInfo);
          toast.success("Profile Updated Successfully.");
          navigate("/chat");
        }
      } catch (error) {
        toast.error("Failed to update Profile.");
      }
    }
  };

  const handleNavigate = () => {
    if(userInfo.profileSetup) {
      navigate("/chat")
    } else {
      toast.error("Please setup profile.");
    }
  }
  return (
    <div className="bg-[#1b1c24] h-[100vh] w-full  flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col gap-10 w-full lg:max-w-[70%]  overflow-y-scroll scroolbar-none mx-auto">
        <div className="" onClick={handleNavigate}>
          <IoIosArrowBack className="text-5xl cursor-pointer lg:text-6xl text-white/90 active:scale-90 duration-300" />
        </div>
        <div className="flex flex-col md:grid grid-cols-[40%_60%]">
          <div
            className="h-full w-full relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden select-none">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-contain h-full w-full"
                />
              ) : (
                <div
                  className={`uppercase select-none h-32 w-32 md:h-48 md:w-48 text-6xl border-[2px] flex items-center justify-center rounded-full text-white ${getColors(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className="absolute  h-32 w-32 md:h-48 md:w-48  flex items-center justify-center bg-black/50 rounded-full ring-fuchsia-50 cursor-pointer select-none">
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer active:scale-95 " />
                ) : (
                  <FaPlus className="text-white/50 text-3xl cursor-pointer active:scale-95  " />
                )}
              </div>
            )}
          </div>

          {/* profile input section - start */}
          <div className="flex h-full w-full justify-center items-center">
            <div className="flex flex-col w-full justify-center items-center gap-5 p-10 text-xl text-[#d9dae4] ">
              <div className="grid grid-cols-[20%_80%] justify-between items-center w-full gap-5">
                <label htmlFor="email" className="text-[#d9dae4] text-xl">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  alt="email"
                  disabled
                  className="p-6 rounded-lg bg-[#2c2e3b]  border-none"
                  value={userInfo.email}
                ></input>
              </div>

              <div className="grid grid-cols-[20%_80%] justify-between items-center w-full gap-5">
                <label htmlFor="firstName" className="text-[#d9dae4] text-xl">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  alt="firstName"
                  placeholder="Enter your first Name"
                  className="p-6 rounded-lg bg-[#2c2e3b] border-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>

              <div className="grid grid-cols-[20%_80%] justify-between items-center w-full gap-5">
                <label htmlFor="lastName" className="text-[#d9dae4] text-xl">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  alt="lastName"
                  placeholder="Enter your last Name"
                  className="p-6 rounded-lg bg-[#2c2e3b] border-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>

              <div className="w-full flex justify-center items-center gap-5 p-5 overflow-auto scroolbar-none">
                {colors.map((color, index) => (
                  <div
                    className={`${color} min-h-8 min-w-8 md:h-10 md:w-10 rounded-full cursor-pointer transition-all duration-300 
          ${selectedColor === index ? "outline outline-white/50 outline-2" : ""}
        `}
                    key={index}
                    onClick={() => setSelectedColor(index)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          {/* profile input section -  end */}
        </div>

        <div className="flex justify-center w-full  mx-auto gap-5 h-full items-center mb-10">
          <Button
            className="active:scale-95 h-16 w-[90%] md:w-[60%] rounded-lg bg-purple-700 hover:bg-purple-900 transition-all duration-200 text-xl select-none"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
