import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from "bcryptjs"
import { Contact } from "./contacts.entitie";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({type: "varchar", length: 50})
    full_name: string

    @Column({type: "varchar", length: 256, unique: true})
    email: string

    @Column({type: "varchar", length: 256})
    password: string

    @Column({type: "varchar", length: 15, unique: true})
    phone: string

    @Column({type: "boolean", default: false})
    isAdmin: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Contact, contact => contact.user)
    contacts: Contact[]

    @BeforeInsert()
    hashPasswordCreate() {
        this.password =  hashSync(this.password, 10)
    }

    @BeforeUpdate()
    newUpdateDate() {
        this.updated_at = new Date()
    }
}