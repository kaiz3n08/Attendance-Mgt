/*
  Warnings:

  - You are about to drop the `AttendanceTable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ClassRoom]` on the table `TeachersTab` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TeachersTab_id_key";

-- DropTable
DROP TABLE "AttendanceTable";

-- CreateTable
CREATE TABLE "StudentTable" (
    "id" SERIAL NOT NULL,
    "rollNo" INTEGER NOT NULL,
    "StudentName" TEXT NOT NULL,

    CONSTRAINT "StudentTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceSheet" (
    "id" SERIAL NOT NULL,
    "div" TEXT NOT NULL DEFAULT 'A',
    "rollNo" INTEGER NOT NULL,
    "TimeNdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendanceSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentTable_rollNo_key" ON "StudentTable"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceSheet_div_key" ON "AttendanceSheet"("div");

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceSheet_rollNo_key" ON "AttendanceSheet"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "TeachersTab_ClassRoom_key" ON "TeachersTab"("ClassRoom");

-- AddForeignKey
ALTER TABLE "AttendanceSheet" ADD CONSTRAINT "AttendanceSheet_div_fkey" FOREIGN KEY ("div") REFERENCES "TeachersTab"("ClassRoom") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceSheet" ADD CONSTRAINT "AttendanceSheet_rollNo_fkey" FOREIGN KEY ("rollNo") REFERENCES "StudentTable"("rollNo") ON DELETE RESTRICT ON UPDATE CASCADE;
