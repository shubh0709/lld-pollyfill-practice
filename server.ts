// hashmap implementaion

// load factor
// collision
// default size

class HashMap<K, V> {
  private capacity: number;
  private size: number;
  private map: Array<Array<[K, V]>>;

  constructor(initialCapacity: number = 100) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.map = new Array<Array<[K, V]>>(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.map[i] = [];
    }
  }

  private _hash(key: K): number {
    if (typeof key === "string") {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % this.capacity;
    } else {
      throw new Error("Unsupported key type");
    }
  }

  private _resize() {
    const newCapacity = this.capacity * 2;
    const newMap = new Array<Array<[K, V]>>(newCapacity);

    for (let i = 0; i < newCapacity; i++) {
      newMap[i] = [];
    }

    this.map.forEach((bucket) => {
      bucket.forEach(([key, value]) => {
        const index = this._hash(key) % newCapacity;
        newMap[index].push([key, value]);
      });
    });

    this.map = newMap;
    this.capacity = newCapacity;
  }

  set(key: K, value: V): void {
    if (this.size === this.capacity) {
      this._resize();
    }

    const index = this._hash(key);
    const bucket = this.map[index];
    let keyExists = false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        keyExists = true;
        break;
      }
    }

    if (!keyExists) {
      bucket.push([key, value]);
      this.size++;
    }
  }

  get(key: K): V | undefined {
    const index = this._hash(key);
    const bucket = this.map[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return undefined;
  }

  remove(key: K): void {
    const index = this._hash(key);
    const bucket = this.map[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return;
      }
    }
  }
}

// Usage
const hashmap = new HashMap<string, string>();
hashmap.set("name", "Alice");
console.log(hashmap.get("name")); // 'Alice'
hashmap.remove("name");
console.log(hashmap.get("name")); // undefined
