import Header from "../comp/header.jsx";
import Footer from "../comp/Footer.jsx";
import "./Home.css";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import PlayfairCipher from "../chiphers/playfair.js";

const Home = () => {
  const [mainTitle, setmainTitle] = useState("Encrypt");
  const [selectedValue, setSelectedValue] = useState("playfair");
  const [inputMsg, setinputMsg] = useState("EnDecryption");
  const [currentkey, setcurrentkey] = useState("Algorithm");

  const plaintext = document.getElementById("plaintext");
  const result = document.getElementById("result");
  const key = document.getElementById("key");

  const handleSelectChange = (eo) => {
    setSelectedValue(eo.target.value); // Update the state with selected value
  };

  const Encrypt = () => {
    switch (selectedValue) {
      case "playfair":
        const playfair = new PlayfairCipher(key.value);
        result.value = playfair.encrypt(plaintext.value);
        break;

      // case "test":
      //  result.value = playfair.encrypt(plaintext.value)
      // break;

      default:
        result.value = "Hello My Friends";
        break;
    }
  };

  const Decrypt = () => {
    switch (selectedValue) {
      case "playfair":
        const playfair = new PlayfairCipher(key.value);
        result.value = playfair.decrypt(plaintext.value);
        break;

      // case "test":
      //  result.value = playfair.encrypt(plaintext.value)
      // break;

      default:
        result.value = "Hello My Friends";
        break;
    }
  };

  const showResult = () => {
    // console.log("key: ",currentkey);
    // console.log("plaintext: ",plaintext.value);
    // console.log("result: ",result.value);
    // console.log("selectedValue: ",selectedValue);

    switch (mainTitle) {
      //Encrypt
      case "Encrypt":
        Encrypt();

        break;

      case "Decrypt":
        Decrypt();

        break;

      default:
        result.value = "Hello My Friends";
        break;
    }
  };

  return (
    <>
      <Helmet>
        <title>Encryption | Decryption</title>
      </Helmet>

      <Header />

      <main>
        <section className="first-sec">
          <h1>{mainTitle} Online</h1>

          <article>
            <button
              onClick={() => {
                setmainTitle("Encrypt");
              }}
              className="mybtn"
            >
              Encrypt Tool
            </button>

            <button
              onClick={() => {
                setmainTitle("Decrypt");
              }}
              className="mybtn"
            >
              Decrypt Tool
            </button>
          </article>
        </section>

        <section className="second-sec">
          <label
            className="enc-type"
            htmlFor="encryptionType"
            style={{ fontSize: "20px", fontWeight: "normal" }}
          >
            {mainTitle}ion Type
          </label>
          <select
            style={{
              fontSize: "15px",
              color: "black",
              marginLeft: "15px",
              padding: "5px",
              borderRadius: "5px",
            }}
            name=""
            id="encryptionType"
            value={selectedValue} // Set the value to be the current selected value
            onChange={handleSelectChange} // Handle change event
          >
            {" "}
            <option value="Playfair">Playfair </option>
            <option>Playfair2</option>
            <option>Playfair3</option>
            <option>Playfair4</option>
          </select>
        </section>

        <section className="third-sec">
          <article>
            <textarea
              onChange={(eo) => {
                setinputMsg(eo.target.value);
              }}
              id="plaintext"
              className="myTextarea"
              placeholder={`Enter text to ${mainTitle} here `}
            ></textarea>

            <textarea
              id="result"
              className="myTextarea"
              placeholder={`${mainTitle}ed value will appear here `}
            ></textarea>
          </article>

          <div>
            <label
              className="enc-key"
              htmlFor="key"
              style={{ fontSize: "18px", letterSpacing: "1.2px" }}
            >
              Encryption Key
            </label>
            <input
              type="text"
              id="key"
              placeholder="Autism"
              onChange={(eo) => {
                setcurrentkey(eo.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              showResult();
            }}
            className="mybtn"
          >
            {mainTitle} <i className="icon-arrow-right"></i>
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
