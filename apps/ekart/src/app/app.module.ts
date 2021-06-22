import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from '@ecommerce/ui/navbar';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiNavbarModule } from '@ecommerce/ui/navbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EkartReducer, searchEffects } from '@ecommerce/shared/ekart-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiNavbarModule,
    FlexLayoutModule,
    SharedMaterialModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({ shoppingList: EkartReducer }),
    StoreDevtoolsModule.instrument({ logOnly: true }),
    EffectsModule.forRoot([searchEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent],
  exports: [],
})
export class AppModule {}
