-- CreateTable
CREATE TABLE "Pessoas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(255) NOT NULL,
    "sobre" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" SERIAL NOT NULL,
    "empresa" VARCHAR(255),
    "cargo" VARCHAR(255),
    "descricao" TEXT,
    "inicio" VARCHAR(255),
    "fim" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "pessoaId" INTEGER,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formacaos" (
    "id" SERIAL NOT NULL,
    "instituicao" VARCHAR(255),
    "curso" VARCHAR(255),
    "inicio" VARCHAR(255),
    "fim" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "pessoaId" INTEGER,

    CONSTRAINT "Formacaos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidades" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "pessoaId" INTEGER,

    CONSTRAINT "Habilidades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_email_key" ON "Pessoas"("email");

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formacaos" ADD CONSTRAINT "Formacaos_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habilidades" ADD CONSTRAINT "Habilidades_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
