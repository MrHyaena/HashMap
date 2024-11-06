import "./styles.css";

function control(index) {
  if (index < 0 || index > hmap.buckets.length) {
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
  let oldarray = hmap.buckets;
  if (hmap.ratio >= hmap.loadfactor) {
    hmap.buckets = [];
    addBuckets(hmap.counter + 16);
    console.log(oldarray);
    oldarray.map((item) => {
      if (item !== "") {
        let first = "";
        let second = "";

        if (item.length == 1) {
          first = item[0].key;
          second = item[0].value;
          set(first, second);
        } else {
          item.map((inneritem) => {
            first = inneritem.key;
            second = inneritem.value;
            set(first, second);
          });
        }
      }
    });
  }
}

function addMoreBuckets() {
  counterFull();
  countratio();
  morebuckets();
}

// Function for inserting buckets into array

function addBuckets(count) {
  let bucketCount = count;
  hmap.counter = 0;
  for (let i = 0; i < bucketCount; i++) {
    hmap.buckets.push("");
  }
  hmap.counter = hmap.counter + bucketCount;
}

// Basic set function

function set(key, value) {
  let index = hash(key);
  addMoreBuckets();
  control(index);

  if (hmap.buckets[index] == "") {
    hmap.buckets[index] = [{ key: key, value: value }];
  } else {
    let bucketarray = [];
    hmap.buckets[index].map((item) => {
      bucketarray.push(item.key);
    });

    if (bucketarray.includes(key)) {
    } else {
      let itemarray = hmap.buckets[index];
      itemarray.push({ key: key, value: value });
      console.log(itemarray);
    }
  }
  console.log(hmap.counter);
}

// HASH function

function hash(key) {
  let hashCode = 0;
  console.log(key.length);
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % hmap.counter;
  }
  console.log("hash " + hashCode);
  console.log(hmap);
  return hashCode;
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
set("hat", "white");

newset();

function newset() {
  set("jacket", "blue");
  set("kite", "pink");
  set("lion", "golden");
  set("dumbass", "purple");
  set("meteor", "black");
  set("stalagnite", "white");
  set("pumpkin", "blue");
  set("fight", "pink");
  set("cat", "golden");
}

console.log(hmap);
