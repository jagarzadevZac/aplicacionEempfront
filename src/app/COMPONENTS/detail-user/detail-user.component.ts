import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ConsumoService,userInterface } from 'src/app/SERVICE/consumo.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  userData : userInterface={
    brm: "",
    puesto: "",
    id: 0,
    nombre: "",
    foto: ""
  }


  dataUser :userInterface= {
    brm: "",
    puesto: "",
    id: 0,
    nombre: "",
    foto: ""
  }
  

  constructor(private consumoApi:ConsumoService,private router : Router , private activateRouter: ActivatedRoute) { }
  idUser:number = 0;
  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser(){
    const id = this.activateRouter.snapshot.params["id"];
    this.idUser = id;
    console.log(id);
    this.consumoApi.getDetailById(id).subscribe(
      res=>{
       
        this.userData=res;
     /*    this.userData.brm=this.dataUser.brm;
        this.userData.id=this.dataUser.id;
        this.userData.foto=this.dataUser.puesto;
        this.userData.puesto=this.dataUser.foto;
        this.userData.nombre=this.dataUser.nombre; */
      
      },
      err=>console.log("error->",err)
    )
  }

  actualizar(){
    this.consumoApi.udpateUser(this.idUser,this.userData).subscribe(
      res=>{
        this.userData={
          brm:"",
          foto:"",
          nombre:"",
          puesto:""
        }
        setTimeout(() => {
          this.router.navigate(["empleado"]);
        }, 1000);
      
      },
      err=>console.log("error->",err)
    )
  }

  cargandoImagen(event:any){
    this.userData.foto=event.target.files[0].name;
	}

  cancelar(){
    setTimeout(() => {
      this.router.navigate(["empleado"]);
    }, 1000);
  }

}
