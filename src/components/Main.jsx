import React, { useEffect, useState } from "react";

const Main = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [savePassword, setSavePassword] = useState([]);

  const generatePassword = () => {
    let passGenerate = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~!@#$%^&*_+=";
    }
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      let selectCharcter = str.charAt(randomIndex);
      passGenerate += selectCharcter;
    }

    setPassword(passGenerate);
  };
  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, charAllowed]);
  return (
    <div className="select-none flex flex-col gap-5 m-auto w-220">
      <h1 className="text-center text-4xl font-bold pt-20 ">
        Password Generator
      </h1>
      <input
        type="text"
        placeholder="Enter Password"
        readOnly={true}
        value={password}
        className="outline-none border-none bg-gray-200 px-3 py-2 rounded-lg text-black"
      />
      <label htmlFor="range">
        <input
          type="range"
          id="range"
          min={0}
          max={100}
          value={length}
          onChange={(event) => {
            setLength(event.target.value);
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #22c55e ${length}%, #e5e7eb ${length}%)`,
          }}
        />
      </label>
      <label
        htmlFor="numAllowed"
        className="flex gap-1.5 items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="numAllowed"
          className="w-5 h-5 accent-green-500 cursor-pointer. "
          checked={isNumberAllowed}
          onChange={(event) => {
            setIsNumberAllowed(event.target.checked);
          }}
        />
        Number Allowed
      </label>
      <label
        htmlFor="charAllowed"
        className="flex gap-1.5 items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="charAllowed"
          className="w-5 h-5 accent-green-500 cursor-pointer. "
          checked={charAllowed}
          onChange={(event) => {
            setCharAllowed(event.target.checked);
          }}
        />
        Charcter Allowed
      </label>
      <button className="px-6 py-2 text-white font-semibold cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg hover:scale-105 transition">
        Copy Password
      </button>
      <button
        onClick={() => {
          setPassword(" ");
          setLength(8);
          setIsNumberAllowed(false);
          setCharAllowed(false);
        }}
        className="px-6 py-2 text-white font-semibold cursor-pointer rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
      >
        Reset Password
      </button>
      <button
        onClick={() => {
          setSavePassword((prevPass) => {
            [...prevPass, password];
          });
        }}
        className="px-6 py-2 text-white font-bold cursor-pointer rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:from-emerald-500 hover:to-green-700 hover:scale-105 transition-all duration-300"
      >
        Save Password
      </button>
      {savePassword.map((item, idx) => {
        return <p key={idx}>{item}</p>;
      })}
    </div>
  );
};

export default Main;
