import { useEffect, useState } from "react";
import "./App.css";
import { Account } from '@aleohq/sdk';
import { useAleoWASM } from "./aleo-wasm-hook.js";

function App() {
  const aleo = useAleoWASM();
  const [accountInfo, setAccountInfo] = useState(null);
  const [privateKey, setPrivateKey] = useState(""); 
  const [currentScreen, setCurrentScreen] = useState("home");

  const createAccount = () => {
    const newAccount = new Account();
    setAccountInfo({
      privateKey: newAccount.privateKey().to_string(),
      viewKey: newAccount.viewKey().to_string(),
      address: newAccount.address().to_string()
    });
    setCurrentScreen("accountInfo");
  };

  const importWallet = (inputPrivateKey) => {
    if (aleo) {
      const importedAccount = aleo.PrivateKey.from_string(inputPrivateKey);
      setAccountInfo({
        privateKey: importedAccount.privateKey().to_string(),
        viewKey: importedAccount.viewKey().to_string(),
        address: importedAccount.to_address().to_string()
      });
      setCurrentScreen("accountInfo");
    }
  };

  const handleInputChange = (event) => setPrivateKey(event.target.value);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aleo Wallet</h1>
        {/* Screen Navigation Buttons */}
        {currentScreen === "home" && (
          <>
            <button onClick={() => setCurrentScreen("createAccount")}>Create Account</button>
            <button onClick={() => setCurrentScreen("importWallet")}>Import Wallet</button>
          </>
        )}
        {/* Account Creation Screen */}
        {currentScreen === "createAccount" && (
          <button onClick={createAccount}>Create New Account</button>
        )}
        {/* Wallet Import Screen */}
        {currentScreen === "importWallet" && (
          <div>
            <input 
              type="text"
              placeholder="Enter your private key"
              value={privateKey}
              onChange={handleInputChange}
            />
            <button onClick={() => importWallet(privateKey)}>Import</button>
          </div>
        )}
        {/* Account Information Display */}
        {currentScreen === "accountInfo" && accountInfo && (
          <div>
            <p>Account Created!</p>
            <p>Private Key: {accountInfo.privateKey}</p>
            <p>View Key: {accountInfo.viewKey}</p>
            <p>Address: {accountInfo.address}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
