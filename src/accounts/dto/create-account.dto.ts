
export class CreateAccountDto {
  asset_name: string;
  asset_id: string;
  investor_id: string;

  units = 0.0;

  unit_price = 0.0;

  market_value = 0.0;

  account_number = 0.0;

  deposits = 0.0;

  withdrawals = 0.0;

  balance = 0.0;

  cumulative_income = 0.0;

  is_deleted: boolean;

  is_active = false;
}
