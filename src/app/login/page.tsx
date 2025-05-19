import React from "react";
import LoginForm from "./LoginForm";

const page = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
