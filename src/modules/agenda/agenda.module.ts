import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RoomBookService } from './services/room-book.service';
import { RoomRepository } from './repositories/room.repository';
import { AgendaController } from './controller/agenda.controller';
import { EventHandlers } from './events/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        ...CommandHandlers,
        ...EventHandlers
    ],
})
export class AgendaModule { }
