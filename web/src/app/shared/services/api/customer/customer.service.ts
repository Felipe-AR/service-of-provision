import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private apiService: ApiService,
    private httpClient: HttpClient
  ) { }
}
