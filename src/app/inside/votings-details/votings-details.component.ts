import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-votings-details',
  templateUrl: './votings-details.component.html',
  styleUrls: ['./votings-details.component.scss'],
})
export class VotingsDetailsComponent implements OnInit {
  voting: any = null;
  form!: FormGroup;
  options!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      voting_question: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      public: [false],
    });

    this.options = this.fb.group({});
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.voting = await (await this.dataService.getVotingDetails(+id)).data;
      this.form.patchValue(this.voting);
    }
  }

  async updateVoting() {
    await this.dataService.updateVotingDetails(this.form.value, this.voting.id);
    this.toaster.success('Voting Updated!');
  }
  async deleteVoting() {
    await this.dataService.deleteVoting(this.voting.id);
    this.toaster.info('Voting deleted!');
    this.router.navigateByUrl('/app');
  }

  addOption() {}

  getNewOption() {
    return this.fb.group({
      title: '',
    });
  }

  saveOptions() {}
}
