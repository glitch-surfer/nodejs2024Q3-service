interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  constructor(public oldPassword: string, public newPassword: string) {}
}
