import { Cat, listedCats } from "./model";
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
  return cat;
}
