import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";
import { Skill } from "./skill.entity";

@Entity('cvs')
export class Cv extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    firstName: string

    @Column({ type: 'varchar', length: 255 })
    lastName: string

    @Column()
    age: number

    @Column()
    cin: number

    @Column()
    job: string

    @Column()
    path: string

    @ManyToOne(() => User, (user) => user.cvs)
    user: User

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[]

}
