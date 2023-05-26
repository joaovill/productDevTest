-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
