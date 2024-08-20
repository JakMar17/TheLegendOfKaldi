/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Operator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Operator_username_key" ON "Operator"("username");
