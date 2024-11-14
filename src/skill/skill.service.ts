import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from 'src/entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillRepository: Repository<Skill>,
  ) {}
  // C
  async addSkill(createSkillDto: CreateSkillDto) {
    return await this.skillRepository.save(createSkillDto);
  }
  // R
  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id: id } });
    if (!skill) throw new NotFoundException(`todo avec ${id} introuvable `);
    return skill;
  }
  // U
  async update(id: number, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillRepository.findOne({ where: { id: id } });
    if (!skill) throw new NotFoundException(`todo of id ${id} not found`);
    return await this.skillRepository.update(id, updateSkillDto);
  }
  // D
  async remove(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id: id } });
    if (!skill) throw new NotFoundException(`todo of id ${id} not found`);
    return await this.skillRepository.delete(id);
  }
}