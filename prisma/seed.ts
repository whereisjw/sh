/* import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

async function main() {
  let arr = new Array(500).fill(5).forEach(async (v) => {
    const stream = await prisma.stream.create({
      data: {
        name: String(v),
        description: String(v),
        price: v,
        user: {
          connect: {
            id: 1,
          }, 
        },
      },
    });
  });
}

main().catch((e) => console.log(e)); */
