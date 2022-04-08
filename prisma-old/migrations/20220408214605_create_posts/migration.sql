-- CreateTable
CREATE TABLE "Posts" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "autor" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
