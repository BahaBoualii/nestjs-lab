import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity('skills')
export class Skill extends BaseEntity {
    @Column({ type: 'text' })
    designation: string
}
