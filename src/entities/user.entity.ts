import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Cv } from "./cv.entity";

@Entity('users')
export class User extends BaseEntity{
    @Column({ type: 'varchar', length: 255 })
    username: string

    @Column({ type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column()
    salt: string;

    @OneToMany(() => Cv, (cv) => cv.user)
    cvs: Cv[]
}
