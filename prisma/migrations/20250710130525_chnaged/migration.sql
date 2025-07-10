/*
  Warnings:

  - You are about to drop the `_SpaceToStream` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SpaceToStream" DROP CONSTRAINT "_SpaceToStream_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpaceToStream" DROP CONSTRAINT "_SpaceToStream_B_fkey";

-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "spaceId" DROP NOT NULL;

-- DropTable
DROP TABLE "_SpaceToStream";

-- AddForeignKey
ALTER TABLE "Stream" ADD CONSTRAINT "Stream_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
