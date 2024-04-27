-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "brand" TEXT,
    "last4" TEXT,
    "expMonth" TEXT NOT NULL,
    "expYear" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");
