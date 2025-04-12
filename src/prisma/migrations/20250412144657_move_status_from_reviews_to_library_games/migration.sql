/*
  Warnings:

  - You are about to drop the column `statusId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `LibraryGame` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_statusId_fkey";

-- AlterTable
ALTER TABLE "LibraryGame" ADD COLUMN     "statusId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "statusId";

-- AddForeignKey
ALTER TABLE "LibraryGame" ADD CONSTRAINT "LibraryGame_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
