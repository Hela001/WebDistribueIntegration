import { Component, OnInit } from '@angular/core';
import { Commande } from '../Modele/commande.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeServiceService } from '../services/commande-service.service';

@Component({
  selector: 'app-commandedetails',
  templateUrl: './commandedetails.component.html',
  styleUrls: ['./commandedetails.component.css']
})
export class CommandedetailsComponent implements OnInit {
  commande: Commande | null = null;

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.commandeService.getCommandeById(id).subscribe(data => {
      this.commande = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/commandes']);
  }
}

