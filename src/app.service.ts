import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bem-vinda ao Sistema de CRM - GreenTech 2026';
  }
}
