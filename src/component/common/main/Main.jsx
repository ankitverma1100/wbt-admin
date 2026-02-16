// src/components/Main/Main.jsx
import { Route, Routes } from "react-router-dom";
import Signin from "../signin/Signin";
import LoginDirect from "../signin/LoginDirect";
import LayOut from "../../layout/LayOut";
import Dashboard from "../../pages/Dashboard/Dashboard";
// import MasterDetails from "../../pages/masterDetail/MasterDetails";
import LadgerDetails from "../../pages/ladgerdetail/LadgerDetails";
import SportsDetails from "../../pages/sportsdetails/SportsDetails";
// import LiveReport from "../../pages/sportsdetails/livereport/LiveReport";
import PlusMinusReport from "../../pages/sportsdetails/plusminusreport/PlusMinusReport";
import PlusMinusDetails from "../../pages/sportsdetails/plusminusreport/plusMinusDetails/PlusMinusDetails";
import FancySlips from "../../pages/sportsdetails/fancyslips/FancySlips";
import CompletedFancySlips from "../../pages/sportsdetails/completedFancySlips/CompletedFancySlips";
import RejectedBetsByEvent from "../../pages/sportsdetails/rejectedBetsByEvent/RejectedBetsByEvent";
import ListSuper from "../../pages/supermaster/listsuper/ListSuper";
import UpdateSuper from "../../pages/supermaster/updateSuper/UpdateSuper";
import AccountOperations from "../../pages/supermaster/accountOperations/AccountOperations";
import LoginReport from "../../pages/LoginReport/LoginReport";
import NewCreateUser from "../../pages/newCreateUser/NewCreateUser";
import SuperAgentLimitDetails from "../../pages/supermaster/SuperAgentLimitDetails/SuperAgentLimitDetails";
import SuperAgentLedger from "../../pages/ladgerdetail/SuperAgentLedger/SuperAgentLedger";
import MyLedger from "../../pages/ladgerdetail/MyLedger/MyLedger";
import MatchLedger from "../../pages/ladgerdetail/MatchLedger/MatchLedger";
import AgentTransactions from "../../pages/CashTransanction/AgentTransactions/AgentTransactions";
import Rulespage from "../../pages/RulesPage/Rulespage";
import DeletedLenden from "../../pages/CashTransanction/DeletedLenden/DeletedLenden";
import EventProfitLoss from "../../pages/sportsdetails/livereport/EventProfitLoss/EventProfitLoss";
import Settings from "../../pages/Settings/Settings";
import AccountStatement from "../../pages/Settings/AccountStatement/AccountStatement";
import CasinoProfitAndLoss from "../../pages/Settings/CasinoProfitAndLoss/CasinoProfitAndLoss";
import MatchSessionBet from "../../pages/sportsdetails/MatchSessionBet/MatchSessionBet";
import ClientReport from "../../pages/sportsdetails/ClientReport/ClientReport";
import FinishedGame from "../../pages/FinishedGame/FinishedGame";
import CompanyReport from "../../pages/sportsdetails/CompanyReport/CompanyReport";
import SecureCode from "../../pages/LoginReport/SecureCode";
import UserSearch from "../../pages/Settings/UserSearch/UserSearch";
import CommissionLenDen from "../../pages/CommissionLenDen/CommissionLenDen";
import MatchLedgerCasino from "../../pages/MatchLedgerCasino/MatchLedgerCasino";
import CasinoPandLDetail from "../../pages/CasinoPandLDetail/CasinoPandLDetail";
import AndarBaharPlusMinus from "../../pages/AndarBaharDetail/AndarBaharPlusMinus/AndarBaharPlusMinus";
import RoulettePlusMinus from "../../pages/RouletteDetail/RoulettePlusMinus/RoulettePlusMinus";
import GameDeatis from "../../pages/GameDeatis/GameDeatis";
import CasinoMainPage from "../../pages/Casino/CasinoMainPage";
import FancyBets from "../../pages/sportsdetails/fancyslips/FancyBets";
import EventProfitLossList from "../../pages/GameDeatis/EventProfitLoss";
import DisplayGames from "../../pages/MatchLedgerCasino/DisplayGames";
import AllBets from "../../pages/MatchLedgerCasino/AllBets";
import CasinoPLMinus from "../../pages/RouletteDetail/RoulettePlusMinus/CasinoPLMinus";
import DeleteBet from "../../pages/DeleteBet/DeleteBet";
import CasinoProfitAndLossDetails from "../../pages/Settings/CasinoProfitAndLoss/CasinoProfitAndLossDetails";
import CreateLedger from "../../pages/PostLedgerSection/CreateLedger";
import CreateDomain from "../../pages/CreateDomain/CreateDomain";
import EventControllor from "../../pages/EventControllor/EventControllor";
import CompletedActive from "../../pages/EventControllor/CompletedActive";
import DeletedBets from "../../pages/EventControllor/DeletedBets";
import DeleteSessionBets from "../../pages/EventControllor/DeleteSessionBets";
import DeleteMatchBets from "../../pages/EventControllor/DeleteMatchBets";
import SetMessage from "../../pages/SetMessage/SetMessage";
import InplayMatka from "../../pages/Matka/InplayMatka";
import CompletedMatka from "../../pages/Matka/CompletedMatka";
import InplayMatkaDetail from "../../pages/Matka/InplayMatkaDetail";
import AllBetsMatka from "../../pages/Matka/AllBetsMatka";
import SetMatkaResult from "../../pages/Matka/SetMatkaResult";

