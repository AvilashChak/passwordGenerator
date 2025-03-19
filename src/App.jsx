import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [copied, setCopied] = useState(false);

  // use ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+|[]{};:/?.>`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]); // using setPassword in dependency to optimize(memoization)

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password);
    passwordRef.current.select(password);
    passwordRef.current.setSelectionRange(0, 16);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [password, copied]);

  // to render when page loads
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-md relative animate-fadeIn">
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
              Password Generator
            </h1>

            {/* Password Display */}
            <div className="flex mb-4">
              <input
                type="text"
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-700"
                placeholder="Your password"
                value={password}
                ref={passwordRef}
              />
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 rounded-r-md flex items-center transition duration-300 cursor-pointer"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>

            {/* Copy confirmation */}
            {copied && (
              <p className="text-green-500 text-sm font-bold mb-2 text-center">
                Copied!
              </p>
            )}

            {/* Length slider */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password Length:{" "}
                <span className="text-indigo-600">{length}</span>
              </label>
              <input
                type="range"
                min="4"
                max="24"
                className="w-full cursor-pointer accent-indigo-500"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>

            {/* Checkboxes */}
            <div className="flex justify-between mb-6">
              <label className="flex items-center space-x-2 text-gray-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-indigo-500 w-5 h-5"
                  defaultChecked={numberAllowed}
                  onChange={() => setNumberAllowed((prev) => !prev)}
                />
                <span>Numbers</span>
              </label>

              <label className="flex items-center space-x-2 text-gray-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-indigo-500 w-5 h-5"
                  defaultChecked={charAllowed}
                  onChange={() => setCharAllowed((prev) => !prev)}
                />
                <span>Characters</span>
              </label>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default App;