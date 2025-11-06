import { Component } from '@angular/core';
import { RiskService } from '../../services/risk.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'risk-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <form (ngSubmit)="submit()" #f="ngForm" style="display:grid;gap:8px;grid-template-columns:1fr 1fr;max-width:900px">
    <label>User ID <input name="user_id" [(ngModel)]="model.user_id" required></label>
    <label>IP <input name="ip" [(ngModel)]="model.ip" placeholder="203.0.113.10" required></label>
    <label>User Agent <input name="user_agent" [(ngModel)]="model.user_agent" placeholder="Chrome..."></label>
    <label>Failed Attempts (24h) <input type="number" name="fails" [(ngModel)]="model.failed_attempts_last_24h"></label>
    <label>Geo Distance (km) <input type="number" name="geo" [(ngModel)]="model.geo_distance_km"></label>
    <button type="submit" style="grid-column:1 / -1; padding:8px 12px">Score Risk</button>
  </form>
  <p *ngIf="score !== null" style="margin-top:10px">
    <strong>Risk Score:</strong> {{ score | number:'1.2-2' }}
  </p>`
})
export class RiskFormComponent {
  model = { user_id: 'alice', ip: '198.51.100.22', user_agent: 'Chrome/124', failed_attempts_last_24h: 0, geo_distance_km: 0 };
  score: number | null = null;
  constructor(private risk: RiskService) {}
  async submit() { const res:any = await this.risk.score(this.model); this.score = res?.risk_score ?? null; }
}
