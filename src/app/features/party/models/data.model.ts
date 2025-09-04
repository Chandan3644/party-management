export interface Address {
id?: number;
address_line_1: string;
address_line_2?: string;
country: number; 
state: number;
city: number;
pincode: string; 
address_type: 'Shipping' | 'Billing';
}


export interface BankAccount {
id?: number;
bank_ifsc_code: string;
bank_name: string;
branch_name: string;
account_no: string;
account_holder_name: string;
}


export interface Data {
id?: number;
login_access: boolean;
name: string;
company_name?: string;
mobile_no?: string;
telephone_no?: string;
whatsapp_no?: string;
remark?: string;
date_of_birth?: string; 
anniversary_date?: string; 
gst_type?: string;
gstin?: string;
pan_no?: string;
apply_tds?: boolean;
credit_limit?: number;
address: Address[];
bank_id: BankAccount[];
opening_balance?: number;
email?: string;
membership?: string;
opening_balance_type?: 'Cr' | 'Dr';
}