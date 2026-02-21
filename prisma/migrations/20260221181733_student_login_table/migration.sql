-- CreateTable
CREATE TABLE "studentlogin" (
    "id" SERIAL NOT NULL,
    "rollNo" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "studentlogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "studentlogin_email_key" ON "studentlogin"("email");

-- AddForeignKey
ALTER TABLE "studentlogin" ADD CONSTRAINT "studentlogin_rollNo_fkey" FOREIGN KEY ("rollNo") REFERENCES "StudentTable"("rollNo") ON DELETE RESTRICT ON UPDATE CASCADE;
