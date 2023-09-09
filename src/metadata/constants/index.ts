export enum WeaponType {
  PISTOL = 'PISTOL',
  MACHINE_GUN = 'MACHINE_GUN',
  SHOTGUN = 'SHOTGUN',
  RIFLE = 'RIFLE',
  MELEE = 'MELEE',
}

export enum WeaponVariant {
  COLT_PYTHON = 'COLT_PYTHON',
  GLOCK_31 = 'GLOCK_31',
  MP18 = 'MP18',
  M16 = 'M16',
  BENELLI_M4 = 'BENELLI_M4',
  SAIGA_20K = 'SAIGA_20K',
  K98 = 'K98',
  M14 = 'M14',
  KU_KRI = 'KU_KRI',
  TACTICAL_TOMAHAWK_AXE = 'TACTICAL_TOMAHAWK_AXE',
}

export const WEAPON_TYPE_SLUGS = {
  [WeaponType.PISTOL]: 'pistol',
  [WeaponType.MACHINE_GUN]: 'machine-gun',
  [WeaponType.SHOTGUN]: 'shotgun',
  [WeaponType.RIFLE]: 'rifle',
  [WeaponType.MELEE]: 'melee',
} as const;

export const WEAPON_VARIANT_SLUGS = {
  [WeaponVariant.COLT_PYTHON]: 'colt-python',
  [WeaponVariant.GLOCK_31]: 'glock-31',
  [WeaponVariant.MP18]: 'mp18',
  [WeaponVariant.M16]: 'm16',
  [WeaponVariant.BENELLI_M4]: 'benelli-m4',
  [WeaponVariant.SAIGA_20K]: 'saiga-20k',
  [WeaponVariant.K98]: 'k98',
  [WeaponVariant.M14]: 'm14',
  [WeaponVariant.KU_KRI]: 'ku-kri',
  [WeaponVariant.TACTICAL_TOMAHAWK_AXE]: 'tactical-tomahawk-axe',
} as const;

export const WEAPON_TYPE_SLUG_MAP_WEAPON_VARIANT_SLUGS = {
  [WEAPON_TYPE_SLUGS[WeaponType.PISTOL]]: [
    WEAPON_VARIANT_SLUGS[WeaponVariant.COLT_PYTHON],
    WEAPON_VARIANT_SLUGS[WeaponVariant.GLOCK_31],
  ],
  [WEAPON_TYPE_SLUGS[WeaponType.MACHINE_GUN]]: [
    WEAPON_VARIANT_SLUGS[WeaponVariant.MP18],
    WEAPON_VARIANT_SLUGS[WeaponVariant.M16],
  ],
  [WEAPON_TYPE_SLUGS[WeaponType.SHOTGUN]]: [
    WEAPON_VARIANT_SLUGS[WeaponVariant.BENELLI_M4],
    WEAPON_VARIANT_SLUGS[WeaponVariant.SAIGA_20K],
  ],
  [WEAPON_TYPE_SLUGS[WeaponType.RIFLE]]: [
    WEAPON_VARIANT_SLUGS[WeaponVariant.K98],
    WEAPON_VARIANT_SLUGS[WeaponVariant.M14],
  ],
  [WEAPON_TYPE_SLUGS[WeaponType.MELEE]]: [
    WEAPON_VARIANT_SLUGS[WeaponVariant.KU_KRI],
    WEAPON_VARIANT_SLUGS[WeaponVariant.TACTICAL_TOMAHAWK_AXE],
  ],
} as const;

