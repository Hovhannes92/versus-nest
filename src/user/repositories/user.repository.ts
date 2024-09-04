import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Find a user by their email.
   * @param email - The email of the user to find.
   * @returns The user entity or undefined if not found.
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  /**
   * Create a new user in the database.
   * @param username - The username of the new user.
   * @param email - The email of the new user.
   * @param password - The hashed password of the new user.
   * @returns The created user entity.
   */
  async createUser(username: string, email: string, password: string): Promise<User> {
    const user = this.create({ username, email, password });
    return this.save(user);
  }

  /**
   * Check if a user with a given email exists.
   * @param email - The email of the user to check.
   * @returns True if the user exists, false otherwise.
   */
  async isUserExists(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return !!user;
  }
}
