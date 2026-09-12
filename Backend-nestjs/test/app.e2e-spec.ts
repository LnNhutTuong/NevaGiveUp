import { Test, TestingModule } from '@nestjs/testing'; // tao moi truong test
import { INestApplication } from '@nestjs/common'; // dai dien cho application NestJS
import request from 'supertest'; // gui http request vao app de test API *QUAN TRONG NHAT*
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { MailService } from '../src/mail/mail.service';
import { YoutubeService } from '../src/youtube/youtube.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    // truoc khi test chuan bi mot application moi
    const moduleFixture: TestingModule = await Test.createTestingModule({
      // tao testing module moi
      imports: [AppModule], //lay toan bo module AppModule de test khong test rieng func nao het
    })
      .overrideProvider(MailService)
      .useValue({})
      .overrideProvider(YoutubeService)
      .useValue({}) // override MailService de khong gui mail that
      .compile();

    // tao va khoi dong Nest aplication tu module da tao o tren
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // =============================
  // khu vuc viet test cho cac API cua app
  // =============================

  // Test API GET /home (GET) cua app
  it('/home (GET)', () => {
    return request(app.getHttpServer()).get('/home').expect(200);
  });

  // Sau khi test xong thi dong application lai de giai phong bo nho
  afterEach(async () => {
    await app.close();
  });
});
