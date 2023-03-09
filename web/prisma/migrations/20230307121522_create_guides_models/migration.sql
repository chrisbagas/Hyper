-- CreateEnum
CREATE TYPE "CommunityPostType" AS ENUM ('CLIP', 'GUIDE');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "CommunityPostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" TEXT NOT NULL,
    "type" "CommunityPostType" NOT NULL,
    "status" "CommunityPostStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "CommunityPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPostHeader" (
    "postId" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "CommunityPostHeader_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "CommunityPostTag" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "CommunityPostTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityTag" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CommunityTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommunityPostTag_postId_tagId_key" ON "CommunityPostTag"("postId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityTag_slug_key" ON "CommunityTag"("slug");

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPost" ADD CONSTRAINT "CommunityPost_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostHeader" ADD CONSTRAINT "CommunityPostHeader_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostTag" ADD CONSTRAINT "CommunityPostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "CommunityPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPostTag" ADD CONSTRAINT "CommunityPostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "CommunityTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
