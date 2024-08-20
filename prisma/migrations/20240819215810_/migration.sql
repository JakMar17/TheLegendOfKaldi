/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SystemService` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SystemService_name_key" ON "SystemService"("name");
