import { Entity, Column, OneToMany } from "typeorm";
import { AuditFields } from "./auditFields";
import { Todo } from "./todo";
  
@Entity({ name:'user'})
export class User extends AuditFields {

    @Column({ type: "varchar", length: 250, nullable: true })
    firstName: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    lastName: string;

    @Column({ type: "varchar", length: 250, nullable: true })
    email: string;
    
    @Column({ type: "varchar", length: 250, nullable: true})
    username: string;
    
    @Column({ type: "varchar", length: 250, nullable: true})
    password: string;
    
    @OneToMany(() => Todo, (todos) => todos.user)
    todos: Todo[]

}