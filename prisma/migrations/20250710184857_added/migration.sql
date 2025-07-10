/*
  Warnings:

  - A unique constraint covering the columns `[userId,spaceId]` on the table `CurrentStream` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CurrentStream_userId_streamId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStream_userId_spaceId_key" ON "CurrentStream"("userId", "spaceId");
