import { Component, OnInit } from '@angular/core';
import { ConsumoService , userInterface } from 'src/app/SERVICE/consumo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers:[ConsumoService]
})

export class EmpleadoComponent implements OnInit {
  
  list: userInterface[] = [];
  foto = [];
  userData : userInterface={
    nombre:"",
    foto:"",
    puesto:"",
    brm:""
  }

  end:number=5;
  init:number=0;
  max:number=0;
  display:String="none";
  constructor(private consumir:ConsumoService , private router:Router) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.consumir.getUsers().subscribe(
      res=>{
        this.list=<any>res;
        this.max= this.list.length;
        console.log(this.max);
        if(this.max>5){
          this.display="block";
        }else{
          this.display="none";
        }
      },
      err=>console.log("error->",err)
    )
  }

  registrarUsuario(){
    console.log("user data->",this.userData);
    console.log("file->",this.foto);
    this.consumir.addUser(this.userData).subscribe(
      res=>{
        this.userData={
          brm:"",
          foto:"",
          nombre:"",
          puesto:""
        }
        this.listarUsuarios();
      },
      err=>console.log("error->",err)
    )
  }

  editar(id:any){
    console.log("id->",id);
    this.router.navigate(["detail/"+id]);
  }

  eliminar(id:any){
    this.consumir.deleteUser(id).subscribe(
      res=>{
        this.listarUsuarios();
      },
      err=>console.log("error->",err)
    )
  }

  cargandoImagen(event:any){
    this.userData.foto=event.target.files[0].name;
	}

  clickNextPage(){
    if(this.end < this.max){
      this.init= this.init +5;
      this.end= this.end+5;
    }
  }

  clickAfterPage(){
    if(this.init > 0){
      this.init= this.init -5;
      this.end= this.end-5;
    }
  }

}
