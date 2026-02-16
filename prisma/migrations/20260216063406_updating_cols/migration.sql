/*
  Warnings:

  - You are about to drop the column `Div` on the `TeachersTab` table. All the data in the column will be lost.
  - Added the required column `ClassRoom` to the `TeachersTab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeachersTab" DROP COLUMN "Div",
ADD COLUMN     "ClassRoom" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Class";
