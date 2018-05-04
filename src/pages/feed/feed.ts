import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

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
    private movieProvider: MovieProvider
  ) {
  }

  ionViewDidLoad() {
      this.movieProvider.getLatestMovies().subscribe(
        data=>{
        // const response = (data as any);
        // const objeto_retorno = JSON.parse(response._body);
        //  ;

         // console.log((data as any).id);
         const objeto_retorno = (data as any);
         this.lista_filmes = objeto_retorno.results;
          console.log(this.lista_filmes);
          console.log(data);
        }, error => {
          console.log(error);
        }
      ) 
    }
  }
