import { Component, Input } from '@angular/core';
import { User } from '../data-access/employee-model';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {
@Input() employee!: User
}
