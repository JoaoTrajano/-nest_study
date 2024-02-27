/*
  Warnings:

  - You are about to drop the `Cats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cats";

-- CreateTable
CREATE TABLE "cats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,

    CONSTRAINT "cats_pkey" PRIMARY KEY ("id")
);
