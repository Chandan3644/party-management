import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Party } from '../party';
import { MaterialModule } from '../../../shared/material/material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Snack } from '../../../core/notify/snack';

@Component({
  selector: 'app-party-form',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './party-form.html',
  styleUrl: './party-form.css'
})
export class PartyForm {
  form!: FormGroup;
  mode: 'new' | 'edit' | 'view' = 'new';
  partyId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: Snack,
    private party: Party
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      company_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gstin: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
      address: this.fb.array([]),
      bank_id: this.fb.array([])
    });
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.partyId = Number(params.get('id'));
        if (this.route.snapshot.url.some(seg => seg.path === 'edit')) {
          this.mode = 'edit';
          this.loadParty();
        } else if (this.route.snapshot.url.some(seg => seg.path === 'view')) {
          this.mode = 'view';
          this.loadParty();
          this.form.disable();
        }
      }
    });
  }

  get addressArray() {
    return this.form.get('address') as FormArray;
  }
  addAddress(address?: any) {
    this.addressArray.push(this.fb.group({
      id: [address?.id],
      address_line_1: [address?.address_line_1 || '', Validators.required],
      address_line_2: [address?.address_line_2 || ''],
      country: [address?.country || '', Validators.required],
      state: [address?.state || '', Validators.required],
      city: [address?.city || '', Validators.required],
      pincode: [address?.pincode || '', Validators.required],
      address_type: [address?.address_type || 'Shipping', Validators.required]
    }));
  }
  removeAddress(i: number) {
    this.addressArray.removeAt(i);
  }

  get bankArray() {
    return this.form.get('bank_id') as FormArray;
  }
  addBank(bank?: any) {
    this.bankArray.push(this.fb.group({
      id: [bank?.id],
      bank_ifsc_code: [bank?.bank_ifsc_code || '', Validators.required],
      bank_name: [bank?.bank_name || '', Validators.required],
      branch_name: [bank?.branch_name || '', Validators.required],
      account_no: [bank?.account_no || '', Validators.required],
      account_holder_name: [bank?.account_holder_name || '', Validators.required]
    }));
  }
  removeBank(i: number) {
    this.bankArray.removeAt(i);
  }

  loadParty() {
    if (!this.partyId) return;
    this.party.getById(this.partyId).subscribe(party => {
      this.form.patchValue(party);

      if (party.address) {
        this.addressArray.clear();
        party.address.forEach(addr => this.addAddress(addr));
      }

      if (party.bank_id) {
        this.bankArray.clear();
        party.bank_id.forEach(bank => this.addBank(bank));
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
        this.snack.err('Please fill all required fields.');
      return;
    }

    const party = this.form.value;

    if (this.mode === 'new') {
      this.party.create(party).subscribe({
        next: (res) => {
          this.snack.ok('Party created successfully ');
          this.router.navigate(['/parties']);
        },
        error: (err) => {
          this.snack.err('Failed to create party');
        }
      });
    } else if (this.mode === 'edit' && this.partyId) {
      this.party.update(this.partyId, party).subscribe({
        next: (res) => {
          this.snack.ok('Party updated successfully ');
          this.router.navigate(['/parties']);
        },
        error: (err) => {
          this.snack.err('Failed to update party');
        }
      });
    }
  }


}