export const WEAPON_VARIANT_DESCRIPTIONS = {
  [WEAPON_TYPE_SLUGS[WeaponType.PISTOL]]: {
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.COLT_PYTHON
    ]]: `The Colt Python is a powerful revolver that can be useful in a zombie-infested world due to its reliability and versatility. With its long barrel and accurate sights, it can be used to take out zombies from a distance, allowing the shooter to stay safe while still eliminating threats. The six-round capacity also ensures that the shooter can take out multiple zombies without having to reload frequently. Additionally, the Colt Python's sturdy construction makes it durable and able to withstand the wear and tear of an apocalyptic environment. Overall, the Colt Python can be a valuable asset for anyone trying to survive in a world overrun by zombies.`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.GLOCK_31
    ]]: `The Glock 31 is a semi-automatic pistol that can be a reliable weapon in a zombie-infested world due to its high capacity and ease of use. With a magazine capacity of 15 rounds, it allows the shooter to take down multiple zombies without having to reload as frequently. The pistol's lightweight design and easy-to-use controls make it a good choice for those who may not have extensive firearms experience, allowing them to quickly and accurately engage targets. The Glock 31's polymer frame also makes it resistant to environmental factors such as moisture and rust, ensuring that it can withstand the harsh conditions of a post-apocalyptic world. Overall, the Glock 31 can be a valuable tool for anyone looking to defend themselves against the zombie hordes.`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.MACHINE_GUN]]: {
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.MP18
    ]]: `The MP18 is a submachine gun that can be a valuable weapon in a zombie-infested world due to its portability and high rate of fire. Its compact design makes it easy to carry and maneuver in tight spaces, which can be especially useful in urban environments where zombies may be lurking around corners or in narrow alleys. The MP18's high rate of fire allows the shooter to quickly dispatch multiple zombies with a burst of bullets, which can be crucial when facing a large group of undead. Additionally, the weapon's relatively low recoil and ease of use make it a good choice for those with limited firearms experience. Overall, the MP18 can be a reliable and effective weapon in the fight against zombies.`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.M16
    ]]: `The M16 is a versatile assault rifle that can be a powerful tool in a zombie-infested world due to its accuracy, range, and durability. With its long-range capabilities and accurate sights, it can be used to take out zombies from a distance, which can help keep the shooter safe while still being effective. The M16's magazine capacity of 20 rounds ensures that the shooter can engage multiple targets without having to reload as frequently. Additionally, the weapon's durability and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The M16 can also be customized with various attachments, such as scopes or grenade launchers, making it a versatile weapon that can adapt to a variety of situations`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.SHOTGUN]]: {
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.BENELLI_M4
    ]]: `The Benelli M4 is a semi-automatic shotgun that can be a powerful and reliable weapon in a zombie-infested world due to its large magazine capacity and stopping power. Its magazine can hold up to 7 shells, allowing the shooter to engage multiple targets without having to reload frequently. The shotgun's powerful 12-gauge shells can also take down zombies with a single shot, which can be especially useful when facing larger or more heavily armored zombies. The Benelli M4's semi-automatic action also allows for a faster rate of fire than traditional pump-action shotguns, giving the shooter a better chance of survival in close-range combat situations. Additionally, the weapon's rugged construction and ability to handle a variety of ammunition make it a reliable choice for those who need a weapon that can withstand the rigors of a post-apocalyptic world`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.SAIGA_20K
    ]]: `The Saiga 20K is a semi-automatic shotgun that can be an effective weapon in a zombie-infested world due to its versatility and stopping power. With its magazine capacity of up to 10 shells, the shooter can engage multiple targets without having to reload as frequently. The shotgun's 20-gauge shells are also powerful enough to take down zombies with a single shot, while still being lightweight and easy to handle. The Saiga 20K's semi-automatic action allows for a faster rate of fire than traditional pump-action shotguns, giving the shooter a better chance of survival in close-range combat situations. Additionally, the weapon's rugged construction and ability to handle a variety of ammunition make it a reliable choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.RIFLE]]: {
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.K98
    ]]: `The K98 is a bolt-action rifle that can be a reliable and accurate weapon in a zombie-infested world due to its precision and power. The rifle's long barrel and iron sights make it accurate at longer ranges, allowing the shooter to engage zombies from a distance and avoid close-range combat. The K98's bolt-action mechanism also ensures that each shot is precise and powerful, taking down zombies with a single shot to the head or torso. Additionally, the weapon's rugged construction and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The K98 can also be fitted with a bayonet, making it useful in close combat situations. Overall, the K98 can be a valuable tool for anyone looking to defend themselves against the zombie hordes, particularly those who prefer accuracy and precision over rate of fire.`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.M14
    ]]: `The M14 is a versatile and reliable rifle that can be a useful weapon in a zombie-infested world due to its accuracy, power, and durability. With its long-range capabilities and accurate sights, it can be used to take out zombies from a distance, allowing the shooter to stay safe while still being effective. The M14's magazine capacity of 20 rounds also ensures that the shooter can engage multiple targets without having to reload frequently. Additionally, the weapon's durability and reliability make it a good choice for those who need a weapon that can withstand the harsh conditions of a post-apocalyptic world. The M14 can also be customized with various attachments, such as scopes or bayonets, making it a versatile weapon that can adapt to a variety of situations`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.MELEE]]: {
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.KU_KRI
    ]]: `The KuKri is a versatile machete-like weapon that can be a valuable tool in a zombie-infested world due to its chopping power and durability. With its heavy blade and curved shape, it can be used to quickly dispatch zombies at close range, making it especially useful in melee combat situations. The Kukri's shape also allows it to be used for a variety of tasks, such as chopping wood or preparing food, which can be important in a post-apocalyptic world where resources may be scarce. Additionally, the weapon's durable construction and ability to withstand the elements make it a good choice for those who need a reliable tool for survival.`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.TACTICAL_TOMAHAWK_AXE
    ]]: `The Tactical Tomahawk Axe is a versatile tool that can be useful in a zombie-infested world due to its chopping power and multi-functional design. With its sharp blade and durable construction, it can be used to quickly dispatch zombies at close range, making it a useful weapon in melee combat situations. The Tomahawk Axe can also be used for a variety of other tasks, such as breaching doors, chopping wood, or building shelter, which can be important for survival in a post-apocalyptic world. Additionally, some models of Tactical Tomahawk Axes come equipped with features such as pry bars, hammers, or even a compass, making them a versatile tool for a variety of situations`,
  },
};

