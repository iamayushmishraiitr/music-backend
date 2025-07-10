/*
  Warnings:

  - Made the column `spaceId` on table `Stream` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Stream" DROP CONSTRAINT "Stream_spaceId_fkey";

-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "spaceId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_SpaceToStream" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SpaceToStream_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SpaceToStream_B_index" ON "_SpaceToStream"("B");

-- AddForeignKey
ALTER TABLE "_SpaceToStream" ADD CONSTRAINT "_SpaceToStream_A_fkey" FOREIGN KEY ("A") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToStream" ADD CONSTRAINT "_SpaceToStream_B_fkey" FOREIGN KEY ("B") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
