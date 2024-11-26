import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PasswordHasher } from 'src/auth/domain/domain-services/password-hasher.service';

@Injectable()
export class BcryptAdapter implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compareSync(plain, hashed);
  }
}
