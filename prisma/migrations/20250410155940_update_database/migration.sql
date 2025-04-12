/*
  Warnings:

  - You are about to drop the column `movieId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `LibraryMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gameId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LibraryMovie" DROP CONSTRAINT "LibraryMovie_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "LibraryMovie" DROP CONSTRAINT "LibraryMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_movieId_fkey";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "movieId",
ADD COLUMN     "gameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";

-- DropTable
DROP TABLE "LibraryMovie";

-- DropTable
DROP TABLE "Movie";

-- CreateTable
CREATE TABLE "LibraryGame" (
    "id" TEXT NOT NULL,
    "libraryId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "LibraryGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LibraryGame" ADD CONSTRAINT "LibraryGame_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryGame" ADD CONSTRAINT "LibraryGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
