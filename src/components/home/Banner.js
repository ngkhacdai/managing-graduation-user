import React from "react";
import banner from "@/assets/banner.jpg";
import clouds from "@/assets/clouds.png";
import fogLow from "@/assets/fog-low.png";
import { FaGithub } from "react-icons/fa";
import { useTranslations } from "use-intl";

const Banner = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="select-none overflow-hidden relative whitespace-nowrap w-full h-screen">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={banner.src}
        alt=""
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* clound */}
      {/* <div className="absolute h-[35rem] bottom-0 flex opacity-60">
        <img
          className="flex w-full h-full bg-cover bg-repeat-x animate-[cloudsMoveContinuous_75s_linear_infinite]"
          src={clouds.src}
          alt="clouds"
        />
        <img
          className="flex w-full h-full bg-cover bg-repeat-x animate-[cloudsMoveContinuous_75s_linear_infinite]"
          src={clouds.src}
          alt="clouds"
        />
      </div> */}

      {/* text project */}
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p className="text-center absolute mb-20 text-white text-4xl md:text-[4rem] font-bold">
          Graduation Project
        </p>
        {/* <img alt="" src={fogLow.src} /> */}
      </div>
      {/* sign */}
      {/* <div className="absolute bottom-5 inset-0 flex justify-center items-end">
        <div className="flex items-center">
          <p className=" text-lg md:text-xl font-semibold text-white">
            {t("design")}
          </p>
          <a
            className="mx-2"
            target="_blank"
            href="https://github.com/ngkhacdai/managing-graduation-user.git"
          >
            <FaGithub size={20} />
          </a>
          <p className="text-lg md:text-xl font-semibold text-white">
            ngkhacdai
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Banner;
