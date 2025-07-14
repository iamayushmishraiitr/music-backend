-- DropIndex
DROP INDEX "Upvotes_userId_streamId_key";

-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
