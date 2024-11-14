import { NestFactory } from '@nestjs/core';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../entities/skill.entity';
import * as falso from '@ngneat/falso';
import { User } from '../entities/user.entity';
import { Cv } from '../entities/cv.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  const userService = app.get(UserService);
  const skillService = app.get(SkillService);
  const skills = [];
  for (let i = 0; i < 10; i++) {
    const skill = new Skill();
    skill.designation = falso.randSkill();
    const newSkill = await skillService.addSkill(skill);
    skills.push(skill);
  }
  const users = [];
  for (let i = 0; i < 10; i++) {
    const mail = falso.randEmail();
    const username = falso.randFirstName();
    const password = falso.randPassword();
    const user = new User();
    user.password = password;
    user.username = username;
    user.email = mail;
    const newUser = await userService.register(user);
    users.push(newUser);
  }

  for (let i = 0; i < 10; i++) {
    const firstname = falso.randFirstName();
    const name = falso.randLastName();
    const age = falso.randNumber({ min: 18, max: 100 });
    const cin = falso.randNumber({ min: 100, max: 1000 });
    const job = falso.randJobTitle();
    const path = falso.randUrl();
    const user_skills = [skills[i], skills[(i + 1) % 10], skills[(i + 2) % 10]];
    const cv = new Cv();
    cv.firstName = firstname;
    cv.lastName = name;
    cv.age = age;
    cv.cin = cin;
    cv.job = job;
    cv.path = path;
    cv.skills = user_skills;
    const newCv = await cvService.addCvGivenACV(cv, users[i % 10]);
  }
  await app.close();
}
bootstrap();