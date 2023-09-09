-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "walletAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_metadata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "externalUrl" TEXT,
    "unlocked" BOOLEAN NOT NULL DEFAULT false,
    "baseNftMetadataId" INTEGER NOT NULL,
    "eventType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_nft_metadata" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "description" TEXT,
    "animationUrl" TEXT,
    "youtubeUrl" TEXT,
    "attributes" JSONB,
    "collectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "base_nft_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft" (
    "id" SERIAL NOT NULL,
    "tokenId" INTEGER,
    "metadataId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "nftCollectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "type" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "makerId" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts_transactions" (
    "nftId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "nfts_transactions_pkey" PRIMARY KEY ("nftId","transactionId")
);

-- CreateTable
CREATE TABLE "myria_mystery_box" (
    "id" SERIAL NOT NULL,
    "myriaId" INTEGER,
    "tokenId" INTEGER,
    "nftCollectionId" INTEGER NOT NULL,
    "receiverId" INTEGER,
    "nftMetadataId" INTEGER NOT NULL,
    "mintedNftId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "myria_mystery_box_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_walletAddress_key" ON "user"("walletAddress");

-- CreateIndex
CREATE INDEX "user_walletAddress_idx" ON "user"("walletAddress");

-- CreateIndex
CREATE INDEX "nft_metadata_unlocked_idx" ON "nft_metadata"("unlocked");

-- CreateIndex
CREATE INDEX "nft_metadata_baseNftMetadataId_idx" ON "nft_metadata"("baseNftMetadataId");

-- CreateIndex
CREATE INDEX "nft_metadata_eventType_idx" ON "nft_metadata"("eventType");

-- CreateIndex
CREATE INDEX "base_nft_metadata_attributes_idx" ON "base_nft_metadata" USING GIN ("attributes" jsonb_path_ops);

-- CreateIndex
CREATE INDEX "base_nft_metadata_name_idx" ON "base_nft_metadata"("name");

-- CreateIndex
CREATE INDEX "base_nft_metadata_collectionId_idx" ON "base_nft_metadata"("collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "nft_collection_contractAddress_key" ON "nft_collection"("contractAddress");

-- CreateIndex
CREATE INDEX "nft_collection_name_idx" ON "nft_collection"("name");

-- CreateIndex
CREATE INDEX "nft_collection_contractAddress_idx" ON "nft_collection"("contractAddress");

-- CreateIndex
CREATE UNIQUE INDEX "nft_metadataId_key" ON "nft"("metadataId");

-- CreateIndex
CREATE INDEX "nft_tokenId_idx" ON "nft"("tokenId");

-- CreateIndex
CREATE INDEX "nft_metadataId_idx" ON "nft"("metadataId");

-- CreateIndex
CREATE INDEX "nft_ownerId_idx" ON "nft"("ownerId");

-- CreateIndex
CREATE INDEX "nft_nftCollectionId_idx" ON "nft"("nftCollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "nft_tokenId_nftCollectionId_key" ON "nft"("tokenId", "nftCollectionId");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_transactionHash_key" ON "transaction"("transactionHash");

-- CreateIndex
CREATE INDEX "transaction_makerId_idx" ON "transaction"("makerId");

-- CreateIndex
CREATE INDEX "myria_mystery_box_receiverId_idx" ON "myria_mystery_box"("receiverId");

-- CreateIndex
CREATE INDEX "myria_mystery_box_nftCollectionId_idx" ON "myria_mystery_box"("nftCollectionId");

-- CreateIndex
CREATE INDEX "myria_mystery_box_tokenId_idx" ON "myria_mystery_box"("tokenId");

-- CreateIndex
CREATE INDEX "myria_mystery_box_mintedNftId_idx" ON "myria_mystery_box"("mintedNftId");

-- CreateIndex
CREATE UNIQUE INDEX "myria_mystery_box_nftCollectionId_tokenId_key" ON "myria_mystery_box"("nftCollectionId", "tokenId");

-- AddForeignKey
ALTER TABLE "nft_metadata" ADD CONSTRAINT "nft_metadata_baseNftMetadataId_fkey" FOREIGN KEY ("baseNftMetadataId") REFERENCES "base_nft_metadata"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_nft_metadata" ADD CONSTRAINT "base_nft_metadata_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "nft_collection"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft" ADD CONSTRAINT "nft_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "nft_metadata"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft" ADD CONSTRAINT "nft_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nft" ADD CONSTRAINT "nft_nftCollectionId_fkey" FOREIGN KEY ("nftCollectionId") REFERENCES "nft_collection"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_makerId_fkey" FOREIGN KEY ("makerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts_transactions" ADD CONSTRAINT "nfts_transactions_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts_transactions" ADD CONSTRAINT "nfts_transactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "myria_mystery_box" ADD CONSTRAINT "myria_mystery_box_nftMetadataId_fkey" FOREIGN KEY ("nftMetadataId") REFERENCES "nft_metadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "myria_mystery_box" ADD CONSTRAINT "myria_mystery_box_nftCollectionId_fkey" FOREIGN KEY ("nftCollectionId") REFERENCES "nft_collection"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "myria_mystery_box" ADD CONSTRAINT "myria_mystery_box_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "myria_mystery_box" ADD CONSTRAINT "myria_mystery_box_mintedNftId_fkey" FOREIGN KEY ("mintedNftId") REFERENCES "nft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
