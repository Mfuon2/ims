export class CreateAssetDto {
  asset_share_classCode: string;
  asset_name: string;
  asset_declared_rate: number;
  unit_price: number;
  guaranteed_interest_rate: number;
  minimum_contribution: number;
  maximum_contribution: number;
  withdrawal_limit: number;
  withdrawal_limit_duration: number;
  withdrawal_limit_duration_type: number;
  minimum_withdrawal: number;
  maximum_withdrawal: number;
  withdrawal_settlement_period: number;
  withdrawal_settlement_period_type: string;
  early_withdrawal_penalty: string;
  contribution_business_account: string;
  is_deleted: boolean;
  withholding_tax: number;
}
