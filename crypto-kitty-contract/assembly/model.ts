import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Cat {
  id: string;
  name: string;
  dna: string;
  price: u128;
  clonePrice: u128;
  owner: string;
  sold: u32;
  cloned: u32;
  public static fromPayload(payload: Cat): Cat {
    const cat = new Cat();
    cat.id = payload.id;
    cat.name = payload.name;
    cat.dna = payload.dna;
    cat.price = payload.price;
    cat.clonePrice = payload.clonePrice;
    cat.owner = context.sender;
    return cat;
  }
  public incrementSoldAmount(): void {
    this.sold = this.sold + 1;
  }
  public incrementClonedAmount(): void {
    this.cloned = this.cloned + 1;
  }
}

export const listedCats = new PersistentUnorderedMap<string, Cat>("CAT_LIST");



@nearBindgen
export class CatSell {
  //Owner of the buy or clone
  owner: string;

  //ID of the cat, which cloned or sold
  catId: string;

  //If it is clone, isBuy is false. Otherwise, it is true
  isBuy: boolean;

  public static fromPayload(id: string, isBuy:boolean ): CatSell {
    const catSell = new CatSell();
    catSell.catId = id;
    catSell.owner = context.sender;
    catSell.isBuy = isBuy;
    return catSell;
  }
}

export const soldCats = new PersistentUnorderedMap<string, CatSell>("CAT_SELL");