# Virgool (Backend)

یک پروژهٔ بک‌اند نوشته‌شده با NestJS برای اپلیکیشن Virgool — شامل ماژول‌های کاربران، احراز هویت، دسته‌بندی و کانفیگ TypeORM/Postgres.

## وضعیت

- زبان: TypeScript
- فریم‌ورک: NestJS
- دیتابیس: PostgreSQL (TypeORM)

## امکانات

- ثبت‌نام و مدیریت کاربران (OTP، پروفایل)
- احراز هویت با JWT
- مدیریت دسته‌بندی‌ها
- داکیومنت API با Swagger

## ملزومات (Prerequisites)

- Node.js >= 18
- npm یا yarn
- PostgreSQL

## متغیرهای محیطی موردنیاز

در ریشهٔ پروژه یک فایل `.env` بسازید و حداقل متغیرهای زیر را تکمیل کنید:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_DATABASE=virgool_db
JWT_SECRET=change_this_secret
PORT=3000
```

## راه‌اندازی سریع (Development)

1. نصب پکیج‌ها:

```bash
npm install
```

2. اجرای سرور در حالت توسعه:

```bash
npm run start:dev
```

3. دسترسی به Swagger (در صورت فعال):

```
http://localhost:3000/api
```

## بیلد و اجرا (Production)

```bash
npm run build
npm run start:prod
```

## تست و lint

```bash
npm run lint
npm test
```

## کانفیگ دیتابیس

پروژه از TypeORM استفاده می‌کند. کانفیگ در `src/config/typeorm.config.ts` قابل‌تنظیم است — در حالت پیش‌فرض `synchronize: true` فعال است که برای توسعه مناسب است اما در محیط پروداکشن توصیه نمی‌شود.

## ساختار پروژه (مهم‌ترین مسیرها)

- `src/modules/user` — ماژول کاربر و موجودیت‌ها
- `src/modules/auth` — لاجیک احراز هویت
- `src/modules/category` — دسته‌بندی‌ها
- `src/config` — تنظیمات اپ (Swagger، TypeORM)
- `src/swagger` — فایل‌های صادرشده Swagger

## نکات مهم برای توسعه‌دهنده

- قبل از باز کردن PR مطمئن شوید `npm run lint` بدون خطا اجرا می‌شود.
- برای تغییر ساختار دیتابیس از migrations استفاده کنید (در حال حاضر پروژه از `synchronize` استفاده می‌کند).

## مشارکت

اگر می‌خواهید کمک کنید یا باگ گزارش کنید، یک issue باز کنید یا یک pull request ارسال نمایید.

## تماس

در صورت نیاز به راهنمایی، لاگ خطا را ارسال کنید تا سریع‌تر کمک کنم.

---

به‌روزرسانی شد: README برای نمایش بهتر در GitHub و راه‌اندازی محلی آماده است.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
