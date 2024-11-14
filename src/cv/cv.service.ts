import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from 'src/entities/cv.entity';
import { Skill } from 'src/entities/skill.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // C
  async addCv(createCvDto: CreateCvDto, user: User) {
    const { skills, ...cvData } = createCvDto;
    const cv = this.cvRepository.create(cvData);
    cv.skills = [];
    for (const skill of createCvDto.skills) {
      const skillEntity = await this.skillRepository.findOne({
        where: {
          designation: skill,
        },
      });
      if (skillEntity) {
        cv.skills.push(skillEntity);
      } else {
        const newSkill = this.skillRepository.create();
        newSkill.designation = skill;
        await this.skillRepository.save(newSkill);
        cv.skills.push(newSkill);
      }
    }
    cv.user = user;
    return await this.cvRepository.save(cv);
  }

  async addCvGivenACV(cv: Cv, user: User) {
    cv.user = user;
    return await this.cvRepository.save(cv);
  }

  // R
  async findAll() {
    return await this.cvRepository.find({
      relations: ['skills'],
    });
  }

  async findOne(id: number) {
    return await this.cvRepository.findOne({
      where: {
        id: id,
      },
      relations: ['skills'],
    });
  }

  async getAllCvByUser(userId: number) {}
  // U
  async update(id: number, updateCvDto: UpdateCvDto, userId: number) {
    const cv = await this.cvRepository.findOne({
      where: {
        id: id,
      },
      relations: ['skills', 'user'],
    });
    if (!cv) {
      throw new NotFoundException('Cv introuvable');
    }
    if (cv.user.id !== userId) {
      throw new UnauthorizedException(
        'User ${id} n a pas le droit de modifier le cv ${cv.id}',
      );
    }
    const updatedCv = { updateCvDto, ...cv };
    return await this.cvRepository.save(updatedCv);
  }
  // D
  async remove(id: number, userId: number) {
    const cv = await this.cvRepository.findOne({
      where: {
        id: id,
      },
      relations: ['skills', 'user'],
    });
    if (!cv) {
      throw new NotFoundException(
        'User ${id} n a pas le droit de modifier le cv ${cv.id}',
      );
    }
    if (cv.user.id !== userId) {
      throw new UnauthorizedException(
        `User with id ${userId} is not authorized to delete this CV`,
      );
    }
    await this.cvRepository.remove(cv);
  }
}