import { PrismaClient } from '@prisma/client';
import { range, flatMap } from 'lodash';

const prisma = new PrismaClient();

enum Rank {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
}

enum WeaponType {
  PISTOL = 'PISTOL',
  MACHINE_GUN = 'MACHINE_GUN',
  SHOTGUN = 'SHOTGUN',
  RIFLE = 'RIFLE',
  MELEE = 'MELEE',
}

const WEAPON_TYPE_NAMES = {
  [WeaponType.PISTOL]: 'Pistol',
  [WeaponType.MACHINE_GUN]: 'MachineGun',
  [WeaponType.SHOTGUN]: 'Shotgun',
  [WeaponType.RIFLE]: 'Rifle',
  [WeaponType.MELEE]: 'Melee',
};

const WEAPON_BASE_METADATA = flatMap(
  Object.values(Rank).map((rank) => {
    return [
      {
        name: 'Colt Python',
        description: `The Colt Python is a powerful revolver that can be useful in a zombie-infested world due to its reliability and versatility. With its long barrel and accurate sights, it can be used to take out zombies from a distance, allowing the shooter to stay safe while still eliminating threats. The six-round capacity also ensures that the shooter can take out multiple zombies without having to reload frequently. Additionally, the Colt Python's sturdy construction makes it durable and able to withstand the wear and tear of an apocalyptic environment. Overall, the Colt Python can be a valuable asset for anyone trying to survive in a world overrun by zombies.`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/colt-python.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/colt-python.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.PISTOL],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'Glock 31',
        description: `The Glock 31 is a semi-automatic pistol that can be a reliable weapon in a zombie-infested world due to its high capacity and ease of use. With a magazine capacity of 15 rounds, it allows the shooter to take down multiple zombies without having to reload as frequently. The pistol's lightweight design and easy-to-use controls make it a good choice for those who may not have extensive firearms experience, allowing them to quickly and accurately engage targets. The Glock 31's polymer frame also makes it resistant to environmental factors such as moisture and rust, ensuring that it can withstand the harsh conditions of a post-apocalyptic world. Overall, the Glock 31 can be a valuable tool for anyone looking to defend themselves against the zombie hordes.`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/glock-31.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/glock-31.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.PISTOL],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'MP18',
        description: `The MP18 is a submachine gun that can be a valuable weapon in a zombie-infested world due to its portability and high rate of fire. Its compact design makes it easy to carry and maneuver in tight spaces, which can be especially useful in urban environments where zombies may be lurking around corners or in narrow alleys. The MP18's high rate of fire allows the shooter to quickly dispatch multiple zombies with a burst of bullets, which can be crucial when facing a large group of undead. Additionally, the weapon's relatively low recoil and ease of use make it a good choice for those with limited firearms experience. Overall, the MP18 can be a reliable and effective weapon in the fight against zombies.`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/mp18.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/mp18.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.MACHINE_GUN],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'M16',
        description: `The M16 is a versatile assault rifle that can be a powerful tool in a zombie-infested world due to its accuracy, range, and durability. With its long-range capabilities and accurate sights, it can be used to take out zombies from a distance, which can help keep the shooter safe while still being effective. The M16's magazine capacity of 20 rounds ensures that the shooter can engage multiple targets without having to reload as frequently. Additionally, the weapon's durability and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The M16 can also be customized with various attachments, such as scopes or grenade launchers, making it a versatile weapon that can adapt to a variety of situations`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/m16.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/m16.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.MACHINE_GUN],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'Benelli M4',
        description: `The Benelli M4 is a semi-automatic shotgun that can be a powerful and reliable weapon in a zombie-infested world due to its large magazine capacity and stopping power. Its magazine can hold up to 7 shells, allowing the shooter to engage multiple targets without having to reload frequently. The shotgun's powerful 12-gauge shells can also take down zombies with a single shot, which can be especially useful when facing larger or more heavily armored zombies. The Benelli M4's semi-automatic action also allows for a faster rate of fire than traditional pump-action shotguns, giving the shooter a better chance of survival in close-range combat situations. Additionally, the weapon's rugged construction and ability to handle a variety of ammunition make it a reliable choice for those who need a weapon that can withstand the rigors of a post-apocalyptic world`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/benelli-m4.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/benelli-m4.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.SHOTGUN],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'Saiga 20K',
        description: `The Saiga 20K is a semi-automatic shotgun that can be an effective weapon in a zombie-infested world due to its versatility and stopping power. With its magazine capacity of up to 10 shells, the shooter can engage multiple targets without having to reload as frequently. The shotgun's 20-gauge shells are also powerful enough to take down zombies with a single shot, while still being lightweight and easy to handle. The Saiga 20K's semi-automatic action allows for a faster rate of fire than traditional pump-action shotguns, giving the shooter a better chance of survival in close-range combat situations. Additionally, the weapon's rugged construction and ability to handle a variety of ammunition make it a reliable choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/saiga-20k.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/saiga-20k.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.SHOTGUN],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'K98',
        description: `The K98 is a bolt-action rifle that can be a reliable and accurate weapon in a zombie-infested world due to its precision and power. The rifle's long barrel and iron sights make it accurate at longer ranges, allowing the shooter to engage zombies from a distance and avoid close-range combat. The K98's bolt-action mechanism also ensures that each shot is precise and powerful, taking down zombies with a single shot to the head or torso. Additionally, the weapon's rugged construction and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The K98 can also be fitted with a bayonet, making it useful in close combat situations. Overall, the K98 can be a valuable tool for anyone looking to defend themselves against the zombie hordes, particularly those who prefer accuracy and precision over rate of fire.`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/k98.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/k98.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.RIFLE],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'M14',
        description: `The M14 is a versatile and reliable rifle that can be a useful weapon in a zombie-infested world due to its accuracy, power, and durability. With its long-range capabilities and accurate sights, it can be used to take out zombies from a distance, allowing the shooter to stay safe while still being effective. The M14's magazine capacity of 20 rounds also ensures that the shooter can engage multiple targets without having to reload frequently. Additionally, the weapon's durability and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The M14 can also be customized with various attachments, such as scopes or bayonets, making it a versatile weapon that can adapt to a variety of situations`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/m14.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/m14.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.RIFLE],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'Kukri',
        description: `The Kukri is a versatile machete-like weapon that can be a valuable tool in a zombie-infested world due to its chopping power and durability. With its heavy blade and curved shape, it can be used to quickly dispatch zombies at close range, making it especially useful in melee combat situations. The Kukri's shape also allows it to be used for a variety of tasks, such as chopping wood or preparing food, which can be important in a post-apocalyptic world where resources may be scarce. Additionally, the weapon's durable construction and ability to withstand the elements make it a good choice for those who need a reliable tool for survival.`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/kukri.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/kukri.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.MELEE],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
      {
        name: 'Tactical Tomahawk Axe',
        description: `The Tactical Tomahawk Axe is a versatile tool that can be useful in a zombie-infested world due to its chopping power and multi-functional design. With its sharp blade and durable construction, it can be used to quickly dispatch zombies at close range, making it a useful weapon in melee combat situations. The Tomahawk Axe can also be used for a variety of other tasks, such as breaching doors, chopping wood, or building shelter, which can be important for survival in a post-apocalyptic world. Additionally, some models of Tactical Tomahawk Axes come equipped with features such as pry bars, hammers, or even a compass, making them a versatile tool for a variety of situations`,
        animationUrl: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/videos/${rank.toLowerCase()}/tactical-tomahawk-axe.mp4`,
        image: `${
          process.env.S3_ORIGIN
        }/zone9-weapons/images/${rank.toLowerCase()}/tactical-tomahawk-axe.png`,
        attributes: [
          {
            trait_type: 'type',
            value: WEAPON_TYPE_NAMES[WeaponType.MELEE],
          },
          {
            trait_type: 'rank',
            value: rank,
          },
        ],
      },
    ];
  }),
).concat([
  {
    name: 'Draconian Colt Python',
    description: `The Colt Python is a powerful revolver that can be useful in a zombie-infested world due to its reliability and versatility. With its long barrel and accurate sights, it can be used to take out zombies from a distance, allowing the shooter to stay safe while still eliminating threats. The six-round capacity also ensures that the shooter can take out multiple zombies without having to reload frequently. Additionally, the Colt Python's sturdy construction makes it durable and able to withstand the wear and tear of an apocalyptic environment. Overall, the Colt Python can be a valuable asset for anyone trying to survive in a world overrun by zombies.`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-colt-python.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-colt-python.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.PISTOL],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Paragon Glock 31',
    description: `The Glock 31 is a semi-automatic pistol that can be a reliable weapon in a zombie-infested world due to its high capacity and ease of use. With a magazine capacity of 15 rounds, it allows the shooter to take down multiple zombies without having to reload as frequently. The pistol's lightweight design and easy-to-use controls make it a good choice for those who may not have extensive firearms experience, allowing them to quickly and accurately engage targets. The Glock 31's polymer frame also makes it resistant to environmental factors such as moisture and rust, ensuring that it can withstand the harsh conditions of a post-apocalyptic world. Overall, the Glock 31 can be a valuable tool for anyone looking to defend themselves against the zombie hordes.`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/paragon-glock-31.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/paragon-glock-31.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.PISTOL],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Draconian MP18',
    description: `The MP18 is a submachine gun that can be a valuable weapon in a zombie-infested world due to its portability and high rate of fire. Its compact design makes it easy to carry and maneuver in tight spaces, which can be especially useful in urban environments where zombies may be lurking around corners or in narrow alleys. The MP18's high rate of fire allows the shooter to quickly dispatch multiple zombies with a burst of bullets, which can be crucial when facing a large group of undead. Additionally, the weapon's relatively low recoil and ease of use make it a good choice for those with limited firearms experience. Overall, the MP18 can be a reliable and effective weapon in the fight against zombies.`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-mp18.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-mp18.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.MACHINE_GUN],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Draconian M16',
    description: `The M16 is a versatile assault rifle that can be a powerful tool in a zombie-infested world due to its accuracy, range, and durability. With its long-range capabilities and accurate sights, it can be used to take out zombies from a distance, which can help keep the shooter safe while still being effective. The M16's magazine capacity of 20 rounds ensures that the shooter can engage multiple targets without having to reload as frequently. Additionally, the weapon's durability and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The M16 can also be customized with various attachments, such as scopes or grenade launchers, making it a versatile weapon that can adapt to a variety of situations`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-m16.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-m16.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.MACHINE_GUN],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Flame Skull Benelli',
    description: `The Benelli M4 is a semi-automatic shotgun that can be a powerful and reliable weapon in a zombie-infested world due to its large magazine capacity and stopping power. Its magazine can hold up to 7 shells, allowing the shooter to engage multiple targets without having to reload frequently. The shotgun's powerful 12-gauge shells can also take down zombies with a single shot, which can be especially useful when facing larger or more heavily armored zombies. The Benelli M4's semi-automatic action also allows for a faster rate of fire than traditional pump-action shotguns, giving the shooter a better chance of survival in close-range combat situations. Additionally, the weapon's rugged construction and ability to handle a variety of ammunition make it a reliable choice for those who need a weapon that can withstand the rigors of a post-apocalyptic world`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/flame-skull-benelli.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/flame-skull-benelli.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.SHOTGUN],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Draconian Saiga 20K',
    description: `The Saiga 20K is a semi-automatic shotgun that can be an effective weapon in a zombie-infested world due to its versatility and stopping power. With its magazine capacity of up to 10 shells, the shooter can engage multiple targets without having to reload as frequently. The shotgun's 20-gauge shells are also powerful enough to take down zombies with a single shot, while still being lightweight and easy to handle. The Saiga 20K's semi-automatic action allows for a faster rate of fire than traditional pump-action shotguns, giving the shooter a better chance of survival in close-range combat situations. Additionally, the weapon's rugged construction and ability to handle a variety of ammunition make it a reliable choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-saiga-20k.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-saiga-20k.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.SHOTGUN],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Draconian K98',
    description: `The K98 is a bolt-action rifle that can be a reliable and accurate weapon in a zombie-infested world due to its precision and power. The rifle's long barrel and iron sights make it accurate at longer ranges, allowing the shooter to engage zombies from a distance and avoid close-range combat. The K98's bolt-action mechanism also ensures that each shot is precise and powerful, taking down zombies with a single shot to the head or torso. Additionally, the weapon's rugged construction and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The K98 can also be fitted with a bayonet, making it useful in close combat situations. Overall, the K98 can be a valuable tool for anyone looking to defend themselves against the zombie hordes, particularly those who prefer accuracy and precision over rate of fire.`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-k98.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-k98.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.RIFLE],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Draconian M14',
    description: `The M14 is a versatile and reliable rifle that can be a useful weapon in a zombie-infested world due to its accuracy, power, and durability. With its long-range capabilities and accurate sights, it can be used to take out zombies from a distance, allowing the shooter to stay safe while still being effective. The M14's magazine capacity of 20 rounds also ensures that the shooter can engage multiple targets without having to reload frequently. Additionally, the weapon's durability and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The M14 can also be customized with various attachments, such as scopes or bayonets, making it a versatile weapon that can adapt to a variety of situations`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-m14.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-m14.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.RIFLE],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Paragon Kukri',
    description: `The Kukri is a versatile machete-like weapon that can be a valuable tool in a zombie-infested world due to its chopping power and durability. With its heavy blade and curved shape, it can be used to quickly dispatch zombies at close range, making it especially useful in melee combat situations. The Kukri's shape also allows it to be used for a variety of tasks, such as chopping wood or preparing food, which can be important in a post-apocalyptic world where resources may be scarce. Additionally, the weapon's durable construction and ability to withstand the elements make it a good choice for those who need a reliable tool for survival.`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/paragon-kukri.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/paragon-kukri.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.MELEE],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
  {
    name: 'Draconian Tomahawk Axe',
    description: `The Tactical Tomahawk Axe is a versatile tool that can be useful in a zombie-infested world due to its chopping power and multi-functional design. With its sharp blade and durable construction, it can be used to quickly dispatch zombies at close range, making it a useful weapon in melee combat situations. The Tomahawk Axe can also be used for a variety of other tasks, such as breaching doors, chopping wood, or building shelter, which can be important for survival in a post-apocalyptic world. Additionally, some models of Tactical Tomahawk Axes come equipped with features such as pry bars, hammers, or even a compass, making them a versatile tool for a variety of situations`,
    animationUrl: `${process.env.S3_ORIGIN}/zone9-weapons/videos/legend/draconian-tomahawk-axe.mp4`,
    image: `${process.env.S3_ORIGIN}/zone9-weapons/images/legend/draconian-tomahawk-axe.png`,
    attributes: [
      {
        trait_type: 'type',
        value: WEAPON_TYPE_NAMES[WeaponType.MELEE],
      },
      {
        trait_type: 'rank',
        value: 'legend',
      },
    ],
  },
]);

