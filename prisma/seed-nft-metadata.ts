import { PrismaClient } from '@prisma/client';
import { range } from 'lodash';

const prisma = new PrismaClient();

async function main() {
  const eventType = `OPEN_MYSTERY_BOX:${process.env.MYSTERY_BOX_ADDRESS}`;
  console.log('Creating common zone9 weapon metadata');

  let start = 0;

  await [
    'Colt Python',
    'Glock 31',
    'MP18',
    'M16',
    'Benelli M4',
    'Saiga 20K',
    'K98',
    'M14',
    'Kukri',
    'Tactical Tomahawk Axe',
  ].map(async (name) => {
    const weaponMetadata = await prisma.baseNftMetadata.findFirst({
      where: {
        name,
        attributes: {
          array_contains: [
            {
              value: 'common',
              trait_type: 'rank',
            },
          ],
        },
      },
    });
    console.log(`Creating ${name}`);
    console.log('weaponMetadata', weaponMetadata);

    await prisma.nftMetadata.createMany({
      data: range(59).map((index) => ({
        name,
        externalUrl: `${process.env.APP_ORIGIN}/zone9-weapon/${index + start}`,
        baseNftMetadataId: weaponMetadata.id,
        eventType,
      })),
    });

    start += 59;
  });

  console.log('Creating uncommon zone9 weapon metadata');
  await [
    'Colt Python',
    'Glock 31',
    'MP18',
    'M16',
    'Benelli M4',
    'Saiga 20K',
    'K98',
    'M14',
    'Kukri',
    'Tactical Tomahawk Axe',
  ].map(async (name) => {
    const weaponMetadata = await prisma.baseNftMetadata.findFirst({
      where: {
        name,
        attributes: {
          array_contains: [
            {
              value: 'uncommon',
              trait_type: 'rank',
            },
          ],
        },
      },
    });
    console.log(`Creating ${name}`);
    console.log('weaponMetadata', weaponMetadata);

    await prisma.nftMetadata.createMany({
      data: range(28).map((index) => ({
        name,
        externalUrl: `${process.env.APP_ORIGIN}/zone9-weapon/${index + start}`,
        baseNftMetadataId: weaponMetadata.id,
        eventType,
      })),
    });

    start += 28;
  });

  console.log('Creating rare zone9 weapon metadata');
  await [
    'Colt Python',
    'Glock 31',
    'MP18',
    'M16',
    'Benelli M4',
    'Saiga 20K',
    'K98',
    'M14',
    'Kukri',
    'Tactical Tomahawk Axe',
  ].map(async (name) => {
    const weaponMetadata = await prisma.baseNftMetadata.findFirst({
      where: {
        name,
        attributes: {
          array_contains: [
            {
              value: 'rare',
              trait_type: 'rank',
            },
          ],
        },
      },
    });
    console.log(`Creating ${name}`);
    console.log('weaponMetadata', weaponMetadata);

    await prisma.nftMetadata.createMany({
      data: range(12).map((index) => ({
        name,
        externalUrl: `${process.env.APP_ORIGIN}/zone9-weapon/${index + start}`,
        baseNftMetadataId: weaponMetadata.id,
        eventType,
      })),
    });

    start += 12;
  });

  console.log('Creating epic zone9 weapon metadata');
  await [
    'Colt Python',
    'Glock 31',
    'MP18',
    'M16',
    'Benelli M4',
    'Saiga 20K',
    'K98',
    'M14',
    'Kukri',
    'Tactical Tomahawk Axe',
  ].map(async (name) => {
    const weaponMetadata = await prisma.baseNftMetadata.findFirst({
      where: {
        name,
        attributes: {
          array_contains: [
            {
              value: 'epic',
              trait_type: 'rank',
            },
          ],
        },
      },
    });
    console.log(`Creating ${name}`);
    console.log('weaponMetadata', weaponMetadata);

    await prisma.nftMetadata.createMany({
      data: range(1).map((index) => ({
        name,
        externalUrl: `${process.env.APP_ORIGIN}/zone9-weapon/${index + start}`,
        baseNftMetadataId: weaponMetadata.id,
        eventType,
      })),
    });

    start += 1;
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