const Main = () => {
  let appUrl = window.location.hostname.split(".");
  appUrl.shift();
  appUrl = appUrl.join(".");

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/login" element={<LoginDirect />} />
      <Route path="" element={<LayOut />}>
        {/* working path */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/user-list/:Listname/:userTyep/:parentId?"
          element={<ListSuper forDeadClient={false} />}
        />
        <Route
          path="/dead-user-list/:Listname/:userTyep/:parentId?"
          element={<ListSuper forDeadClient={true} />}
        />
        <Route path="/Events/sports-details" element={<SportsDetails />} />
        <Route path="/create-domain" element={<CreateDomain />} />
        <Route path="/finish-game" element={<FinishedGame />} />
        <Route path="/matka/inplay" element={<InplayMatka />} />
        <Route
          path="/matka/inplay/:eventId/:name"
          element={<InplayMatkaDetail />}
        />
        <Route path="/matka/completed" element={<CompletedMatka />} />
        <Route path="/matka/all-bets/:eventId" element={<AllBetsMatka />} />
        <Route path="/matka/set-result" element={<SetMatkaResult />} />
        <Route
          path="/client/update-client/:id/:userId?"
          element={<UpdateSuper />}
        />
        <Route path="/account-statement/:id?" element={<AccountStatement />} />
        <Route path="/account-operation/:id?" element={<AccountOperations />} />
        <Route path="/client/login-report/:id" element={<LoginReport />} />
        <Route path="/Events/:id/:id1/live-report" element={<GameDeatis />} />
        <Route
          path="/plus-minus-report/:id/:inplay?"
          element={<PlusMinusReport />}
        />
        <Route
          path="/Events/:id/plus-minus-report"
          element={<PlusMinusDetails />}
        />
        <Route path="/matchplusminus/:id?/:name?" element={<CompanyReport />} />
        <Route
          path="/match-slips/:id/:inplay?"
          element={<FancySlips type={2} name={"Match Bets"} />}
        />
        <Route path="/fancy-slips/:id/:inplay?" element={<FancyBets />} />
        <Route
          path="/matchsessionbet/:id/:inplay?"
          element={<MatchSessionBet />}
        />
        <Route
          path="/completed-fancy-slips/:id"
          element={<CompletedFancySlips />}
        />
        <Route path="/agent-list/:id/:name?" element={<ClientReport />} />
        <Route
          path="/rejectedBetsByEvent/:id/:name?"
          element={<RejectedBetsByEvent />}
        />
        <Route path="/delete-bet" element={<DeleteBet />} />
        <Route path="/inplay-casino" element={<MatchLedgerCasino />} />
        <Route path="/casino/:id?" element={<CasinoMainPage />} />
        <Route
          path="/display-games/:id/:name/:date?"
          element={<DisplayGames />}
        />
        <Route path="/all-bets/:id" element={<AllBets />} />
        <Route
          path="/plusminuscasinodeatils/:date"
          element={<CasinoPLMinus />}
        />
        <Route
          path="/casino/:id/plus-minus-type"
          element={<RoulettePlusMinus />}
        />
        <Route
          path="/Casino/AndarBahar/plus-minus-type/:date/:id"
          element={<AndarBaharPlusMinus />}
        />
        <Route path="/casinoprofitandloss" element={<CasinoProfitAndLoss />} />
        <Route
          path="/casinoprofitandloss/:id"
          element={<CasinoProfitAndLossDetails />}
        />
        <Route path="/Events/matchledger" element={<MatchLedger />} />
        <Route path="/client/my-ledger" element={<MyLedger />} />
        <Route
          path="/client/ledger-super/:id?/:name?/:userId?"
          element={<SuperAgentLedger />}
        />
        <Route
          path="/create-ledger"
          element={<CreateLedger forPostLedger={true} />}
        />
        <Route
          path="/rollback"
          element={<CreateLedger forPostLedger={false} />}
        />
        <Route path="/event-lock" element={<EventControllor />} />
        <Route path="/completd-actibe-bet" element={<CompletedActive />} />
        <Route path="/delete-bets" element={<DeletedBets />} />
        <Route path="/delete-match/:id?" element={<DeleteMatchBets />} />
        <Route path="/delete-session/:id?" element={<DeleteSessionBets />} />
        <Route path="/Events/ladger-details" element={<LadgerDetails />} />
        <Route path="/set-message" element={<SetMessage />} />
        <Route
          path="/client/txn-super/:name/:id/:userId?"
          element={<AgentTransactions />}
        />
        <Route path="/commissionLenden" element={<CommissionLenDen />} />
        <Route path="/client/login-report" element={<LoginReport />} />
        <Route path="/client/secure-code" element={<SecureCode />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/searchUser" element={<UserSearch />} />
        <Route
          path="/event-profit-loss/:id/:fancyId"
          element={<EventProfitLossList />}
        />
        <Route
          path="/client/limitplusminus-super/:id"
          element={<SuperAgentLimitDetails />}
        />
        <Route path="/completed-casino" element={<CasinoPandLDetail />} />
        <Route path="/client/create-super/:id?" element={<NewCreateUser />} />
        <Route path="/rules" element={<Rulespage />} />
        <Route
          path="/client/update-dealer/:id"
          element={<UpdateSuper updateName={"Agent"} />}
        />
        <Route
          path="/Events/:id/pl/live-report"
          element={<EventProfitLoss />}
        />
        <Route path="/client/deletedlenden/:id" element={<DeletedLenden />} />
      </Route>
    </Routes>
  );
};

export default Main;