export const WEAPON_VARIANT_NAMES = {
  [WEAPON_TYPE_SLUGS[WeaponType.PISTOL]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.COLT_PYTHON]]: `Colt Python`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.GLOCK_31]]: `Glock 31`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.MACHINE_GUN]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.MP18]]: `MP18`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.M16]]: `M16`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.SHOTGUN]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.BENELLI_M4]]: `Benelli M4`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.SAIGA_20K]]: `Saiga 20K`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.RIFLE]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.K98]]: `K98`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.M14]]: `M14`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.MELEE]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.KU_KRI]]: `KuKri`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.TACTICAL_TOMAHAWK_AXE
    ]]: `Tactical Tomahawk Axe`,
  },
};

export const WEAPON_VARIANT_ATTRIBUTES = {
  [WEAPON_TYPE_SLUGS[WeaponType.PISTOL]]: [
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Weapon Type',
      value: 'Pistol',
    },
    {
      trait_type: 'Body Damage Per Hit',
      value: 40,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
    {
      trait_type: 'Level Required',
      value: 20,
    },
  ],
  [WEAPON_TYPE_SLUGS[WeaponType.MACHINE_GUN]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.MP18]]: `MP18`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.M16]]: `M16`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.SHOTGUN]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.BENELLI_M4]]: `Benelli M4`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.SAIGA_20K]]: `Saiga 20K`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.RIFLE]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.K98]]: `K98`,
    [WEAPON_VARIANT_SLUGS[WeaponVariant.M14]]: `M14`,
  },
  [WEAPON_TYPE_SLUGS[WeaponType.MELEE]]: {
    [WEAPON_VARIANT_SLUGS[WeaponVariant.KU_KRI]]: `KuKri`,
    [WEAPON_VARIANT_SLUGS[
      WeaponVariant.TACTICAL_TOMAHAWK_AXE
    ]]: `Tactical Tomahawk Axe`,
  },
};

export type WeaponTypeSlug = (typeof WEAPON_TYPE_SLUGS)[WeaponType];
export type WeaponVariantSlug = (typeof WEAPON_VARIANT_SLUGS)[WeaponVariant];
