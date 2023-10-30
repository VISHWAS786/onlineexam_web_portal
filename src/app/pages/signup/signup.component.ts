import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userservise:UserService, private _snackBar:MatSnackBar) { }

  public user ={
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  ngOnInit(): void {
  }
  formSubmit(){
   console.log(this.user);
   if(this.user.username=='' || this.user.username==null){
   // alert("user is requierd!!");
   this._snackBar.open('username is requierd!!','ok',{
    duration:3000,
    verticalPosition:'top',
    horizontalPosition:'right', 
   });
    return;
   }

   //addUser:userserver

   this.userservise.addUser(this.user).subscribe(
    (data:any)=>{
      //success
      console.log(data);
      //alert("success");
      Swal.fire('Successfully Done','user is'+ data.id,'success');
    },
    (error)=>{
      //error
     // console.log(error);
     // alert("something went wrong");
     this._snackBar.open('Something went wrong',' ',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right',
     });
    }
    
   )

   

  }

}
