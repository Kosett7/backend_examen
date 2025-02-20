import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      console.log('Intentando crear usuario en la base de datos...');
      
      const existingUser = await this.usersRepository.findOne({
        where: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });

      if (existingUser) {
        throw new ConflictException('El usuario o email ya existe');
      }

      const user = this.usersRepository.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
        isActive: true
      });

      const queryBuilder = this.usersRepository.createQueryBuilder()
        .insert()
        .into(User)
        .values(user);
      
      console.log('SQL Query:', queryBuilder.getSql());
      console.log('Query Parameters:', queryBuilder.getParameters());

      const savedUser = await this.usersRepository.save(user);
      console.log('Usuario guardado en la base de datos:', savedUser);
      
      const verifiedUser = await this.usersRepository.findOne({
        where: { id: savedUser.id }
      });
      console.log('Usuario verificado en la base de datos:', verifiedUser);
      
      return savedUser;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }


  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: any) {
    return this.usersRepository.update(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}