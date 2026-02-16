import { useState } from "react";
import "./HomeRules.scss";

const HomeRules = ({ onCancel, onOk }) => {
  const [activeTab, setActiveTab] = useState("hindi");

  return (
    <div className="custom-modal-text modal-body">
      {/* TABS */}
      <div className="rules-tabs">
        <button
          className={activeTab === "hindi" ? "active" : ""}
          onClick={() => setActiveTab("hindi")}
        >
          हिंदी
        </button>
        <button
          className={activeTab === "english" ? "active" : ""}
          onClick={() => setActiveTab("english")}
        >
          ENGLISH
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === "hindi" && (
        <div className="rules-content">
          <h3>प्रिय ग्राहक</h3>
          <p>
            किसी भी इवेंट या खेल का परिणाम गलती से दर्ज होने पर, उसे सही करने का
            अधिकार हमेशा रहेगा। परिणाम दर्ज होने के बाद से 24 से 48 घंटों के अंदर
            या कभी भी उस खेल या इवेंट का सही परिणाम दर्ज किया जा सकता है।
            <br /><br />
            यदि ग्राहक घोषित ग़लत रिजल्ट के द्वारा बड़े हुये कॉइन का यूज़ करता है
            तो रिजल्ट सही किए जाने पर इस्तेमाल किए गए कॉइन का भुगतान ग्राहक को
            ख़ुद करना पड़ेगा, या ग्राहक की आईडी से कॉइन माइनस या काट लिए जाएँगे।
            <br /><br />
            यदि ग्राहक इन शर्तों से सहमत होता है, तो ही वह इस साइट पर बैटिंग कर
            सकता है। इस स्थिति में बाद में किसी भी प्रकार का विवाद न तो एजेंट के
            साथ और न ही एजेंट के द्वारा कंपनी के साथ स्वीकार किया जाएगा। यदि एजेंट
            ने इन शर्तों को पहले ही अपने ग्राहक को बता दिया हो, तो बाद में किसी भी
            प्रकार का तर्क या विवाद स्वीकार नहीं किया जाएगा।
          </p>
        </div>
      )}

      {activeTab === "english" && (
        <div className="rules-content">
          <h3>Dear Client</h3>
          <p>
            If any event or game is entered in error, the user shall always have
            the right to correct it. The correct result for the game or event may
            be entered within 24 to 48 hours after the result has been entered or
            at any time.
          <br /><br />
            If the Client uses the coins added by a wrong result declared, then
            the Client will have to pay for the coins used when the result is
            corrected, or the coins will be deducted from the Client's ID.
         <br /><br />
            The Client can bet on this site only if they agree to these terms. In
            this case, no dispute of any kind will be entertained later either
            with the Agent or by the Agent with the Company. If the Agent has
            already informed these conditions to its Client, no argument or
            dispute of any kind will be entertained later.
          </p>
        </div>
      )}

      {/* FOOTER BUTTONS */}
      <div className="rules-footer">
        <button
          type="button"
          className="btn-cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-ok"
          onClick={onOk}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default HomeRules;
