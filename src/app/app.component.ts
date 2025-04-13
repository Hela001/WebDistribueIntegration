import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { GestionDialogComponent } from './gestion-dialog/gestion-dialog.component';
import { EquipeDialogComponent } from './equipe-dialog/equipe-dialog.component';
import { MatMenuPanel } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { BackendService } from './backend.service';  // Import the service
import { Equipe } from './models/equipe';
import { EquipeService } from './equipe.service';  // Import the service
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
updateEquipe() {
throw new Error('Method not implemented.');
}
cancelEdit() {
throw new Error('Method not implemented.');
}


  data: any;
editMode: any;
  constructor(private dialog: MatDialog,private toastr: ToastrService,private backendService: BackendService,private equipeService: EquipeService) {}

  ngOnInit(): void {
    // Call the backend to get data
    this.loadEquipes(); 
    this.backendService.getData().subscribe(response => {
      this.data = response;
      console.log(this.data);
      
    });
  }
  selectedEquipe: any = null;

// Fetch all equipes from the service
 // Fetch all equipes from the service
 loadEquipes(): void {
  this.equipeService.getAllEquipes().subscribe(
    (data) => {
      console.log('Equipes data:', data);
      this.equipes = data;
    },
    (error) => {
      this.errorMessage = 'Erreur lors du chargement des équipes. Veuillez réessayer plus tard.';  // More descriptive error message
      console.error('Error fetching equipes:', error);
      this.toastr.error('Erreur lors du chargement des équipes', 'Erreur');  // Notify user about the error
    }
  );
}

goToHome() {
throw new Error('Method not implemented.');
}
goToEquipe() {
throw new Error('Method not implemented.');
}
goToProfile() {
throw new Error('Method not implemented.');
}
goToSettings() {
throw new Error('Method not implemented.');
}

navigateToChat() {
throw new Error('Method not implemented.');
}
  title = 'My Home';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  equipes: Equipe[] = [];  // Array to store equipes
  errorMessage: string = ''; // Store any error messages
equipeMenu: MatMenuPanel<any> | null | undefined;



  showEquipeDetails(equipe: any) {
    this.selectedEquipe = equipe;
  }
  navigateToEquipe() {
    console.log('Navigating to Equipe...');
  }

  openAddEquipeDialog(): void {
    const dialogRef = this.dialog.open(EquipeDialogComponent, {
      width: '800px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // ✅ The dialog already called backendService.createEquipe and returned the created object
        this.equipes.push(result); // Just add it to the list
        this.toastr.success('Nouvelle équipe ajoutée avec succès !', 'Succès');
        console.log('New equipe added:', result);
      }
    });
      }
    

  editEquipe(equipe: Equipe): void {
    console.log('Editing equipe:', equipe); // Check if equipe.id is defined
  
    if (!equipe.id) {
      this.toastr.error('Équipe ID manquant !');
      return;
    }
  
    // Fetch the latest equipe data from the backend
    this.equipeService.getEquipeById(equipe.id).subscribe(latestEquipe => {
      // Open the dialog and pass the latestEquipe data to the dialog
      const dialogRef = this.dialog.open(EquipeDialogComponent, {
        width: '800px',
        data: latestEquipe  // Pass the fetched data here
      });
  
      dialogRef.afterClosed().subscribe(updatedEquipe => {
        if (updatedEquipe) {
          // Update the equipe in the UI with the updated data
          Object.assign(equipe, updatedEquipe);  // Update the existing equipe object in the list
          this.toastr.success('Équipe mise à jour avec succès !', 'Succès');
        }
      });
    }, error => {
      this.toastr.error("Impossible de charger les informations de l'équipe.", 'Erreur');
    });
  }

  deleteEquipe(equipe: Equipe): void {
    this.equipes = this.equipes.filter(e => e !== equipe);
    this.toastr.success('Équipe supprimée avec succès !', 'Succès');
  }
  openChatDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Chat dialog was closed');
    });
  }
}