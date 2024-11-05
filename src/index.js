import "./styles.css";

function control(index) {
  if (index < 0 || index >= hmap.buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
}

class hashMap {
  constructor() {
    this.buckets = [];
    this.counter = 0;
    this.counterfull = 0;
    this.loadfactor = 75 / 100;
    this.ratio = 0;
  }
}

// Function for inserting buckets into array

function addBuckets(count) {
  let bucketCount = count;
  for (let i = 0; i < bucketCount; i++) {
    hmap.buckets.push("");
  }
  hmap.counter = hmap.counter + bucketCount;
}

// HASH function

function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % hmap.counter;
  }
  console.log(hashCode);
  return hashCode;
}

// Functions for control and creating more buckets

function counterFull() {
  hmap.counterfull = 0;
  hmap.buckets.map((item) => {
    if (item !== "") {
      hmap.counterfull = hmap.counterfull + 1;
    }
  });
}

function countratio() {
  hmap.ratio = hmap.counterfull / hmap.counter;
}

function morebuckets() {
  if (hmap.ratio > hmap.loadfactor) {
    addBuckets(16);

    let oldarray = hmap.buckets;
    hmap.buckets.map((item) => {
      item = "";
    });

    oldarray.map((item) => {
      if (item !== "") {
        let first = item.key;
        let second = item.value;

        set(first, second);
      }
    });
  }
}

// Basic set function

function set(key, value) {
  let itemhash = hash(key);
  let index = itemhash;
  control(index);

  hmap.buckets[index] = { key: key, value: value };
  counterFull();
  countratio();
  morebuckets();
}

let hmap = new hashMap();

addBuckets(16);

set("apple", "red");
set("banana", "yellow");
set("carrot", "orange");
set("dog", "brown");
set("elephant", "gray");
set("frog", "green");
set("grape", "purple");
set("hat", "black");
set("ice cream", "white");
set("fdsafd", "blue");
set("cum", "pink");
set("ě", "green");
set("č", "purple");
set("é", "black");
set("hcream", "white");
set("2", "blue");
set("1", "pink");

console.log(hmap);
