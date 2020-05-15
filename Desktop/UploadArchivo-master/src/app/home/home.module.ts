import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { HomeRoutingModule } from '@app/home/home-routing.module';
import { HomeComponent } from '../../app/home/home.component';
import { HomeRoutingModule } from "../../app/home/home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
