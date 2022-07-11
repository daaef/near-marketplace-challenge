import React, {useCallback, useEffect, useState} from "react";
import {Container, Nav} from "react-bootstrap";
import {accountBalance, login, logout as destroy, walletConnection} from "./utils/near";
import Wallet from "./components/Wallet";
import {Notification} from "./components/utils/Notifications";
import Products from "./components/marketplace/Products";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/img/sandwich.jpg";
import "./App.css";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Generator from "./components/marketplace/Generator";

const App = function AppWrapper() {
    const account = walletConnection.account();
    const [balance, setBalance] = useState("0");
    const getBalance = useCallback(async () => {
        if (account.accountId) {
            setBalance(await accountBalance());
        }
    }, [account.accountId]);

    useEffect(() => {
        getBalance();
    }, [getBalance]);
    return (
        <BrowserRouter>
            <Notification/>
            {account.accountId ? (
                <Container fluid="md">
                    <Nav className="justify-content-between pt-3 pb-5">
                        <Nav.Item>
                            <Link className="text-decoration-none text-black fw-bold" to="/">Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Wallet
                                address={account.accountId}
                                amount={balance}
                                symbol="NEAR"
                                destroy={destroy}
                            />
                        </Nav.Item>
                    </Nav>
                    <main>
                        <Routes>
                            <Route index element={<Products/>}/>
                            <Route path="/near-marketplace-challenge" element={<Products/>}/>
                            <Route path="/generator" element={<Generator/>}/>
                        </Routes>
                    </main>
                </Container>
            ) : (
                <Cover name="Street Food" login={login} coverImg={coverImg}/>
            )}
        </BrowserRouter>
    );
};

export default App;