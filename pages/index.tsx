import { useState } from "react"
import copy from "copy-to-clipboard"
import PasswordStrength from "../components/PasswordStrength"

export default function App() {
  const [passwordLength, setPasswordLength] = useState<number | string>(16)
  const [addUppercase, setAddUppercase] = useState(true)
  const [addNumber, setAddNumber] = useState(true)
  const [addSymbol, setAddSymbol] = useState(true)
  const [password, setPassword] = useState(() => generatePassword())
  const [showAlert, setShowAlert] = useState(false)

  function generatePassword(
    characterAmount = passwordLength,
    addUpper = addUppercase,
    addNumbers = addNumber,
    addSymbols = addSymbol
  ) {
    const uppercase_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase_CHAR = "abcdefghijklmnopqrstuvwxyz"
    const number_CHAR = "1234567890"
    const symbol_CHAR = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

    let combinedCharacters = lowercase_CHAR

    if (addUpper) combinedCharacters += uppercase_CHAR
    if (addNumbers) combinedCharacters += number_CHAR
    if (addSymbols) combinedCharacters += symbol_CHAR


    let password = ""
    for (let i = 0; i < characterAmount; i++) {
      password += combinedCharacters.charAt(Math.floor(Math.random() * combinedCharacters.length))
    }
    return password
  }

  function handleCopy(password: string) {
    copy(password)
    setShowAlert(true)
    window.setTimeout(() => setShowAlert(false), 1000)
  }


  return (
    <div className="container relative my-5 px-3 sm:px-0 h-screen flex items-center justify-center">
      <div
        className={showAlert ? "absolute top-14 flex h-10 w-60 items-center justify-center rounded-lg bg-green-100 text-green-800 shadow-md transition-opacity duration-300" : "hidden"}
      >
        Password copied!
      </div>
      <div className="mb-8 max-w-md rounded-lg bg-white py-10 px-5 text-center shadow-lg transition-all  sm:px-10">
        <h1 className="mb-8 text-2xl font-bold text-slate-700 transition-all  sm:text-3xl">Password Generator</h1>
        <div className="my-1 flex h-10 items-center transition-all sm:h-14">
          <input
            type="text"
            value={password}
            className="h-full w-full rounded-l-lg border p-3"
            disabled
          />
          <button
            className="group flex h-full items-center rounded-r-lg bg-slate-200"
            onClick={() => handleCopy(password)}
            data-tip="Copy"
            aria-label="Copy"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-slate-700 transition-all group-hover:scale-105 group-active:scale-95 "
            >
              <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
            </svg>
          </button>
        </div>
        <div className="flex mx-4 my-2 justify-between">
          <input
            type="number"
            disabled
            value={passwordLength}
            onChange={(event) => setPasswordLength((event.target.value))}
            className="w-10 rounded border text-center"
          /><PasswordStrength password={password} />
        </div>
        <div className="flex items-center my-4 justify-start">
          <input
            type="range"
            className="mx-2 h-2 w-full appearance-none rounded bg-slate-200 "
            min={1}
            max={20}
            // disabled
            value={passwordLength}
            onChange={(event) => setPasswordLength(parseInt(event.target.value))}
          />
        </div>
        <div className="grid grid-cols-2 mx-4 gap-2 gap-x-20 ">
          <p className="text-left text-lg font-semibold">
            Capital letters
          </p>
          <div className="flex justify-start">
            <label className="bg-slate-200 cursor-pointer relative w-10 h-5 rounded-full">
              <input type="checkbox" className="sr-only peer" defaultChecked={addUppercase}
                onChange={() => setAddUppercase((addUppercase) => !addUppercase)} />
              <span className="w-5 h-5 bg-red-500 absolute rounded-full left-0 inset-y-0 peer-checked:bg-blue-600 peer-checked:left-5 transition-all duration-500"></span>
            </label>
          </div>
          <p className="text-left text-lg font-semibold">
            Numbers
          </p>
          <div className="flex justify-start">
            <label className="bg-slate-200 cursor-pointer relative  w-10 h-5 rounded-full">
              <input type="checkbox" className="sr-only peer" defaultChecked={addNumber}
                onChange={() => setAddNumber((addNumber) => !addNumber)} />
              <span className="w-5 h-5 bg-red-500 absolute rounded-full left-0 inset-y-0 peer-checked:bg-blue-600 peer-checked:left-5 transition-all duration-500"></span>
            </label>
          </div>
          <p className="text-left text-lg font-semibold">
            Symbol
          </p>
          <div className="flex justify-start">
            <label className="bg-slate-200 cursor-pointer relative  w-10 h-5 rounded-full">
              <input type="checkbox" className="sr-only peer" defaultChecked={addSymbol}
                onChange={() => setAddSymbol((addSymbol) => !addSymbol)} />
              <span className="w-5 h-5 bg-red-500 absolute rounded-full left-0 inset-y-0 peer-checked:bg-blue-600 peer-checked:left-5 transition-all duration-500"></span>
            </label>
          </div>
        </div>
        <button
          className="mt-3 w-full text-white rounded-lg bg-blue-500 p-3 font-semibold"
          onClick={() => setPassword(generatePassword(passwordLength, addUppercase, addNumber, addSymbol))}
        >Generate
        </button>
      </div>
    </div>
  )
}
