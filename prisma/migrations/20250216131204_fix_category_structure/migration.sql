/*
  Warnings:

  - You are about to drop the column `landmarkId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_landmarkId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "landmarkId";

-- CreateTable
CREATE TABLE "LandmarkCategory" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "landmarkId" INTEGER NOT NULL,

    CONSTRAINT "LandmarkCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LandmarkCategory" ADD CONSTRAINT "LandmarkCategory_landmarkId_fkey" FOREIGN KEY ("landmarkId") REFERENCES "Landmark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandmarkCategory" ADD CONSTRAINT "LandmarkCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
