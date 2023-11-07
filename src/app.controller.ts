import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("create")
  @UseFilters(HttpExceptionFilter)
  async createApp (@Body("name") name: string) {
      if (name.toLowerCase() === "shodlik") {
        return {
          success: true
        }
      }

      throw new HttpException("User not found.", HttpStatus.NOT_FOUND, {
        description: "Error description."
      });
  }

}
