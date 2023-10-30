import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    username:'',
    password:'',
  };
  constructor(private snack:MatSnackBar,private login:LoginService) { }

  ngOnInit(): void {}

  formSubmit(){
   // debugger;
      console.log("login butoon click");

      if(this.loginData.username.trim()=='' || this.loginData.username==null)
      {
        this.snack.open('Username is required !!', '',{
          duration:3000,
        });
        return;

      }

      if(this.loginData.password.trim()=='' || this.loginData.password==null)
      {
        this.snack.open('Password is required !!', '',{
          duration:3000,
        });
        return;
      }
      this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          debugger
          console.log("success");
          console.log(data);

          // login...
          this.login.loginUser(data.jwtToken);
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(user);

              //redirect to Admin: Admin-dashboard
              //redirect to User: User-dashboard
              if(this.login.getUserRole()=='ADMIN')
              {
                // admin dashboard
                window.location.href='/admin';
              }else if (this.login.getUserRole()=='NORMAL'){
                // user dashboard
                window.location.href='/user-dashboard';
              }else{
                this.login.logout();
              }
            }
          )
        },
        (error)=>{
          console.log("error!");
          console.log(error);
          this.snack.open("Invalid Details !! Try again",'',{
            duration:3000,
          });
        }
      )
  }

}
