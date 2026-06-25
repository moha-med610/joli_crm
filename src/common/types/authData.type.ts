import { UserDocument } from 'src/modules/auth/schema/users.schema';
import { CompanyDocument } from 'src/modules/company/schema/company.schema';

export type authData = {
  user: UserDocument;
  company: CompanyDocument;
};
