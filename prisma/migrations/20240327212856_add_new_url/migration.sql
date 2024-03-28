/*
  Warnings:

  - A unique constraint covering the columns `[newUrl]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "newUrl" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Link_newUrl_key" ON "Link"("newUrl");
