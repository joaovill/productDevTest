import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, username: string): Promise<Project> {
    const data: Prisma.ProjectCreateInput = {
      ...createProjectDto,
      username,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      done: false
    };

    const createdProject = await this.prisma.project.create({ data });

    return {
      ...createdProject
    };
  }

  async findAllByUsername(username: string): Promise<Project[]>{
    return await this.prisma.project.findMany({ where: { username } })
  }

  async findById(id: string, username: string): Promise<Project>{
    const data = await this.prisma.project.findUnique({ where: { id }})

    if(data.username !== username){
      throw new UnauthorizedException("You are not the owner of this project")
    }

    return data 
  }

  async updateToDone(id: string, username: string) {
    
    const data = await this.findById(id, username)

    if(data.done){
      throw new Error('Project already done')
    }

    data.done = true
    data.updated_at = new Date().toISOString()

    return this.prisma.project.update({ data, where: { id } })
  }

  async deleteProject(id: string, username: string) {
    const data = await this.findById(id, username)

    return this.prisma.project.delete({where: {id}})
  }
}
