import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  movies: any[] = [];
  originalMovies: any[] = [];
  searchName: string = ''; // Propiedad para el nombre de búsqueda
  baseImageUrl: string = "https://image.tmdb.org/t/p/w500";


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzJlM2ZhZjVhZjczYjIwMThkZGRkYTViMDNkZGIwMyIsInN1YiI6IjY0ZmU2MTNmYzNiZmZlMDEzYmY1YTNlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sNxJCSRcedW-kcoaWZvamOarP35KPzQ_iUdkqFNZoh8'
      }
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then((response) => response.json())
      .then((data) => {
        this.movies = data.results;
        this.originalMovies = data.results;

        this.movies.forEach((movie) => {
          movie.posterUrl = `${this.baseImageUrl}${movie.poster_path}`;
        });  

      });
    
  }

  search(): void {
    // Filtra la lista de personajes según el término de búsqueda del nombre
    this.movies = this.originalMovies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

}