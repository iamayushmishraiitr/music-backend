/*
  Warnings:

  - A unique constraint covering the columns `[userId,streamId]` on the table `CurrentStream` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CurrentStream_userId_streamId_key" ON "CurrentStream"("userId", "streamId");
