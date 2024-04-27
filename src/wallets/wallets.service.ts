import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Transaction, TrasnactionStatus, Wallet } from '@prisma/client';
import { SendDto } from './dto/send.dto';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async send(sendDto: SendDto): Promise<Transaction> {
    const { amount, from, to } = sendDto;

    try {
      return this.prisma.$transaction(
        async (tx) => {
          const senderWallet = await tx.wallet.findUnique({
            where: { userId: from },
          });
          if (senderWallet.balance < amount) {
            throw new BadRequestException('Not enough funds!');
          }
          await tx.wallet.update({
            where: { userId: from },
            data: { balance: { decrement: amount } },
          });

          await tx.wallet.update({
            where: { userId: to },
            data: { balance: { increment: amount } },
          });

          return await tx.transaction.create({
            data: {
              amount,
              from,
              to,
              status: TrasnactionStatus.ACCEPTED,
            },
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      console.error(error);
      return;
    }
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    return this.prisma.$transaction(
      async (tx) => {
        const walletExist = await tx.wallet.findUnique({
          where: { userId: createWalletDto.userId },
        });
        if (walletExist) {
          throw new ConflictException(
            `Wallet for user:${createWalletDto.userId} already exist!`,
          );
        }
        const createdWallet = await tx.wallet.create({
          data: { userId: createWalletDto.userId, balance: 0 },
        });

        return createdWallet;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );
  }

  findOneByUserId(userId: string) {
    return this.prisma.wallet.findUnique({ where: { userId } });
  }

  async increment(userId: string, amount: number): Promise<Wallet> {
    const wallet = await this.prisma.wallet.findUnique({ where: { userId } });
    return this.prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: { increment: amount } },
    });
  }
}
