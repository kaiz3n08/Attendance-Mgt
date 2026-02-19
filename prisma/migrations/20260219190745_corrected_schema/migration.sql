/*
  Warnings:

  - You are about to drop the column `div` on the `AttendanceSheet` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `TeachersTab` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[TimeNdDate]` on the table `AttendanceSheet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `TeachersTab` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `division` to the `StudentTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `TeachersTab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TeachersTab` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AttendanceSheet_rollNo_key";

-- AlterTable
ALTER TABLE "AttendanceSheet" DROP COLUMN "div",
ALTER COLUMN "TimeNdDate" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "StudentTable" ADD COLUMN     "division" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeachersTab" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceSheet_TimeNdDate_key" ON "AttendanceSheet"("TimeNdDate");

-- CreateIndex
CREATE UNIQUE INDEX "TeachersTab_email_key" ON "TeachersTab"("email");

-- AddForeignKey
ALTER TABLE "StudentTable" ADD CONSTRAINT "StudentTable_division_fkey" FOREIGN KEY ("division") REFERENCES "TeachersTab"("ClassRoom") ON DELETE RESTRICT ON UPDATE CASCADE;
