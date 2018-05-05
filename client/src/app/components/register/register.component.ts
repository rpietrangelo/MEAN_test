import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
   }

   createForm() {
    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],
      // Username Input
      username: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateUsername // Custom validation
      ])],
      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
  }


  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)){
      return null;
    } else { 
      return { 'validateEmail': true }
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      if(regExp.test(controls.value)){
        return null;
    } else { 
      return { 'validateUsername': true }
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
      if(regExp.test(controls.value)){
        return null;
    } else { 
      return { 'validatePassword': true }
    }
  }

  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  onRegisterSubmit(){
    console.log(this.form);
  }

  ngOnInit() {
  }

}
