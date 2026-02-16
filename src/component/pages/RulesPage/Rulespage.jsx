import React, { useMemo, useState } from "react";
import "./Rulespage.scss";
import {
  Alert,
  Card,
  Divider,
  Layout,
  List,
  Segmented,
  Space,
  Typography,
} from "antd";
import { TranslationOutlined } from "@ant-design/icons";

const Rulespage = () => {
  const [lang, setLang] = useState("hindi");

  const content = useMemo(() => {
    return {
      hindi: {
        title: "खेल नियम और शर्तें",
        intro:
          "कृपया नियमों को समझने के लिए यहां कुछ मिनट दें, और अपने अनुसार समझ लें।",
        note:
          "नोट: यदि एजेंट ने इन शर्तों को पहले ही अपने ग्राहक को बता दिया है, तो बाद में किसी भी प्रकार का तर्क या विवाद स्वीकार नहीं किया जाएगा।",
        sections: [
          {
            title: "सामान्य नियम",
            items: [
              "सभी डीलर्स से निवेदन है कि क्लाइंट्स को साइट के रूल्स समझाने के बाद ही सौदे करवायें",
              "अगर आप इस एग्रीमेंट को ऐक्सेप्ट नहीं करते हे तो कोई सौदा नहीं कीजिये",
              "सर्वर या वेबसाइट में किसी तरह की खराबी आने या बंद हो जाने पर केवल किए गए सौदे ही मान्य होंगे",
              "कंपनी के पास अधिकार है कि वे किसी भी ऐड/शर्तों को निलंबित/रद्द करें अगर यह गलतफहमी साबित होता है",
              "यदि किसी सेशन के परिणाम में कोई त्रुटि (जैसे कि गलत ऑड्स, तकनीकी समस्या, या गलत रिपोर्ट किया गया परिणाम) पाई जाती है, तो कंपनी उस सेशन से जुड़ी शर्तों (बेट्स) को मैच समाप्त होने के बाद भी रद्द, संशोधित या हटाने का अधिकार रखती है।",
            ],
          },
          {
            title: "बुकमेकर नियम",
            items: [
              "किसी भी कारण से किसी भी टीम को फायदा होगा या नुकसान, इसमें हमारी कोई जवाबदारी नहीं है",
              "कंपनी के पास किसी भी मैच की कोई भी सौदे (केवल जीतने वाली सौदे) किसी भी समय रद्द करने का अधिकार है",
              "रिजल्ट या सेशन के बारे में किसी भी प्रश्न के लिए रिजल्ट के 4 दिनों के भीतर संपर्क किया जाना चाहिए",
              "यदि दो टीमों के अंक समान होते हैं, तो रिजल्ट पॉइंट टेबल के आधार पर दिया जाएगा",
              "किसी भी स्थिति में अगर वीडियो बाधित/बंद हो जाता है तो बुकमेकर बाजार को रद्द कर दिया जाएगा",
            ],
          },
          {
            title: "कैसीनो नियम",
            items: [
              "यदि किसी कैसिनो गेम में किसी टेक्निकल इशू की वजह से रिजल्ट नहीं डलता है तो क्लाइंट को कॉइन वापिस मिलेंगे",
              "ऐसी स्थिति मे कोई वाद विवाद मान्य नहीं होगा",
            ],
          },
          {
            title: "फैंसी नियम",
            items: [
              "मैच टाई होने पर सभी फैंसी बेटस मान्य होंगे",
              "टॉस या खराब मौसम की स्थिति से पहले सभी एडवांस फैंसीयां ससपेंड कर दी जाएंगी",
              "टेक्निकल एरर होने पर सभी पिछले दांव मान्य होंगे (हार/जीत के आधार पर)",
              "यदि किसी मामले में गलत रेट फैंसी में दी गई है तो उस फैंसी बेटस को रद्द कर दिया जाएगा",
              "किसी भी परिस्थिति में सभी एक्सचेंज में मैनेजमेंट का निर्णय अंतिम होगा",
            ],
          },
          {
            title: "टेस्ट मैच नियम",
            items: [
              "एडवांस सेशन टेस्ट में मान्य है",
              "घोषित पारी या ऑल आउट होने पर अधूरे सेशन रद्द होंगे",
              "टेस्ट मैच में दोनों इनिंग में एडवांस फैंसी मान्य हैं",
              "बल्लेबाज के चोटिल होने पर जितने रन पर थे वही रिजल्ट माना जाएगा",
              "एडवांस फैंसी में केवल डिक्लेयर्ड ओपनिंग बल्लेबाज ही मान्य होंगे",
            ],
          },
          {
            title: "वनडे नियम",
            items: [
              "पहले ओवर रन एडवांस फैंसी केवल पहली पारी के रन गिने जाएंगे",
              "बारिश या मैच रद्द होने पर कम्प्लीट फैंसी मान्य रहेंगी",
              "एडवांस फैंसी केवल पहली पारी में मान्य है",
              "50 ओवर पूरे न होने पर सभी बेट रद्द होंगे",
              "बल्लेबाज के चोटिल होने पर जितने रन पर थे वही रिजल्ट माना जाएगा",
            ],
          },
          {
            title: "T20 नियम",
            items: [
              "पहले ओवर रन एडवांस फैंसी केवल पहली पारी के रन गिने जाएंगे",
              "मैच रद्द होने पर कम्प्लीट फैंसी मान्य रहेंगी",
              "एडवांस 20 ओवर रन केवल पहली पारी में मान्य है",
              "बल्लेबाज के चोटिल होने पर जितने रन पर थे वही रिजल्ट माना जाएगा",
              "एडवांस सेशन केवल पहली पारी में मान्य है",
            ],
          },
          {
            title: "बॉलर रन फैंसी नियम",
            items: [
              "फैंसी में केवल बॉलर द्वारा दिए गए रन ही मान्य होंगे",
              "टीम के लेग बाई और बाई रन बॉलर फैंसी में नहीं गिने जाएंगे",
              "ओवर रन फैंसी में एक्स्ट्रास और बल्लेबाज के रन मान्य होंगे",
            ],
          },
          {
            title: "पावर प्ले नियम",
            items: [
              "पावर प्ले पहले 4 ओवर + पावर सर्ज 2 ओवर (बल्लेबाज की पसंद)",
              "बल्लेबाजी टीम 11वें ओवर के बाद कभी भी पावर सर्ज ले सकती है",
              "पावर सर्ज में 30-यार्ड सर्कल से बाहर अधिकतम 2 फील्डर",
            ],
          },
          {
            title: "डॉट बॉल नियम",
            items: [
              "केवल बिना रन वाली गेंदें डॉट बॉल मानी जाएंगी",
              "विकेट की गेंदें डॉट बॉल गिनी जाएंगी",
              "फ्री हिट पर बाउंड्री हिट ही मान्य होगी",
              "केवल बल्ले से लगी बाउंड्रीज मान्य होंगी (एज या मिसफील्ड नहीं)",
            ],
          },
        ],
      },
      english: {
        title: "Rules & Conditions",
        intro:
          "Please take a few minutes to understand the rules and proceed accordingly.",
        note:
          "Note: If the agent has already informed these conditions to the client, no disputes will be entertained later.",
        sections: [
          {
            title: "General Rules",
            items: [
              "Dealers must explain site rules to clients before placing any bets.",
              "If you do not accept this agreement, do not place any bets.",
              "In case of server or website issues, only placed bets will be valid.",
              "The company reserves the right to suspend/cancel any add-on/terms if found to be incorrect.",
              "If any session result has an error (wrong odds, technical issue, or misreported result), the company can cancel, modify, or remove related bets even after the match ends.",
            ],
          },
          {
            title: "Bookmaker Rules",
            items: [
              "We are not responsible for any team’s gain or loss for any reason.",
              "The company can cancel any match bets (only winning bets) at any time.",
              "Queries regarding result/session must be raised within 4 days of the result.",
              "If two teams have the same points, the result will be decided by the points table.",
              "If video is interrupted/stopped, the bookmaker market will be void.",
            ],
          },
          {
            title: "Casino Rules",
            items: [
              "If a casino game result is not posted due to a technical issue, coins will be refunded.",
              "In such cases, no disputes will be accepted.",
            ],
          },
          {
            title: "Fancy Rules",
            items: [
              "All fancy bets are valid in case of a tie.",
              "All advance fancys will be suspended before the toss or in bad weather.",
              "In case of technical error, all previous bets remain valid (win/lose basis).",
              "If a fancy is offered at the wrong rate, those bets will be void.",
              "Management’s decision is final in all exchanges.",
            ],
          },
          {
            title: "Test Match Rules",
            items: [
              "Advance session is valid in Test matches.",
              "Incomplete sessions are void in case of declaration or all out.",
              "Advance fancy is valid for both innings.",
              "If a batsman retires hurt, result is based on runs scored.",
              "Only declared opening batsmen are valid in advance fancy.",
            ],
          },
          {
            title: "ODI Rules",
            items: [
              "First over run advance fancy counts only first-innings runs.",
              "Complete fancy remains valid if match is abandoned due to rain.",
              "Advance fancy is valid only in the first innings.",
              "If 50 overs are not completed, all bets will be void.",
              "If a batsman is injured, result is based on runs scored.",
            ],
          },
          {
            title: "T20 Rules",
            items: [
              "First over run advance fancy counts only first-innings runs.",
              "Complete fancy remains valid if match is abandoned.",
              "Advance 20 over run is valid only in the first innings.",
              "If a batsman is injured, result is based on runs scored.",
              "Advance session is valid only in the first innings.",
            ],
          },
          {
            title: "Bowler Run Fancy Rules",
            items: [
              "Only runs conceded by the bowler are counted.",
              "Leg byes and byes are not counted in bowler fancy.",
              "Over run fancy counts extras and batsman runs.",
            ],
          },
          {
            title: "Power Play Rules",
            items: [
              "Powerplay: first 4 overs + 2-over power surge (batting team choice).",
              "Batting team can take power surge anytime after the 11th over.",
              "Max 2 fielders outside the 30-yard circle during power surge.",
            ],
          },
          {
            title: "Dot Ball Rules",
            items: [
              "Only balls with no runs are counted as dot balls.",
              "Wicket balls are counted as dot balls.",
              "On a free hit, only boundary hits are valid.",
              "Only bat boundaries are valid (no edges or misfields).",
            ],
          },
        ],
      },
    };
  }, []);

  const activeContent = lang === "hindi" ? content.hindi : content.english;

  return (
    <Layout className="rules-layout">
      <Layout.Content className="rules-content">
        <div className="rules-header-inner">
          <Space>
            <Segmented
              value={lang}
              onChange={setLang}
              options={[
                {
                  label: (
                    <Space size="small">
                      <TranslationOutlined />
                      हिंदी
                    </Space>
                  ),
                  value: "hindi",
                },
                {
                  label: (
                    <Space size="small">
                      <TranslationOutlined />
                      English
                    </Space>
                  ),
                  value: "english",
                },
              ]}
            />
          </Space>
        </div>
        <Card
          className="rules-card"
          title={<Typography.Title level={2}>{activeContent.title}</Typography.Title>}
        >
          <div className="rules-intro">
            <Alert message={activeContent.intro} type="info" showIcon />
          </div>
          {activeContent.sections.map((section, index) => (
            <div key={`${section.title}-${index}`} className="rules-section">
              <Divider orientation="left">
                <Typography.Title level={4}>{section.title}</Typography.Title>
              </Divider>
              <List
                size="small"
                bordered
                dataSource={section.items}
                renderItem={(item, itemIndex) => (
                  <List.Item>
                    <Typography.Text strong>{itemIndex + 1}.</Typography.Text>
                    <span className="rules-item-text">{item}</span>
                  </List.Item>
                )}
              />
            </div>
          ))}
          <Divider />
          <Typography.Text type="secondary">{activeContent.note}</Typography.Text>
        </Card>
      </Layout.Content>
    </Layout>
  );
};

export default Rulespage;
