const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Start mocking data...");

  await prisma.costCenters.deleteMany({});
  const costCenters = [{ id: "10000", name: "Gia đình ở Sài Gòn" }, { id: "10100", name: "Gia đình ở Tiền Giang" }, { id: "11000", name: "Giao tế" }];
  await prisma.costCenters.createMany({
    data: costCenters,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
