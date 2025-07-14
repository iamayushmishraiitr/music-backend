/*
  Warnings:

  - A unique constraint covering the columns `[userId,streamId]` on the table `Upvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_userId_streamId_key" ON "Upvotes"("userId", "streamId");
