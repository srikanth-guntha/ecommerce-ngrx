import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ecommerce-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public message = '';
  constructor(@Inject(MAT_DIALOG_DATA) private data: { message: string }) {}

  ngOnInit(): void {
    this.message = this.data.message;
  }
}
