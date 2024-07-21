import { getColors } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Avatar } from "@radix-ui/react-avatar";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { AvatarImage } from "@/components/ui/avatar";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { LOGOUT_ROUTE } from "@/utils/constants";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true});
      
      if(response.status === 200) {
        setUserInfo(null);
        navigate("/auth")
      }
    } catch (error) {
      toast.error("Logout unsuccessfull.")
    }
  }
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-5 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="h-12 w-12 relative">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden select-none">
            {userInfo.image ? (
              <AvatarImage
                src={userInfo.image}
                alt="profile"
                className="object-contain h-full w-full"
              />
            ) : (
              <div
                className={`uppercase select-none h-12 w-12  text-xl border-[2px] flex items-center justify-center rounded-full text-white ${getColors(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><FiEdit2 className="text-purple-500 text-xl font-medium" 
              onClick={()=> navigate('/profile')}
            /></TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><IoPowerSharp   className="text-red-500 text-xl font-medium active:scale-95" 
              onClick={handleLogout}
            /></TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Log Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      
    </div>
  );
};

export default ProfileInfo;
