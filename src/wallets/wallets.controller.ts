import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { SendDto } from './dto/send.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Post('send')
  async send(@Body() sendDto: SendDto) {
    return this.walletsService.send(sendDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.walletsService.findOneByUserId(userId);
  }
}
