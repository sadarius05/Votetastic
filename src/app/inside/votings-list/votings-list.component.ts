import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-votings-list',
  templateUrl: './votings-list.component.html',
  styleUrls: ['./votings-list.component.scss'],
})
export class VotingsListComponent implements OnInit {
  votings: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadVotings();
  }

  async loadVotings() {
    this.votings = await this.dataService.getVotings();
    console.log(this.votings);
  }

  async startVoting() {
    await this.dataService.startVoting();
  }
}
