import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  isDate,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  usuario: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  senha: string;

  
  @IsNotEmpty()
  @Column()
  data_nascimento: Date;

  @Column({ length: 5000 })
  foto: string;
}
