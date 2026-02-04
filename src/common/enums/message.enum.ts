export enum AuthMessage {
  UserAlreadyExist = 'حساب کاربری قبلا ثبت شده است',
  ExpireCode = 'کد تایید منقضی شده',
  TryAgain = 'لطفا دوباره امتحان کنید',
  InvalidCode = 'کد وارد شده صحیح نمیباشد',
  LoginAgain = 'لطفا دوباره وارد شوید',
  LoginOnYourAccount = 'لطفا وارد حساب کاربری خود شوید',
  LoginSuccess = 'ورود با موفقیت انجام شد',
  RegisterSuccess = 'ثبت نام با موفقیت انجام شد',
  OtpSendSuccess = 'کد تایید با موفقیت ارسال شد'
}
export enum publicMessage {
  Success = 'عملیات با موفقیت انجام شد',
  Faild = 'عملیات با شکست مواجه شد',
  Created = 'با موفقیت ایجاد شد',
  Updated = 'با موفقیت بروزرسانی شد',
  Deleted = 'با موفقیت حذف شد'
}

export enum ConflictMessage {
  CategoryTitleExist = 'عنوان دسته بندی قبلا ثبت شده است',
  CategoryPriorityExist = 'اولویت دسته بندی قبلا ثبت شده است',
  Email="ایمیل فبلن توسط کاربری دیگر استفاده شده است"
}
export enum NotFoundMessage {
  CategoryNotFound = 'دسته بندی یافت نشد',
  UserNotFound = 'حساب کاربری یافت نشد',
  PostNotFound = 'پست یافت نشد',
  CommentNotFound = 'کامنت یافت نشد',
  NotFound = 'موردی یافت نشد'
}

export enum BadRequestMessage {
  UserAlreadyExist = 'حساب کاربری قبلا ثبت شده است',
  InvalidLoginData = 'اطلاعات ارسال شده برای ورود صحیح نمیباشد',
  InvalidRegisterData = 'اطلاعات ارسال شده برای ثبت نام صحیح نمیباشد',
  SomethingIsWrong ='مشکلی پیش آمده است'
}

export enum ValidationMessage {
  InvalidImageFormat = "فرمت تصویر انتخاب شده باید از نوع jpg jpeg png باشد",
  InvalidEmailFormat = "فرمت ایمیل وارد شده صحیح نمیباشد",
  InvalidPhoneFormat = "فرمت شماره تلفن وارد شده صحیح نمیباشد"
}
