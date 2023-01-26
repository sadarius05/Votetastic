import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { Voting } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-votings-details',
  templateUrl: './votings-details.component.html',
  styleUrls: ['./votings-details.component.scss'],
})
export class VotingsDetailsComponent implements OnInit {
  voting: Voting = null!;
  form!: FormGroup;
  formOptions!: FormGroup;

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

    this.formOptions = this.fb.group({
      options: this.fb.array([]),
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.voting = await (await this.dataService.getVotingDetails(+id)).data;

      const options = await (await this.dataService.getVotingOptions(+id)).data;
      console.log('options :', options);

      options?.map((item) => {
        const option = this.fb.group({
          title: [item.title, Validators.required],
          id: item.id,
        });
        this.options.push(option);
      });

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

  get options(): FormArray {
    return this.formOptions.controls['options'] as FormArray;
  }

  addOption() {
    const option = this.fb.group({
      title: ['', Validators.required],
      id: null,
      voting_id: this.voting.id,
    });
    this.options.push(option);
  }

  async deleteOption(index: number) {
    const control = this.options.at(index);

    const id = control.value.id;
    await this.dataService.deleteVotingOption(id);
    this.options.removeAt(index);
  }

  saveOptions() {
    console.log('SAVE:', this.formOptions.value);
    const obs = [];
    for (let entry of this.formOptions.value.options) {
      if (!entry.id) {
        console.log('ADD THIS: ', entry);
        const newObs = this.dataService.addVotingOption(entry);
        obs.push(newObs);
      } else {
      }
    }
    zip(obs).subscribe((res) => {
      console.log('AFTER ADD: ', res);
      this.toaster.success('Voting updated !');
    });
  }
}
