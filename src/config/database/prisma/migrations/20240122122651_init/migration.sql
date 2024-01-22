-- CreateTable
CREATE TABLE "Cats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,

    CONSTRAINT "Cats_pkey" PRIMARY KEY ("id")
);