async function main() {
  const mysterBoxCollection = await prisma.nftCollection.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mystery Box',
      contractAddress: process.env.MYSTERY_BOX_ADDRESS,
    },
  });
  const mysteryBoxBaseMetadata = await prisma.baseNftMetadata.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mystery Box',
      image: `${process.env.S3_ORIGIN}/mystery-box/mystery-box.png`,
      description:
        "This box is a gift from The Great Capital of Heaven, humanity's last fortress in Zone 9 Survival's zombie-infested world. Appreciating the esteem survivors fighting on the front line with their lives, Heaven decided to reinforce them with a batch of high quality weapons that can hardly be find anywhere else across nine zones.",
      animationUrl: `${process.env.S3_ORIGIN}/mystery-box/mystery-box.mp4`,
      collectionId: mysterBoxCollection.id,
    },
  });
  const metadata = await prisma.nftMetadata.createMany({
    data: range(1000).map((index) => ({
      name: `Mystery Box #${index}`,
      externalUrl: `${process.env.APP_ORIGIN}/mystery-box/${index}`,
      baseNftMetadataId: mysteryBoxBaseMetadata.id,
      unlocked: true,
    })),
  });
  const myriaMysteryBox = await prisma.myriaMysteryBox.createMany({
    data: range(1000).map((index) => ({
      nftCollectionId: mysterBoxCollection.id,
      nftMetadataId: index + 1,
      tokenId: index,
    })),
  });

  const weaponCollection = await prisma.nftCollection.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Zone9 Weapon',
      contractAddress: process.env.WEAPON_CONTRACT_ADDRESS,
    },
  });

  let id = 2;
  for (const metadata of WEAPON_BASE_METADATA) {
    await prisma.baseNftMetadata.upsert({
      where: { id },
      update: {},
      create: {
        ...metadata,
        collectionId: weaponCollection.id,
      },
    });

    id++;
  }

  console.log({
    mysterBoxCollection,
    mysteryBoxBaseMetadata,
    metadata,
    myriaMysteryBox,
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
