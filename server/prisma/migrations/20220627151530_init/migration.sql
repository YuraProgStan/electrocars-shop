-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT E'user',
    "avatar" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "Brand"("email");
