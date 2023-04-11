-- CreateTable
CREATE TABLE "GameTag" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "GameTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToGameTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameToGameTag_AB_unique" ON "_GameToGameTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GameToGameTag_B_index" ON "_GameToGameTag"("B");

-- AddForeignKey
ALTER TABLE "_GameToGameTag" ADD CONSTRAINT "_GameToGameTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToGameTag" ADD CONSTRAINT "_GameToGameTag_B_fkey" FOREIGN KEY ("B") REFERENCES "GameTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
