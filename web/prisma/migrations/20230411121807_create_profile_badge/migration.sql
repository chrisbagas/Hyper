-- CreateTable
CREATE TABLE "ProfileBadge" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ProfileBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileBadgeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileBadgeToUser_AB_unique" ON "_ProfileBadgeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileBadgeToUser_B_index" ON "_ProfileBadgeToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProfileBadgeToUser" ADD CONSTRAINT "_ProfileBadgeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ProfileBadge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileBadgeToUser" ADD CONSTRAINT "_ProfileBadgeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
