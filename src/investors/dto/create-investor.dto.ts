export class CreateInvestorDto {
  fullName: string;
  clientCode: string;
  email: string;
  mobile: string;
  identity: string;
  identity_type: string[];
  date_of_birth: Date;
  tax_number: string;
}

export class InvestorAccountEntity {
  fund_name: string;
  units = 0.0;
  unit_price = 0.0;
  balance = 0.0;
  accountNumber = 0.0;
  investor_id: string;
  cumulative_income = 0.0;
  market_value = 0.0;
  is_active = false;
}

export class InvestorAddressEntity {
  id: string;
  street: string;
  city: string;
  physical_address: string;
  postal_address: string;
  isActive = false;
}
