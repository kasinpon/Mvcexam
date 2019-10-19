import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany, PrimaryColumn, ManyToOne
} from "typeorm";
@Entity()
export class Student {

    // @PrimaryColumn()
    // Userid: number; ใช้ในกรณีที่มีค่า ของ primarykey อยู่เเล้ว

    @PrimaryColumn()
    studentid: number;

    @Column()
    password:string

    @Column()
    total:number


}