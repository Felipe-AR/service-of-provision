import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_PROTOCOL: string = 'http'
  private readonly API_DOMAIN: string = 'localhost';
  private readonly API_PORT: number = 3000;
  private readonly API_URL: string = `${this.API_PROTOCOL}://${this.API_DOMAIN}:${this.API_PORT}`;

  public getURLServer(): string {
    return this.API_URL;
  }
}
