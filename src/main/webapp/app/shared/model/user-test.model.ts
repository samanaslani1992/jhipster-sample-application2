export interface IUserTest {
  id?: number;
  firstName?: string;
  lastName?: string;
  referralCode?: string | null;
  nationalCode?: string;
  phoneNumber?: string | null;
  email?: string | null;
}

export const defaultValue: Readonly<IUserTest> = {};
