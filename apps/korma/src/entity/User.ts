import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  EntitySchema,
  BaseEntity,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;
}
