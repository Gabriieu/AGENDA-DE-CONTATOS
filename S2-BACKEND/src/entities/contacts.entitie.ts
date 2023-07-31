import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitie";


@Entity("contacts")
export class Contact {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({type: "varchar", length: 256})
    full_name: string

    @Column({type: "varchar", length: 256})
    email: string

    @Column({type: "varchar", length: 15})
    phone: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => User, user => user.contacts)
    user: User
}