import { Controller, Post, Body, Patch, Param, Delete, Get, ParseIntPipe, Query, Version } from '@nestjs/common';
import { TodoService } from './todo.service';
import { StatusEnum } from 'src/enums/status.enum';
import { CreateTodoDto } from 'src/dtos/todo/create.dto';
import { UpdateTodoDto } from 'src/dtos/todo/update.dto';
import { TodoEntity } from 'src/entities/todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Version('1')
  async addTodo1(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('status') status: StatusEnum,
  ) {
    return this.todoService.addTodo1(name, description, status);
  }

  @Post()
  @Version('2')
  async addTodo2(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.addTodo2(createTodoDto);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    await this.todoService.deleteTodo(id);
    return { message: `Todo with id ${id} deleted successfully` };
  }

  @Patch(':id/restore')
  async restoreTodo(
    @Param('id') id: number,
  ): Promise<TodoEntity> {
    return this.todoService.restoreTodo(id);
  }

  @Get()
  async getAllTodos(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ todos: TodoEntity[]; total: number; page: number; lastPage: number }> {
    return this.todoService.getAllTodos(search, status, page, limit);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

  @Get('count/status')
  async countTodosByStatus() {
    return this.todoService.countTodosByStatus();
  }
}
