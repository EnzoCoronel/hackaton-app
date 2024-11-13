import { prisma } from "../lib/prisma";

async function main() {
  await prisma.business.deleteMany();
  await prisma.business.createMany({
    data: [
      {
        id: "8ea9dcf9-e413-4d60-a65f-505c26cecd17",
        name: "Sorvete Gelado",
        logo: "https://www.designi.com.br/images/preview/10425424.jpg",
        description: "Sorvete mais gostoso da região",
        city: "Charqueadas",
        position: "-29.9547025, -51.6243934",
      },
      {
        id: "6fde4fb9-a5d8-4050-b969-d642002d48fa",
        name: "Ateliê Gráfico",
        logo: "https://scontent.fpoa33-2.fna.fbcdn.net/v/t39.30808-1/300672401_530044555564677_5340190607726412077_n.jpg?stp=dst-jpg_s480x480&_nc_cat=103&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=a8QYBt9G1zYQ7kNvgGN3rVu&_nc_zt=24&_nc_ht=scontent.fpoa33-2.fna&_nc_gid=Ay5TI914ZYvIOt0mISnyrRc&oh=00_AYBN_jsSqHAbyeClzuYmXcFIeaVOOrTCgZDSMVItr8_ZcA&oe=6739F1BC",
        description: "Xerox e impressões no melhor preço",
        city: "Charqueadas",
        position: "-29.9545642, -51.6238718",
      },
      {
        id: "15bff3c3-2166-4e32-a422-dd12896ed59c",
        name: "Coffee Shop",
        logo: "https://t4.ftcdn.net/jpg/04/83/16/09/360_F_483160952_bYB2DOjUdsuB33gTXodCnnn8qDMxtSkl.jpg",
        description: "Café mais gostoso da região",
        city: "Charqueadas",
        position: "-29.9547831, -51.6248894",
      },
      {
        id: "f40992b5-933d-4655-9fa2-7bf52f7d0e5a",
        name: "Henrique Lopes Lanches",
        logo: "https://mir-s3-cdn-cf.behance.net/projects/404/5d28ed194318911.65fa27c78bb09.png",
        description: "Xerox e impressões no melhor preço",
        city: " São Jerônimo",
        position: "-29.964986, -51.7116455",
      },
      // Add more entries as needed
    ],
  });
  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
