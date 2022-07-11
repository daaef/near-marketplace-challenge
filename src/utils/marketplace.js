import {v4 as uuid4} from "uuid";
import {parseNearAmount} from "near-api-js/lib/utils/format";
import {contract} from "./near";

const GAS = 100000000000000;

export function createCat(cat) {
    cat.id = uuid4();
    cat.price = parseNearAmount(cat.price + "");
    console.log('creating cat', cat)
    return contract.setCat({cat});
}

export function getCats() {
    console.log('getting cats')
    return contract.getCats();
}

export async function buyCat({id, price}) {
    await contract.buyCat({catId: id}, GAS, price);
}

export async function cloneCat({id, clonePrice}) {
    await contract.cloneCat({catId: id}, GAS, clonePrice);
}