-- CreateTable
CREATE TABLE "Overview" (
    "id" SERIAL NOT NULL,
    "overview" JSONB,
    "careManagement" JSONB,
    "operationalMetrics" JSONB,

    CONSTRAINT "Overview_pkey" PRIMARY KEY ("id")
);
