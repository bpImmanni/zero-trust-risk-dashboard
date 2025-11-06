import { Component } from '@angular/core';
import { RiskFormComponent } from './components/risk-form/risk-form.component';
import { EventLogComponent } from './components/event-log/event-log.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  
  imports: [RiskFormComponent, EventLogComponent]
})
export class AppComponent {
  title = 'Zero-Trust Dashboard';
}
