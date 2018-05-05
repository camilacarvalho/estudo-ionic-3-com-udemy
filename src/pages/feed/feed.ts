import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//criar sessão de provider, o que faz com que o injecter seja injetado
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MovieProvider
  ]
})
export class FeedPage {
  public loader;
  public isRefreshing: boolean = false;
  public refresher;
  public objeto_feed = {
    titulo:"Carla Caroline",
    data: "Abril 22, 2018",
    descricao: "Estou dormindo muito nesse frio!.",
    qnt_likes:2,
    qnt_comments: 2,
    time_comment: "1h ago"
  }

public lista_filmes = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }
  
  abreCarregamento(){
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  fechaCarregamento(){
    this.loader.dismiss();
  }
  doRefresh(refresher) {
    this.refresher = refresher; 
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  ionViewDidEnter() { 
    this.carregarFilmes();
    }

    carregarFilmes(){
      this.abreCarregamento();
      this.movieProvider.getLatestMovies().subscribe(
        data=>{
         const objeto_retorno = (data as any);
         this.lista_filmes = objeto_retorno.results;
          console.log(this.lista_filmes);
          console.log(data);
          this.fechaCarregamento();
          if(this.isRefreshing){
            this.refresher.complete();
            this.isRefreshing = false;
          }
        }, error => {
          console.log(error);
          this.fechaCarregamento();
          if(this.isRefreshing){
            this.refresher.complete();
          }
        }
      )
    }
  }
