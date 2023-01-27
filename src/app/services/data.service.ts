import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Voting } from '../interfaces';
import { VotingOption } from '../interfaces/votingOption';

export const TABLE_VOTINGS = 'votings';
export const TABLE_VOTING_OPTIONS = 'voting_options';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  startVoting() {
    const test = this.supabase
      .from(TABLE_VOTINGS)
      .insert({
        voting_question: 'My question',
        description: 'My description',
      })
      .select();
    return test;
  }

  async getVotings() {
    const votings = await this.supabase
      .from(TABLE_VOTINGS)
      .select('*')
      .eq('creator_id', (await this.supabase.auth.getUser()).data.user?.id);
    return votings.data || [];
  }

  async getVotingDetails(id: number) {
    return this.supabase.from(TABLE_VOTINGS).select('*').eq('id', id).single();
  }

  async updateVotingDetails(voting: Voting, id: number) {
    return this.supabase
      .from(TABLE_VOTINGS)
      .update(voting)
      .eq('id', id)
      .single();
  }
  async deleteVoting(id: number) {
    return this.supabase.from(TABLE_VOTINGS).delete().eq('id', id).single();
  }

  async getVotingOptions(votingId: number) {
    const val = await this.supabase
      .from(TABLE_VOTING_OPTIONS)
      .select('*')
      .eq('voting_id', votingId);
    console.log('val :', val);
    return val;
  }

  async addVotingOption(option: VotingOption) {
    option.creator_id = (await this.supabase.auth.getUser()).data.user?.id;

    option.votes = 0;
    delete option.id;

    return this.supabase.from(TABLE_VOTING_OPTIONS).insert(option).select();
  }

  async updateVotingOption(option: VotingOption) {
    return this.supabase
      .from(TABLE_VOTING_OPTIONS)
      .update({ title: option.title })
      .eq('id', option.id);
  }
  async deleteVotingOption(id: number) {
    return this.supabase
      .from(TABLE_VOTING_OPTIONS)
      .delete()
      .eq('id', id)
      .single();
  }
  voteForOption(id: string) {
    return this.supabase.rpc('increment', { row_id: id });
  }
}
