-- CreateTable
CREATE TABLE "Crud" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Crud_pkey" PRIMARY KEY ("id")
);
