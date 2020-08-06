import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { FacilityRepository } from '../facility/facility.repository';
import { BookingRepository} from '../booking/booking.repository';
import { BookingModule } from 'src/booking/booking.module';
import { UserRepository } from 'src/auth/user.repository';
import {Room} from 'src/rooms/entity/room.entity'
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin';
import { RoomAdmin } from './rooms.admin';




@Module({
  imports: [
    TypeOrmModule.forFeature([Room,RoomRepository]),
    TypeOrmModule.forFeature([FacilityRepository]),
    TypeOrmModule.forFeature([BookingRepository]),
    TypeOrmModule.forFeature([UserRepository]),
    BookingModule,
    DefaultAdminModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
        
    adminSite.register('Room',RoomAdmin )
  }
}
