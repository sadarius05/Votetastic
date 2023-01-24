import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export const TABLE_VOTINGS = 'votings';

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
    const votings = await this.supabase.from(TABLE_VOTINGS).select('*');
    return votings.data || [];
  }
}
