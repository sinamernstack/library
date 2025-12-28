export enum AuthMessage {
  UserNotFound = 'حساب کاربری یافت نشد',
  UserAlreadyExist = 'حساب کاربری قبلا ثبت شده است',
  ExpireCode = 'کد تایید منقضی شده',
  TryAgain = 'لطفا دوباره امتحان کنید',
  InvalidCode = 'کد وارد شده صحیح نمیباشد',
  LoginAgain = 'لطفا دوباره وارد شوید',
  LoginOnYourAccount = 'لطفا وارد حساب کاربری خود شوید',
}
export enum publicMessage {
  Success = 'عملیات با موفقیت انجام شد',
  Faild = 'عملیات با شکست مواجه شد',
  Created = 'با موفقیت ایجاد شد',
}
export enum AuthSuccessMessage {
  LoginSuccess = 'ورود با موفقیت انجام شد',
  RegisterSuccess = 'ثبت نام با موفقیت انجام شد',
}
export enum ConflictMessage {
  CategoryTitleExist = 'عنوان دسته بندی قبلا ثبت شده است',
  CategoryPriorityExist = 'اولویت دسته بندی قبلا ثبت شده است',
}

export enum NotFoundMessage {
  UserNotFound = 'User not found',
}
export enum BadRequestMessage {
  UserAlreadyExist = 'حساب کاربری قبلا ثبت شده است',
  InvalidLoginData = 'اطلاعات ارسال شده برای ورود صحیح نمیباشد',
  InvalidRegisterData = 'اطلاعات ارسال شده برای ثبت نام صحیح نمیباشد',
}

export enum ValidationMessage {}

export enum SendOtpMessage {
  OtpSendSuccess = 'کد تایید با موفقیت ارسال شد',
}
