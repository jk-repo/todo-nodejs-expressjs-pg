import { Entity, Column, ManyToOne } from "typeorm";
import { AuditFields } from "./auditFields";
import { User } from "./user";
  
@Entity({ name:'todo'})
export class Todo extends AuditFields {

    @ManyToOne(()=>User, (user) => user.todos)
    user: User;

    @Column({ type: "text", nullable: true })
    todo: string;
    
    @Column('boolean', {default: false})
    isCompleted: boolean;

}