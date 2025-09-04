import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Snack {
    constructor(private sb: MatSnackBar) {}

  private config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  ok(msg: string) {
    this.sb.open(msg, 'OK', {
      ...this.config,
      panelClass: ['snack-success']
    });
  }

  err(msg: string) {
    this.sb.open(msg, 'DISMISS', {
      ...this.config,
      duration: 4000, 
      panelClass: ['snack-error']
    });
  }

  warn(msg: string) {
    this.sb.open(msg, 'CLOSE', {
      ...this.config,
      panelClass: ['snack-warn']
    });
  }
}

