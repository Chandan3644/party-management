import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address, Data, BankAccount } from './models/data.model';

@Injectable({
  providedIn: 'root'
})
export class Party {
  private base = `${environment.apiBase}/party/`;

  constructor(private http: HttpClient) { }

  getAll(params?: { page?: number; page_size?: number; search?: string; is_active?: boolean }): Observable<Data[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) httpParams = httpParams.set(k, v);
      });
    }
    return this.http.get<Data[]>(this.base, { params: httpParams });
  }

  getById(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.base}?id=${id}`);
  }

  create(party: any): Observable<any> {
    const fd = this.toFormData(party);
    return this.http.post(this.base, fd);
  }

  update(id: number, party: any): Observable<any> {
    const fd = this.toFormData(party);
    return this.http.put(`${this.base}?id=${id}`, fd);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}?id=${id}`);
  }
  private isValidGstin(gstin: string): boolean {
    const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinPattern.test(gstin);
  }

  private isValidMobile(mobile: string): boolean {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
  }
  private toFormData(party: any): FormData {
    const fd = new FormData();

    if (party.gstin && !this.isValidGstin(party.gstin)) {
      throw new Error('Invalid GSTIN format');
    }

    if (party.mobile_no && !this.isValidMobile(party.mobile_no)) {
      throw new Error('Invalid Mobile Number');
    }

    fd.append('login_access', (party.login_access ?? true).toString()); 
    fd.append('name', party.name ?? '');
    fd.append('company_name', party.company_name ?? '');
    fd.append('mobile_no', party.mobile_no ?? '');
    fd.append('telephone_no', party.telephone_no ?? '');
    fd.append('whatsapp_no', party.whatsapp_no ?? '');
    fd.append('remark', party.remark ?? '');

    if (party.date_of_birth) fd.append('date_of_birth', party.date_of_birth);
    if (party.anniversary_date) fd.append('anniversary_date', party.anniversary_date);

    fd.append('gst_type', party.gst_type ?? 'UnRegistered');
    fd.append('gstin', party.gstin ?? '');
    fd.append('pan_no', party.pan_no ?? '');

    fd.append('apply_tds', (party.apply_tds ?? false).toString());  
    fd.append('credit_limit', (party.credit_limit ?? 0).toString());
    fd.append('opening_balance', (party.opening_balance ?? 0).toString());
    fd.append('opening_balance_type', party.opening_balance_type ?? 'Cr');
    fd.append('email', party.email ?? '');
    fd.append('membership', party.membership ?? '');

    if (party.address && party.address.length > 0) {
      const addrData = (party.address as Address[]).map(({ id, ...rest }) => rest);
      fd.append('address', JSON.stringify(addrData));
    }

    if (party.bank_id && party.bank_id.length > 0) {
      const bankData = (party.bank_id as BankAccount[]).map(({ id, ...rest }) => rest);
      fd.append('bank_id', JSON.stringify(bankData));
    }

    return fd;
  }



}






