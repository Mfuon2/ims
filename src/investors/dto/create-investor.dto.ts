export class CreateInvestorDto {
  fullName: string;
  code: string;
  email: string;
  mobile: string;
  identity: string;
  identity_type: string[];
  date_of_birth: Date;
  tax_number: string;
  is_deleted: boolean;
}
