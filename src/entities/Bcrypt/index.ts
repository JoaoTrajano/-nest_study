import { compare, genSalt, hash } from 'bcrypt';

export class Bycrypt {
  private salt: string;

  constructor() {
    this.setSalt();
  }

  async setSalt() {
    this.salt = await genSalt();
  }

  async create(password: string): Promise<string | boolean> {
    try {
      if (!password) return false;
      return await hash(password, this.salt);
    } catch (error) {
      return false;
    }
  }

  async verify(password: string, encryptedPassword: string): Promise<boolean> {
    try {
      if (!password || !encryptedPassword) return false;
      return compare(password, encryptedPassword);
    } catch (error) {
      return false;
    }
  }
}
