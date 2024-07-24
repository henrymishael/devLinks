import Dexie, { Table } from "dexie";

// Define interfaces for the data structures
interface Bio {
  key: string;
  value: UserDetails | string;
}

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

interface Link {
  id?: number;
  name: string;
  url: string;
}

class MySubClassedDexie extends Dexie {
  bio!: Table<Bio, string>;
  links!: Table<Link, number>;

  constructor() {
    super("devLinks");
    this.version(1).stores({
      bio: "&key",
      links: "++id, name, url",
    });
  }
}

export const db = new MySubClassedDexie();
