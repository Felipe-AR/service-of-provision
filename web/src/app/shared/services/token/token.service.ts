import { Injectable } from '@angular/core';

import { DecodedPayload } from './decoded-payload.model';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly key: string = 'token';

  constructor() { }

  public async get(): Promise<string | null> {
    return localStorage.getItem('token');
  }

  public async set(token: string): Promise<void> {
    localStorage.setItem(this.key, token);
  }

  public async clear(): Promise<void> {
    localStorage.removeItem('token');
  }

  public async getPayload(): Promise<DecodedPayload | null> {
    try {
      const token = await this.get() as string;
      return jwtDecode<DecodedPayload>(token);
    } catch (error: any) {
      this.clear();
      return null;
    }
  }

  public async checkTokenExpiration(): Promise<boolean> {
    const decodedToken = await this.getPayload();
    const currentDate = new Date();
    const currentTimeInSeconds = currentDate.getTime() / 1000;

    return decodedToken!.exp >= currentTimeInSeconds
  }
}
