/*
  Warnings:

  - A unique constraint covering the columns `[streamId,spaceId]` on the table `CurrentStream` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CurrentStream_userId_spaceId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CurrentStream_streamId_spaceId_key" ON "CurrentStream"("streamId", "spaceId");
