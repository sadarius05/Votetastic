import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../interfaces/currentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase!: SupabaseClient;
  private currentUser: BehaviorSubject<CurrentUser | any> =
    new BehaviorSubject<CurrentUser>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    const user = this.supabase.auth.getUser();
    if (user) {
      this.currentUser.next(user);
    } else {
      this.currentUser.next(false);
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(false);
      }
    });
  }

  createAccount({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signUp({ email, password });
  }
  login({ email, password }: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  async logout() {
    this.currentUser.next(false);
    return this.supabase.auth.signOut();
  }
}
