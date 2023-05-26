import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
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

  findById(id: string) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
