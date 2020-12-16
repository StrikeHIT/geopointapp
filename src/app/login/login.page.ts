import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  usuario: string = "";
  senha: string = "";

  constructor(private router:Router, private provider:Post, public toast: ToastController){}
    ngOnInit() {
  }
  async login(){
    if(this.usuario == ""){
      const toast = await this.toast.create({
        message: 'Preencha o Usuário',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }
    if(this.usuario == ""){
      const toast = await this.toast.create({
        message: 'Preencha a Senha',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    let dados = {
      requisicao : 'login',
      usuario : this.usuario,
      senha : this.senha
    };

    this.provider.dadosApi(dados, 'apiadmin.php').subscribe(async data=>{
      var alert = data['msg'];
      if(data['success']){
        //this.storage.setItem('session_storage', data['result']);
        if(data['result']['nivel'] == 'Administrador'){
          this.router.navigate(['/home']);
        }else{
          this.router.navigate(['/user']);
        }
    
        const toast = await this.toast.create({
          message: 'Logado com Sucesso!',
          duration: 1000,
          color: 'success'
        });
        toast.present();
        this.usuario = "";
        this.senha = "";
        console.log(data);
      }else{
        const toast = await this.toast.create({
          message: alert,
          duration: 1000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
