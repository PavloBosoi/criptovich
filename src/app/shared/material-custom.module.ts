import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule,
  MatTabsModule, MatTableModule, MatTableDataSource, MatSort
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,

  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,

  ],
  declarations: []
})
export class MaterialCustomModule { }
