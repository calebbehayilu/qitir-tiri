import React from "react";

const Welcome = () => {
  return (
    <div className="p-20 hero placeholder: flex flex-col items-center justify-center ">
      <div className=" max-w-md">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-300">
          Qitir Tiri - ቅጥር ጥሪ
        </h1>
        <p className="py-4 text-lg">
          Qitir Tiri is dedicated to empowering your job hunt. We're your
          one-stop shop to navigate the application jungle, craft killer
          resumes, and land your dream career.
        </p>
        <button className="btn btn-outline btn-xl">Get started</button>
      </div>
    </div>
  );
};

export default Welcome;
