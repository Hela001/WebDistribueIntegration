import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { Projet, Status } from '../models/Projet';
import { Page } from '../models/page.model';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {
  projets: Projet[] = [];
  loading: boolean = false;
  error: string | null = null;
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;
  selectedStatus: Status | null = null;  // Modifiez le type pour accepter null
  statusList: (Status | null)[] = [null, Status.DOING, Status.DONE, Status.TODO, Status.SUSPENDED];
  showWeather: boolean = false;
  weatherForecast: any = null;
  // Define weatherIconUrl property
  weatherIconUrl: string = '';
  isLoading: boolean = false; // Loading state
  nomRecherche: string = '';

  constructor(private projetService: ProjetService) { }

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.loading = true;
    this.projetService.getAllProjets(this.page, this.size).subscribe(
      (data: Page<Projet>) => {
        this.projets = data.content;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
    
    );
  }
  

  deleteProjet(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(
        () => {
          // Met à jour la liste localement
          this.projets = this.projets.filter(projet => projet.idProjet !== id);
  
          // Optionnel : si la liste devient vide sur cette page, revenir à la page précédente
          if (this.projets.length === 0 && this.page > 0) {
            this.page--;
            this.loadProjets(); // recharge la page précédente
          }
        },
        (error) => {
          this.error = 'Erreur lors de la suppression du projet';
          console.error(error);
        }
      );
    }
  }
  
  

  changePage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadProjets();
    }
  }

  onStatusChange(status: Status | null): void {
    if (status === null) {
      // Si aucun statut n'est sélectionné, charger tous les projets
      this.loadProjets();
    } else {
      // Si un statut est sélectionné, filtrer les projets
      this.projetService.getProjetsByStatus(status, this.page, this.size).subscribe(
        (data: Page<Projet>) => {
          this.projets = data.content;
          this.totalPages = data.totalPages;
        },
        (error) => {
          this.error = 'Erreur lors de la récupération des projets par statut';
          console.error(error);
        }
      );
    }
  }
  getWeatherForProjet(projetId: number): void {
    this.isLoading = true;
    this.projetService.getProjectWeather(projetId).subscribe({
      next: (weatherData: any) => {
        console.log('Weather Data:', weatherData);
  
        if (weatherData && weatherData.list && weatherData.list.length > 0) {
          const firstForecast = weatherData.list[0];
          this.weatherForecast = {
            condition: firstForecast.weather[0].description,
            temperature: firstForecast.main.temp,
            humidity: firstForecast.main.humidity,
            windSpeed: firstForecast.wind.speed
          };
  
          this.weatherIconUrl = this.getWeatherIconUrl(firstForecast.weather[0].icon);
        } else {
          console.error('❌ Aucune donnée météo disponible.');
          this.weatherForecast = null;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur météo: ", err);
        this.weatherForecast = null;
        this.isLoading = false;
      }
    });
  }
  getWeatherIconUrl(iconId: string): string {
    const iconMapping: { [key: string]: string } = {
      '01d': 'fas fa-sun', // Clear sky day
      '01n': 'fas fa-moon', // Clear sky night
      '02d': 'fas fa-cloud-sun', // Few clouds day
      '02n': 'fas fa-cloud-moon', // Few clouds night
      '03d': 'fas fa-cloud', // Scattered clouds
      '03n': 'fas fa-cloud', // Scattered clouds
      '04d': 'fas fa-cloud-meatball', // Broken clouds
      '04n': 'fas fa-cloud-meatball', // Broken clouds
      '09d': 'fas fa-cloud-showers-heavy', // Showers day
      '09n': 'fas fa-cloud-showers-heavy', // Showers night
      '10d': 'fas fa-cloud-rain', // Rain day
      '10n': 'fas fa-cloud-rain', // Rain night
      '11d': 'fas fa-bolt', // Thunderstorm day
      '11n': 'fas fa-bolt', // Thunderstorm night
      '13d': 'fas fa-snowflake', // Snow day
      '13n': 'fas fa-snowflake', // Snow night
      '50d': 'fas fa-smog', // Mist day
      '50n': 'fas fa-smog' // Mist night
    };
    return iconMapping[iconId] || 'fas fa-sun'; // Default to sunny icon if unknown
  }

  onProjectSelect(projetId: number): void {
    this.showWeather = true; 

    this.getWeatherForProjet(projetId);
  }

}
