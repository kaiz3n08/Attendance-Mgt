-- CreateTable
CREATE TABLE "AttendanceTable" (
    "id" SERIAL NOT NULL,
    "rollNo" INTEGER NOT NULL,
    "StudentName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "day" TEXT NOT NULL,
    "Attendance" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AttendanceTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceTable_rollNo_key" ON "AttendanceTable"("rollNo");
