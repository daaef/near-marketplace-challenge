import environment from "./config";
import {connect, Contract, keyStores, WalletConnection} from "near-api-js";
import {formatNearAmount} from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");
export let walletConnection;
export let accountId;
export let contract;

export async function initializeContract() {
    const near = await connect(
        Object.assign(
            {deps: {keyStore: new keyStores.BrowserLocalStorageKeyStore()}},
            nearEnv
        )
    );
    await console.log('contract initialized', connect)
    walletConnection = new WalletConnection(near);
    accountId = walletConnection.getAccountId();
    contract = new Contract(
        walletConnection.account(),
        nearEnv.contractName,
        {
            viewMethods: ["getCat", "getCats"],
            changeMethods: ["buyCat", "setCat", "cloneCat"],
        }
    );
}

export async function accountBalance() {
    return formatNearAmount(
        (await walletConnection.account().getAccountBalance()).total,
        2
    );
}

export async function getAccountId() {
    return walletConnection.getAccountId();
}

export function login() {
    walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
    walletConnection.signOut();
    window.location.reload();
}