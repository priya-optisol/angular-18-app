import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  submitting = signal(false);

  form = this.fb.nonNullable.group({
    // email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],

    password: ['', [Validators.required]],
  });


  submit() {
    if (this.form.invalid) return;
    this.submitting.set(true);
    console.log(this.form);
    console.log(this.form.getRawValue());
    const { username, password } = this.form.getRawValue();
    this.auth.login(username, password).subscribe({
      next: () => {
        this.toastr.success('Logged In!', '');
        if(this.auth.hasRole("admin"))
          this.router.navigate(['/employees'])
        else
          this.router.navigate(['/products'])

      },
      error: () =>{
        this.toastr.error('Invalid Credential!', '');
        this.submitting.set(false)
      } 
    })
  }
}
