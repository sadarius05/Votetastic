import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Voting, VotingOption } from '../interfaces';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss'],
})
export class VotingComponent implements OnInit {
  voting: Voting = null!;
  options: VotingOption[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.voting = await (await this.dataService.getVotingDetails(+id)).data;
      this.options =
        (await (await this.dataService.getVotingOptions(+id)).data) || [];
      console.log('VOTINGS :', this.voting);
      console.log('OPTIONS :', this.options);
    }
  }

  vote(option: VotingOption) {
    console.log('VOTE:', option);
  }
}
