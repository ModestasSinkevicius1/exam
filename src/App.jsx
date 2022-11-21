import './Styles/Base/App.css';
import DataContext from './Context/DataContext.jsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Home from './Components/client/Home.jsx';
import Fund from './Components/admin/Fund';
import { LoginPage, LogoutPage, RequireAuth } from './Components/Auth/Auth';
import Footer from './Components/Footer';
import CreateFund from './Components/client/CreateFund';
import { useEffect } from 'react';
import axios from 'axios';
import { authConfig } from './Functions/auth';

// const reList = data => {
//   const d = new Map();
//   data.forEach(line => {
//       if (d.has(line.title)) {
//           d.set(line.title, [...d.get(line.title), line]);
//       } else {
//           d.set(line.title, [line]);
//       }
//   });
//   return [...d].map((d1, i) => ([...d1, {show: true}]));
//   //or
//   return [...d];
// }

function App() {

  const [refresh, setRefresh] = useState(Date.now());
  const [refreshStatus, setRefreshStatus] = useState(Date.now());

  const [status, setStatus] = useState(1);

  const [saveFund, setSaveFund] = useState(null);
  const [updateFund, setUpdateFund] = useState(null);
  const [deleteFund, setDeleteFund] = useState(null);

  const [saveRaise, setSaveRaise] = useState(null);

  const [funds, setFunds] = useState(null);
  const [raisers, setRaisers] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [modalDelete, setModalDelete] = useState(null);

//GET
  useEffect(()=>{
    if(status === 1){
        return;
    }
    axios.get('http://localhost:3007/funds', authConfig())
    .then(res => {
      setFunds(res.data.map((d, i) => ({...d, show: true, row: i})))
    })
    .catch(_ => setFunds('error'));
  }, [refresh, status]);

  //GET RAISERS
  useEffect(()=>{
    if(status === 1){
        return;
    }
    axios.get('http://localhost:3007/raisers', authConfig())
    .then(res => {
      setRaisers(res.data.map((d, i) => ({...d, show: true, row: i})))
    })
    .catch(_ => setRaisers('error'));
  }, [refresh, status]);

//CREATE
useEffect(()=>{
  if(saveFund === null){
    return;
  }
  axios.post('http://localhost:3007/funds', saveFund, authConfig())
  .then(res => setRefresh(Date.now()));
}, [saveFund]);

//CREATE RAISE
useEffect(()=>{
  if(saveRaise === null){
    return;
  }
  axios.post('http://localhost:3007/raisers', saveRaise, authConfig())
  .then(res => setRefresh(Date.now()));
}, [saveRaise]);

//UPDATE
useEffect(()=>{
  if(updateFund === null){
    return;
  }
  axios.put('http://localhost:3007/funds/' + updateFund.id, updateFund, authConfig())
  .then(res => setRefresh(Date.now()));
}, [updateFund]);

//DELETE
useEffect(() => {
  if (null === deleteFund) {
      return;
  }
  axios.delete('http://localhost:3007/funds/'+ deleteFund.id, authConfig())
  .then(res => setRefresh(Date.now()));
}, [deleteFund]);

  return (
    <BrowserRouter>
    <DataContext.Provider value={{
      refreshStatus,
      status,
      setStatus,
      setRefresh,
      refresh,
      setSaveFund,
      setUpdateFund,
      setDeleteFund,
      funds,
      raisers,
      setModalDelete,
      modalDelete,
      setSaveRaise,
      setCurrentPage,
      currentPage,
    }}>
      <div className="App">
        <header className="App-header">
          {/* <ShowNav /> */}
          <Routes>
            <Route path='/' element={<LoginPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/login' element={<LoginPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/logout' element={<LogoutPage setRefreshStatus={setRefreshStatus} />}> </Route>
            <Route path='/home' element={<RequireAuth role='user'><Home /></RequireAuth>}></Route>
            <Route path='/home/create' element={<RequireAuth role='user'><CreateFund /></RequireAuth>}></Route>
            <Route path='/admin/funds' element={<RequireAuth role='admin'><Fund /></RequireAuth>}></Route>
          </Routes>
          <Footer />
        </header>
      </div>
    </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
