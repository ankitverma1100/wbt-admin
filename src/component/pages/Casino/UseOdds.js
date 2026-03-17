import { useEffect, useState } from "react";
import { baseUrl } from "../../../store/constant";

const casinoOddsApi =
  import.meta.env.VITE_CASINO_ODDS_API || import.meta.env.VITE_ODDS_API;

export const useOdds = (value) => {
  const [odds, setOdds] = useState(null);
  const [pnl, setPnl] = useState({});
  const [betPlace, setBetPlace] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const timer = setInterval(() => {
      if (value) {
        fetch(`${casinoOddsApi}/betfair_api/casino/data/meta-${value}`)
          .then((res) => res.json())
          .then((res) => {
            if (Array.isArray(res?.bf)) {
              convertBfToT2(res.data);
            }

            if (Array.isArray(res?.t2)) {
              if (Array.isArray(res?.t3)) {
                res.t2 = [...res.t2, ...res.t3];
              }

              res.t2BySid = {};
              res.t2.forEach((item) => {
                if (!item.nation && item.nat) {
                  item.nation = item.nat;
                }
                item.gstatus =
                  Number(item.gstatus) === 1
                    ? true
                    : Number(item.gstatus) === 0
                    ? false
                    : item.gstatus;
                item.pnl = pnl[item.sid] || 0;
                res.t2BySid[item.sid] = item;
              });
            }

            setOdds(res);
          });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [pnl, value]);

  useEffect(() => {
    return () => setOdds(null);
  }, [value]);

  useEffect(() => {
    const timer = setInterval(() => {
      const mid = odds?.t1?.[0]?.mid;
      if (Number(mid)) {
        fetch(`${baseUrl}/casino/liability`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roundId: mid }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.data) {
              const newPnl = {};
              for (const i of res.data) {
                newPnl[i.sid] = i.liability;
              }
              setPnl(newPnl);
            } else {
              setPnl({});
            }
          });
      }
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [betPlace, odds?.t1?.[0]?.mid]);

  return { odds, setBetPlace, pnl };
};

const convertBfToT2 = (oddData) => {
  if (oddData?.data?.bf && oddData.data.bf.length > 0) {
    oddData.data.bf.forEach((bfElement, index) => {
      const t2Obj = {
        mid: bfElement.marketId,
        sid: bfElement.sectionId,
        max: +bfElement.max,
        min: +bfElement.min,
        gstatus: bfElement.gstatus,
        gtype: bfElement.gameType,
        nation: bfElement.nation,
        nat: bfElement.nation,
        rate: "",
        b1: `${bfElement.b1}`,
        l1: `${bfElement.l1}`,
        bs1: `${bfElement.bs1}`,
        ls1: `${bfElement.ls1}`,
      };

      const t1Obj = {
        mid: bfElement.marketId,
        autotime: bfElement.UpdateTime,
        gtype: bfElement.gameType,
        remark: bfElement.remark,
        max: +bfElement.max,
        min: +bfElement.min,
      };

      if (index === 0) {
        t1Obj.C1 = bfElement.C1;
        t1Obj.C3 = bfElement.C2;
        t1Obj.C5 = bfElement.C3;
      }

      if (index === 1) {
        t1Obj.C2 = bfElement.C1;
        t1Obj.C4 = bfElement.C2;
        t1Obj.C6 = bfElement.C3;
      }

      if (Array.isArray(oddData.data.t1)) {
        const newT1Obj = [{ ...oddData.data.t1[0], ...t1Obj }];
        oddData.data.t1 = newT1Obj;
      } else {
        oddData.data.t1 = [t1Obj];
      }

      if (Array.isArray(oddData.data.t2)) {
        oddData.data.t2.push(t2Obj);
      } else {
        oddData.data.t2 = [t2Obj];
      }
    });
  }
};
