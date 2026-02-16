/*
  Warnings:

  - You are about to drop the column `ClassRoom` on the `TeachersTab` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `TeachersTab` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TeachersTab" DROP COLUMN "ClassRoom",
ADD COLUMN     "Div" "Class"[];

-- CreateIndex
CREATE UNIQUE INDEX "TeachersTab_id_key" ON "TeachersTab"("id");
