import {Cat, CatSell, listedCats, soldCats} from "./model";
import { ContractPromiseBatch, context } from "near-sdk-as";

export function setCat(cat: Cat): void {
  let storedCat = listedCats.get(cat.dna);
  if (storedCat !== null) {
    throw new Error(`a cat with ${cat.id} already exists`);
  }
  listedCats.set(cat.id, Cat.fromPayload(cat));
}

export function getCat(id: string): Cat | null {
  return listedCats.get(id);
}

export function getCats(): Cat[] {
  return listedCats.values();
}

export function buyCat(catId: string): void {
  const cat = getCat(catId);
  if (cat == null) {
    throw new Error("cat not found");
  }
  if (cat.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the cat's price");
  }
  ContractPromiseBatch.create(cat.owner).transfer(context.attachedDeposit);
  cat.incrementSoldAmount();
  listedCats.set(cat.id, cat);

  //Used (catId + owner) as the key for PersistentUnorderedMap
  soldCats.set((cat.id + context.sender), CatSell.fromPayload(catId, true));
}

export function cloneCat(catId: string): Cat | null {
  const cat = getCat(catId);
  if (cat == null) {
    throw new Error("cat not found");
  }
  if (cat.clonePrice.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the Clone price");
  }
  ContractPromiseBatch.create(cat.owner).transfer(context.attachedDeposit);
  cat.incrementClonedAmount();
  listedCats.set(cat.id, cat);

  //Used (catId + owner) as the key for PersistentUnorderedMap
  soldCats.set((cat.id + context.sender), CatSell.fromPayload(catId, false));
  return cat;
}

export function getBuysAndClones(): Cat[] {
  const cats: Cat[] = [];
  const catSellKeys = soldCats.keys();

  for(let i=0; i<catSellKeys.length; i++){
    if(catSellKeys[i].includes(context.sender)){
      const catId = soldCats.get(catSellKeys[i])?.catId;
      if(catId) {
        const cat = listedCats.get(catId);
        if(cat){
          cats.push(cat);
        }
      }
    }
  }

  return cats;
}