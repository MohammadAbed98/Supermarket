import {  ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducer';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthEffects } from './auth.effect';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';



// MatCardModule,
// MatInputModule,
// MatButtonModule,

@NgModule({
  declarations: [LoginComponent],
  imports: [  
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: LoginComponent}]),
    StoreModule.forFeature('auth', authReducer),
    // StoreModule.forRoot({loggedIn: LoginReducer}),
    EffectsModule.forFeature([AuthEffects]) ,
    FormsModule, 
    
  ],
  exports:[LoginComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
      return {
          ngModule: AuthModule,
          providers: [
            AuthService
          ]
      }
  }
 }

//  import {  ModuleWithProviders, NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { StoreModule } from '@ngrx/store';
// import { authReducer } from './reducer';
// import { LoginComponent } from './login/login.component';
// import { AuthService } from './auth.service';
// import { AuthEffects } from './auth.effect';
// import { EffectsModule } from '@ngrx/effects';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from '../app-routing.module';
// import { LoginReducer } from '../store/store';



// @NgModule({
//   declarations: [],
//   imports: [  
//     CommonModule,
//     BrowserModule,
//     AppRoutingModule,
//     ReactiveFormsModule,
//     RouterModule.forRoot([{path: '', component: LoginComponent}]),
//     StoreModule.forFeature('auth', authReducer),
//     EffectsModule.forFeature([AuthEffects]) ,
//     FormsModule,
//   ],
//   exports:[]
// })
// export class AuthModule {
//   static forRoot(): ModuleWithProviders<AuthModule> {
//       return {
//           ngModule: AuthModule,
//           providers: [
//             AuthService
//           ]
//       }
//   }
//  }
