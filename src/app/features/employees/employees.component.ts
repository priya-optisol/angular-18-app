import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from './data-access/employee.service';
import { User, UserResponse } from './data-access/employee-model';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeCardComponent, ScrollingModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employee = inject(EmployeeService);
  employees: User[]=[];
  limit = 10;
  skip = 0;
  total: number = 0;
  loading = false;

  ngOnInit(): void {
    this.getUsers();
  }
  loadNextBatch() {
    if (this.loading || (this.employees.length > 0 && this.employees.length >= this.total))
      return;
    this.getUsers();

  }
  getUsers() {
    this.loading = true;
    this.employee.getUsers(this.limit, this.skip).subscribe({
      next: (res: UserResponse) => {
        if (res?.users && res.users.length > 0) {
        // This spreads empty arrays or updates page 1 + page 2 identically without separate "if" statements!
        this.employees = [...this.employees, ...res.users];
        
        this.total = res?.total ?? 0;
        this.skip += this.limit; // Safe sequential tracking step calculation
      }
        this.loading = false;
      }, error: (err) => {
        console.log("err", err)
      }
    })
  }
  onScrollIndexChange(index: number): void {

    // If the viewport index is nearing the end of our current array, pull down the next page
    if (index >= this.employees.length - 10) {
      this.loadNextBatch();
    }
  }
  onEmployeeRemoved(eve: Event) {

  }
  onEmployeeSelected(eve: Event) {

  }
}
