import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RiskService {
  baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  async score(payload: any) {
    return firstValueFrom(this.http.post(`${this.baseUrl}/score`, payload));
  }
  async health() {
    return firstValueFrom(this.http.get(`${this.baseUrl}/health`));
  }
}
