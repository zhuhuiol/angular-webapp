import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { RestClientService } from '../../service/rest-client.service';
import { KeyEncryptUtils } from '../../utils/key-encrypt-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private restClient: RestClientService,
    private router: Router
  
  ) {}

  submitForm(): void {
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
    let username = this.validateForm.controls.userName.value;
    let password = this.validateForm.controls.password.value;
    if (this.validateForm.controls.userName.invalid || this.validateForm.controls.password.invalid) {
      this.message.create("error", "请输入用户名密码");
      return;
    }
    //加密密码
    let enpwd = {password: password};
     this.restClient.post("/api/pwdEncrypt", enpwd).then(result =>{
      console.log("pwdEncrypt:", result);
      if (result.code == 1) {
        password = result.password;
        const opts = {
          zhun: username,
          zhpw: password,
          'remember-me': false,
          responseType: 'json',
          code: null
        };
        const params = opts;
        this.restClient.submitFormData("/login", params).then(result => {
          let data = JSON.parse(result);
          if (data.code == 1) {
            this.router.navigateByUrl("/");
          } else {
            this.message.create("error", data.message);
          }
        });
      } else {
        this.message.create("error", result.msg);
      }
    });
    

  }

  getEncodingPassword(password) {

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
