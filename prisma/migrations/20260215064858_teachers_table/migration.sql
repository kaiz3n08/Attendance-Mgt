-- CreateEnum
CREATE TYPE "Class" AS ENUM ('A', 'B', 'C');

-- CreateTable
CREATE TABLE "TeachersTab" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ClassRoom" "Class"[],

    CONSTRAINT "TeachersTab_pkey" PRIMARY KEY ("id")
);
