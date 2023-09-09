import { TransactionService } from '@/myria/transaction.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BaseNftMetadata,
  MyriaMysteryBox,
  Nft,
  NftCollection,
  NftMetadata,
} from '@prisma/client';
import { verifyMessage } from 'ethers';
import { isNil, pick } from 'lodash';
import { MintService as MyriaMintService } from './../myria/mint.service';
import { MintMysteryBoxDto } from './dtos/mint-mystery-box.dto';
import { MintWeaponFromMysteryBoxDto } from './dtos/mint-weapon.dto';

const WHILITED_ADDRESSES = [
  '0xe24c7a330698f5c831aff325f6d06dc6b879c029',
  '0x71eBf1E56FbfD0De101Cd812882269D6FDeD9B1D',
  '0x8B45ba22b587711747400d8daBD3921Fc487d527',
  '0x1a1051c39652C0FF81A819DA4283871c3f076a3A',
  '0x62e4f15BE5D528A2A171dd209D8c920aAd8231b0',
  '0x675C6e70f93746800BcC9460b437c8B3Ba9Ba5b6',
  '0xF38abCAAB41C53c1Cbd49D7d4A0677dC19377011',
  '0x4Bb4BCfF5ac0c2140FaC3f0cC428291A905b4b72',
  '0xE35873DC36A24f0CE6E0CFdeDd2A11BB70eb05E2',
  '0x23E97e1Bd6D68f8239485Ce052B6eB34AFC0aAfc',
  '0x2136184d88f0e711f59098586511e60005404db8',
  '0x61B76D107f0C2B16318e4e976069F3d6a5F2Ab2b',
  '0x2f981943638f62e7e6803DB3244F587580C939FF',
  '0x7eb775838f8eBC554644F7B90971169126219ED7',
  '0x10944F987F878E6105a04798AF9663d377E73eA0',
  '0x1C3bED59B09f56c778b4bbA3c3A82e5E8d60eBfC',
  '0x1a6259fCF2d7DCFDd4CDA59C65765974fa0342F1',
  '0x821c8B5dBa9c1e8b3B17Bd4A3497Fa3b8AE8C626',
  '0x9845C48C7f21798Cf167f0D265111581884928d9',
  '0XF2D0AA955842371CFF4A02D227F4D0CE78BAE528',
  '0xcA133AeD74C5FE5bDd79f3b82f1C3e61618D9756',
  '0x6ead7554368E8b0e26DEA48EC522428CDe8Ebb27',
  '0xd24Ce0352204d026C1437BB603e47aE2A3005a2D',
  '0xB9CEb6886CEF8a913403b3Cf42D6C7651fd13EE2',
  '0xa361C417E36eD35fB9DCb5a83F8183F7879F9b9B',
  '0x328ed65D294078861475B7c4CaCad78af73D25a9',
  '0xC3f8A82e08E775F4858abB75E17815B0a5F840FB',
  '0x02525A5c75160fC4f6dDa5bC1AdC184150A2D91f',
  '0x97ca127444e95A1d1c1613D5267Bef760D587249',
  '0x7F1db0A1AAa450Fd293a1Ee4B816e12e50F7d4d1',
  '0x8C57d0e37EFE2eA8f96f9eD54666D73754772875',
  '0xDAeBF521d27F74C3059Aa96213B92DeD01133df1',
  '0xbF3a9aDb610d5A352566cded605a0977eBF0882C',
  '0x22D5063F45fB694111D630a07F154b1525003f2f',
  '0xe164a828F602F41E168139a90d9EcfA1814e28D2',
  '0x9cc05c7174d0E2ad859e215301dfB43A4baA8C72',
  '0xdE5560dAd1C642B0585B71d9B57254bC26707bbF',
  '0x82aC04943229388aD8e646A18F684403E7db1163',
  '0x96b7A0f9071Dd572A28eB41d6A789502A75a259D',
  '0x20f147Ec6F93424aF59702a416AF04c0a2c1F43D',
  '0xf951067CF5F2033f833c75bb5348B692C8D59BD8',
  '0x8005e8E6A19F7c086331859CdE90A15d91a0AB11',
  '0x0ba6414Abf1B34b47f575DB76FEfbC5b9e57CBE2',
  '0x19e0bbDE26b90Bce84B69E383B8aB659E6a55965',
  '0xa437edb5987318649C05386801135A0c0bfcB701',
  '0x072FdF708029b27dC2bb60d8752fF3Bc357D125A',
  '0xD6f2e9ffDA54234D360A96D40c073721Af82Fc80',
  '0x8167e1580a4918A1737dD1A614f3f48A0cf3A8b3',
  '0x7D8E0C223d22F89B83D6AaC405FC7ecEb370D980',
  '0xc5FD91F5b4804D253BcD0d58EBD453675bBe3348',
  '0x129efc12843b7441bb1c1fc5e2e2d785125bb21b',
  '0xc92451df50e568a731ce845b834943d44843c6e6',
  '0x11f81e892812c25491d450a83394a8aca578079f',
  '0x411d45e7d7454332faafd8e4444097d63c37fa52',
  '0x75fdead5e3e93520fe9eec3b9e03349c155075a9',
  '0x866bb4a022262b939ed40f4c0292426087862e63',
  '0x9bc22f11e70261823efdcebb25a4192696419613',
  '0x8e32ef716bd253efbd774abfc7c0f77797d8a142',
  '0xafb60df57edb1d513b390b62a476bfcb0422d5e8',
  '0x43fec7ff6e9f469442e1279b4b59c1a74ad63ac8',
  '0x01a89a548b60b0abe7d0cc7398ecadd37ff7af88',
  '0x0f47e8d8d235b5e54b71cd7166db799b72abcc9f',
  '0x1f8f04b6d22acf6fe167db7c99a5f7f6d912b613',
  '0x9b88b35f038ee424ec3e03093704b4c1289f56f3',
  '0x890c7f863882b594be7e8c535f56c989d50fe4c2',
  '0x016641a792754ded880e596aa254a2afc844ee05',
  '0xf9ea1a5a23952cf6e5dd946315fa7a433068123e',
  '0x4f5c262bab09a4777c477223aefcd895ec8dd2ed',
  '0xa83d5a255336429a08503c96417f89f70671c4d3',
  '0x41bfce161ef05f079c8fbbd7a370603259e529df',
  '0x22d7072aed411211d607eb4ac4e668efa8ee9ae6',
  '0x9ffd71927cfbed3e479b628f88b305598fb64398',
  '0x5e2631b1ae2de330aa5747e4079f023abea9c926',
  '0xda215c945ae5969437472d5a5d655dc4bf7e5cb8',
  '0xbd8393055922e6d5d7ed2b47bfd7e0d59798e777',
  '0x0d275b7f8093d414bd869a221bcb385ec3224ec7',
  '0xabc6ece465eb94179970ebaab6c180849deb7c17',
  '0x18e898ef6771205e56d4814e260d7510c0fe5490',
  '0x8e1d2df7c318ed776231fc56b7356b839e122f15',
  '0xe0950553af806b309826f0f0072b6ba62a1195f7',
  '0xde07e8505784846c7255197febda9d03e804c16f',
  '0x09809f5a793b05de3b6b6c4273e00f896de85306',
  '0xb921f2fda631795da1abe15e65bb8110a562b2c1',
  '0xbc658f944466b9e4df480a1bbe37103d8ecd6a18',
  '0xc2a705f817d375cab66de2e344dfe0b1562a60c7',
  '0x52ad8d5ac426dbbe1ef80cc420074ede8a06617b',
  '0x80a746972740cddfd2fec5f5925f14c4f86cd8ed',
  '0xf0da20420ad077691e1c032d8116178b8a24a7b0',
  '0xd298115d7569bad9bb8721d2ad9af396b111d34c',
  '0xa228431a96619ab359221111da90dbb240579541',
  '0x3f088c74de9c6474b6329a44d043b6e5d9e1f296',
  '0xf8258e849aff7616f8dcdc33414432691fd6ac14',
  '0xd1bd3044e7962912ac434585bac3d5f79497bf01',
  '0xf0c9d832e9c33ab078bcebe1353123a4b6879052',
  '0x22905000454034e856819e20d1802d6eee5389c0',
  '0x54e5358627d7a2d2d91e35a4eba70c12878334be',
  '0xf99ec56ed7e449c2994ed918c6cf72a89ca1c61e',
  '0xf8b933111f606ff8ab5f96313ca6cc552e0b79b9',
  '0x3549b38865208a40e6045975c937c9bcfaed7ee3',
  '0x68b47f6da7dee99c3f3ba765a8d0c79c92e952a2',
  '0xa23d85443e491cea0c54e42800048c9cae05d704',
  '0x74cb038e6ff99470a526e59154e50c9e6f7c879a',
  '0x50df34aa8efdfa2bd76be39ef553c3736b530803',
  '0xd0a891be2867e72f5a3d1e21adf6a866dffc4949',
  '0x36c0ff6746f566ed9c6bbdfceab6527c62ab2352',
  '0xdd5aac156db4d32e27ef8dc496d8a5e0d0a1269b',
  '0x8c55d78c55dad4032d7568d1013956f33d482131',
  '0x00b75448ba3a658ccee6ce9ef4cf3850cf2a43d6',
  '0x2669818828940fe96bfbf234472fe1ed76403dde',
  '0xab35a3136a39a486af2f38b8c370f25a208ddd5f',
  '0x03a6b4733d22f34adc1cf67247c899ce031a04d2',
  '0xd5301dfb54505e1f5350413e32cc4336fe631769',
  '0x64bf7ac7e0516cdafea675883011b723e10c50a0',
  '0xdfce4ef671e6d85ad97d3df89d45ed34ed399d9e',
  '0x0e25b374781f78e98d6807dbd7b55e4257f34b7d',
  '0x380d39d87c434958802ddd75ce940705c43aefbe',
  '0x3257e59825674b04e8c9460a1f0fcfe0f7b0dfa7',
  '0x5f1a3679c811ec23e6522c5cbddd839f0fe06ef7',
  '0xc56d450d5c7241536d972afe3f176d213d34b634',
  '0x0e07b317bc2da3731ba4848f43996d348183d23d',
  '0x13517406ae7e533be6eabc7250f0645c4b7c065e',
  '0xac24baaa66ab34f5f4a96a6dc3163876c064ed3d',
  '0x9d4a118c60e3b90e4b14cb945fb5eddf668129a6',
  '0xa17d708516a5aaf11441bd8353b8e7f082e0f46b',
  '0xd4428c6f3c49b40bdbf06f99ce194d95a84baa7b',
  '0x545c651ba318da8bc52ee8ae23867f883e5d5e66',
  '0x5529caba273e7f5f0bb64ad05bdd379149a11c23',
  '0xa07c8db6ec4d454d82cc524c7112dbf3f938ad70',
  '0x92a405927b0917f1b56cd2b3764abd4347202114',
  '0x5628f0361ca2d71228d7fa29ca53e60f96b73b90',
  '0x577088cc720d6ac3c4bce3dfbcdadd33367951af',
  '0xb7523894bcf96b65c6972f62c49daebe2b5400eb',
  '0x882b65f499933f8eb7e066335d137ef1b176d92d',
  '0xb88890de5bfeb82398176648c9922430c3054e0e',
  '0xe2c93ba7dac2c4319ed38e28d892377e79232b95',
  '0x6f1f137da1dbb8abd82d0dc082d98ee4f539e402',
  '0x5c722187ce9dc3b5bb6e83a4568ee88b9c7f7513',
  '0x182e6d9b22b9224177f0605937bbc6e92184bce8',
  '0x58aa2c23d75d14781bf1d328237b1826dc2299c9',
  '0xad85f938bac3cfd0a2f609133c97e1c59bcca353',
  '0xadfa4bbd8fb5654e9b9025014c635b51e14be0dc',
  '0xbd9dacc31320842f2d6c489cf32aa018fdd7fcbd',
  '0x16c49bd9a44aa381ceac520f38f413d8360f6140',
  '0x20951c681040e514e5915339e3bca860067d555b',
  '0xbc2bbb118279dbc39a63b4d35afe277ae1c32b7a',
  '0x3575c3ba96eb8ac4c3944f026c2e059efaf092a0',
  '0xd23a5b8a3b3a597531269963b8064746ee2b2679',
  '0x1baf94147811f2fed856e36d0927363ebf05121d',
  '0x9a476b61800d3b4e32e0698c780c7fd0cca8556f',
  '0x727c50a2d16dbf0f36f7bb17c94370c614888a31',
  '0xa9195021345037552b4923e495d36cdee141913f',
  '0xdb564f1788c60077069eca274c15fd5a7762c7fc',
  '0x62e5be4a54c201bc376b4ecbf3f44ebf1e5d417a',
  '0xe3dfaa3bcd2c139dde506c2969de59967a0aa994',
  '0xce1d50c5ac9cbb5a01e667c2a9ff217e94988144',
  '0xc7b95042082b0595532034e9bc7125be9305c21d',
  '0x3d5851f0c6da25d75d8dae988f1b797a4a67954e',
  '0x5aca5c34184807a4e3605475536b2480465c5bdb',
  '0xabd182682745db002858c81c02ca5954a99e5362',
  '0x4c7cd6c01d1a2a3d0a313fb6f6be87fecfe28e8b',
  '0x47199822299e48b266c5afdb56b1db5bc6c7dd29',
  '0x877f399f739bfc821b9cde5ee97bd13b7cc6f8c6',
  '0x1e10cd8ef9e8184cac4eeffaa942360a099441db',
  '0x946b594b550a85021c066ae002b469736075b153',
  '0x7fc8bf1fc3e71949db242a8e58d2e08b5fceb233',
  '0xce55277896e1804e40fbce2fe5a3321d6212582e',
  '0x4ef5744dee01e5472d842847a3bbe4c5dcde6908',
  '0x7a83b5024fc690af796fd46feed93e4cb37f1311',
  '0xd35e62c9e906c1656f6e35a7693b5e4a7e69ebd5',
  '0x924d0538d42620782e6e5d153b6d60f504a71ecd',
  '0x610d3423864fb79952d28a8ca597436f5cbced70',
  '0x9654d717aea91437a9a5b412eea18c0fdd0d6b73',
  '0x09c21ea6019cac9c662a491c6abed177a5d42de9',
  '0xa2c87794539896db431f2afb5e3b6bbad1a6b654',
  '0x38375f09ce8d4d6971d8049302717931b423aa9d',
  '0x78bb4371eaf2c232eee8ec6f97525a2cdacc2e5f',
  '0xb04c6e201ecead72208492c75e734f8f77ce974a',
  '0x9ab7b15caa76510ec37708c806a580e760c9e72a',
  '0x4824b98611ab07e0b76faf094b0e03afac167102',
  '0xeb9a9af554b59145642df02cf4e8fc0722cea831',
  '0x4c34ca10acec61812c4fddf4f3908e06af7039f1',
  '0xc7dc5984572cb6550331e92fa1ff506259559012',
  '0x8c1ef787eef0453d6328a7b9de297726139ceda9',
  '0xd2b0bc7e58f8b55473f6d9b89dfae2b40eaa359a',
  '0x55a20d124a306e60992867a44e6f36d6829280bc',
  '0x07c5d603c51308078ef273ebe866156c66953b19',
  '0x7c5fe2bb280f3e75ec4b913acc6abe5d52350715',
  '0xe358a74e3009b21551214b5881a1a56e399c2829',
  '0x5c4f1cc6a94131e49b14e4c06514ce3e06e94b37',
  '0xfac36f7a690310eb8653c5f54699be38fbdd15ca',
  '0xfc284bf2ef79ae85ba6b9a99e960e3802c9e2416',
  '0xa121355082084471367a7f9649a0ea0a2938e3e7',
  '0xed288395d3b5b6f0f9b6e0f3336fbbe9375540c8',
  '0x4c1862a1e3c0cc2a131335bc730b8d2ec7402cf1',
  '0xc52e2bd6bc48822cc6fc5f6c95fff61cd0df4322',
  '0x23ec4ad755d70559c764eccb8eaca7336c153f50',
  '0xfc172ac87fd72532cb8041bc301da45d241f06a6',
  '0xe404410ebc65e506905fabe2dd424ed71d6e4282',
  '0x49e47d062492a159b43c86f0e6cfd050ba2982b7',
  '0x45deca7b6668f41f8f03a9c5e0c0012c526a3f87',
  '0x7ec292816f2aec4f3dfbde6f94892e6e07f1f113',
  '0x30ceff33e3e728f485efd410bcd218dce3025627',
  '0xd256de66f55f0cab0d07af65f2b533982d66636c',
  '0xacb0a36920ac2a9cc0e3a4be96b539e6342e4bb9',
  '0x3d5208e47524d15f320d3f1c704a7479c7e0f7b8',
  '0x585a717a9adb3ba87feedda445554191ba6d386b',
  '0xdb923013c781bb3a4a4e12b6be37a4b7ad2dce71',
  '0x83fc9a6bee54543da44efa22ab89eb1b9d8ad58f',
  '0x627fa74eaab808363daee43937283d467d055e60',
  '0xe354892d571ade82b6f89ae1129fd30e55e2086b',
  '0x9c47529a2d96b0f3e758a94b977be5cdc6a921bb',
  '0xe0ef92340134429f082c470e4836e47cc7611084',
  '0x981b2a52ddcb80a7511412c2e6b81cbc9e762820',
  '0x09f91a6ff35bd5e189cfe1bad8532791eecd6721',
  '0xa20d295102d749500352f536c4997a0db8d3065d',
  '0x6b924b9330b92cf80b20140a12b5dbc7f52fc2ab',
  '0x748b9664a81ea08a623ceb0b338ce7c743a4ac84',
  '0xdeaff1a3c1036ab2a7adc85beabd15f4219931e1',
  '0x382462f2a359d03b6b520d9322f5c3aa419e2340',
  '0x35ca5c36f774421087fe039fc6cb8f537facbe33',
  '0x5d9b82e6142fb452e3b94933b929ecfb9f79b08e',
  '0x17ef40af55360ba8c70f9c50faaeeeace04a4512',
  '0xebdc15684074e43e5ac1fffd722aaf917939da76',
  '0xb4a4df4ef64c6c31b66803ffb17b0ae4df0788ed',
  '0x69e7ca974cb9699777da4666cce4ff9b247af46a',
  '0xb0067d2c7eb46c3eb42753141cc42695d86a9d54',
  '0x3f81f7a2dd510f599f76288b58a9efe10b73390b',
  '0x8515c8ac2fc46ddacac5ae7a49388515532d38b0',
  '0x126529212d416513d4e2e608b9159011f26dbeca',
  '0x89e08bf9a745a72ef803d429206199588eb8d9e3',
  '0x28afa628795b4f7bf194148623d8e79c3804c0a9',
  '0x40514e8b1a9f3c6066b04d6d3e6e74a5f59c734f',
  '0xefdcc00ab784c7cc4888c680d12d3ea793314bbd',
  '0x6943a43f10110c3c1d8b32b3b74b79a0ba63d0cb',
  '0x1fcb035b346a9de0c4660ca9412b74cb24515c22',
  '0x6b60b4e4521dbf49823067388aa3b7466ebe39df',
  '0x79c0389ea6a22363ae68295c703269fe63093783',
  '0x4e7e33efdc41fbdc53ece419f957bb78cf4211f5',
  '0xa8262ef6d4ec28f4256c221487b5a0f254fb3ec1',
  '0x5ecfe233827cfa9ee3efb80628e6a491c6618ebc',
  '0x3e955fba5e10258c8ea33d9601c0c7a7e58f3bb3',
  '0x4d675c74dcf1e795e971adbd26c4263db55f0198',
  '0xafb2dc990f7db0cc7155fa1e2597adfa68edca0f',
  '0xb33b69e68c4691313736591cd3066ee23fa8da52',
  '0x1c34fe8bb65e3eac1a51040c48837a58439a6eaf',
  '0x540368fcdc07919df97064333219bc673f861cea',
  '0x4e1929d43c47d3331fc341f935c02386a1173e01',
  '0x037841ca2762ea30b5f0f893b3a89ac8e3c8bbd1',
  '0xc08bb4e2adabc382d699bb8a9c3c359139ccaf50',
  '0xf489f4ad3e6aa022ddf0bbc3d3e7478e782902a5',
  '0x5ca0fd7a1e6318e7ac8c4ef6e5077c5dd5173370',
  '0x26e51f17452700754c6ad475a5fa1356ab51bcc6',
  '0x643f17dc7460a7d924e25aeb0adabca7bc19e224',
  '0x3c6fa6e75369f59696b8bb851201ffecdfdcd4a6',
  '0xf5d5f6c248524a3f73b9f976864f16be3f9e46bd',
  '0xde78f50f886982e55adb902cd64c7bf2e3ed36f3',
  '0xa3d656ff652ddcbbe8898d20b937b47863c776e4',
  '0xc39d6c4d0cd984cb8cd351d54149bde1d10cadcd',
  '0x80c24da3151b66d16b66dba57431965888d8eb19',
  '0x0d8e8e94ba773fe1321cbfaee945574f80def428',
  '0xfc62252c70c4f45202f245ff85aaa8bb105c0d9a',
  '0xcc2ce1f27b152920c9116d4e3378e7ab8e98aa48',
  '0x0c494ad10c3bffb88ebe030925c8c5a5cda1ac43',
  '0x2613ce1723db73f8d87558a64ec8b8d6255d1683',
  '0x628fec7a40d42f9c889fde204a04c18021b9bef6',
  '0x5e8817b1168a4cc1ce47145985e8de4a23071451',
  '0x90413fa89573e7930920f8547cadeb440f85036c',
  '0xf79747f763999b1db4a76d09d6ce514b9a95eeba',
  '0xe5d8da3609baf821efd53b844c51092db2738fd2',
  '0xb44bc3f346f5fd1cacd0dab593e220605752e7fc',
  '0xccaba21ff1f23515159c1351e36527e09a151860',
  '0x2079c3b8289f5ae3c25bbdd12aa283984b3592c0',
  '0xf042519426d9e7bc7082ee7d95645340e1de777a',
  '0x7496c8b627c400c50fe47d8e0777cc42b49f6896',
  '0x5327808d78c30e99b9bdf3068283fe4eae8fb184',
  '0x32e7a2ca03ac59f33cf70de2e8b088ade11e5d27',
  '0x69ff44891042cfbca9d96c18c5283969651edc79',
  '0xa6c9452bc20330992d3a723c020e73b4fef7b7fb',
  '0x66e59b764b6a0bc297cbe365eac7567fee51e7cb',
  '0x0f50511c9e3020a7244484bd31232dddfef9fa32',
  '0x991b5774808d251a2d0fe16315184c18a2c1fff8',
  '0xa388b5bc19220a36fda3d7c7d47e236206f6291a',
  '0x6569d1d53f53b2d2ba1d631a9205c8879cf32af7',
  '0xac15694450646b5ae4eb4db456f0dc27a5cb0847',
  '0x4cfc9b2f1e534cfa208f2f43891f2aa1764ec21a',
  '0x8e294f4f7f29c35dae89038d7aac319e965bcd94',
  '0xfd50d47d8eb868078948c3d20af563265baefb9d',
  '0x58a2b4edadc63ea30307a7716548510bc62e1ad3',
  '0x8286d3cd0edd28bba0a30c31b7c9b6284bc131dc',
  '0xa404d0a0727db9440a82d21f4408871ef81e6944',
];

@Injectable()
export class MintService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly myriaMintService: MyriaMintService,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

  async mintMysteryBox(mintMysteryBoxDto: MintMysteryBoxDto) {
    let address;
    let collection: NftCollection;
    let myriaNft: MyriaMysteryBox & {
      nftMetadata: NftMetadata & {
        baseNftMetadata: BaseNftMetadata;
      };
    };

    try {
      address = verifyMessage('Mint Mystery Box', mintMysteryBoxDto.signature);
    } catch (error) {
      console.log('error', error);

      throw new BadRequestException();
    }

    await this.prismaService.$transaction(async (tx) => {
      const receiver = await tx.user.upsert({
        where: {
          walletAddress: address,
        },
        update: {},
        create: {
          walletAddress: address,
        },
      });

      collection = await tx.nftCollection.findUnique({
        where: {
          contractAddress: this.configService.get('MYSTERY_BOX_ADDRESS'),
        },
      });

      if (
        !WHILITED_ADDRESSES.map((address) => address.toLowerCase()).includes(
          address.toLowerCase(),
        )
      ) {
        // throw new BadRequestException(`You are not whitelisted`);
      }

      const minted = await tx.myriaMysteryBox.count({
        where: {
          receiverId: receiver.id,
          nftCollectionId: collection.id,
        },
      });

      if (minted > this.configService.get('MAX_FREE_BOX_PER_WALLET')) {
        throw new BadRequestException(
          `You can only mint ${this.configService.get(
            'MAX_FREE_BOX_PER_WALLET',
          )} box`,
        );
      }

      myriaNft = await tx.myriaMysteryBox.findFirst({
        where: {
          receiverId: null,
          nftCollectionId: collection.id,
        },
        orderBy: {
          id: 'asc',
        },
        include: {
          nftMetadata: {
            include: {
              baseNftMetadata: true,
            },
          },
        },
      });

      if (!myriaNft) {
        throw new BadRequestException('Sold out!');
      }

      await tx.myriaMysteryBox.update({
        where: {
          id: myriaNft.id,
        },
        data: {
          receiverId: receiver.id,
        },
      });
    });

    const response: any = await this.myriaMintService.mintMysteryBox(
      myriaNft.tokenId.toString(),
      myriaNft.nftMetadata.baseNftMetadata.description,
    );

    await this.prismaService.myriaMysteryBox.update({
      where: {
        id: myriaNft.id,
      },
      data: {
        myriaId: response.asset.id,
      },
    });

    // const transferResponse = await this.transactionService.transfer(
    //   myriaNft.tokenId.toString(),
    //   collection.contractAddress,
    //   address,
    // );

    // return transferResponse;
  }

  async mintWeaponFromMysteryBox(
    mintWeaponFromMysteryBoxDto: MintWeaponFromMysteryBoxDto,
  ) {
    const groupReqId = `mint_weapon_from_mystery_box:${this.configService
      .get('MYSTERY_BOX_ADDRESS')
      .toLowerCase()}:${mintWeaponFromMysteryBoxDto.mysteryBoxTokenId}`;

    const response =
      await this.transactionService.getTransactionsByGroupRequestIDAndPartnerRefID(
        groupReqId,
        this.configService.get('PROJECT_ID'),
        {
          starkKey: mintWeaponFromMysteryBoxDto.starkKey,
        },
      );
    let nft: Nft & {
      metadata: NftMetadata & {
        baseNftMetadata: BaseNftMetadata;
      };
    };
    let weaponCollection: NftCollection;

    const tokenId = response?.data?.items?.[0]?.tokenId;

    if (!tokenId) {
      throw new BadRequestException();
    }

    if (mintWeaponFromMysteryBoxDto.mysteryBoxTokenId !== tokenId) {
      throw new BadRequestException();
    }

    await this.prismaService.$transaction(async (tx) => {
      const collection = await tx.nftCollection.findFirst({
        where: {
          contractAddress: this.configService.get('MYSTERY_BOX_ADDRESS'),
        },
      });
      weaponCollection = await tx.nftCollection.findFirst({
        where: {
          contractAddress: this.configService.get('WEAPON_CONTRACT_ADDRESS'),
        },
      });

      if (!collection || !weaponCollection) {
        throw new BadRequestException('Collection not found!');
      }

      const myriaMysteryBox = await tx.myriaMysteryBox.findFirst({
        where: {
          nftCollectionId: collection.id,
          tokenId: Number(tokenId),
        },
      });

      if (!myriaMysteryBox) {
        throw new BadRequestException('Box not found!');
      }

      if (myriaMysteryBox.mintedNftId) {
        throw new BadRequestException('Box opened!');
      }

      const randomMetadataId: [{ id: number }] = await tx.$queryRawUnsafe(
        `SELECT id FROM "nft_metadata" where "eventType" = 'OPEN_MYSTERY_BOX:${this.configService.get(
          'MYSTERY_BOX_ADDRESS',
        )}' and unlocked is false ORDER BY random() LIMIT 1`,
      );

      if (!randomMetadataId?.[0]?.id) {
        throw new BadRequestException('Maximum allocation!');
      }

      const owner = await this.userService.getOrCreateByWalletAddress(
        mintWeaponFromMysteryBoxDto.walletAddress,
        tx,
      );

      const latestNftId = await tx.nft.findFirst({
        where: {
          nftCollectionId: weaponCollection.id,
        },
        orderBy: {
          tokenId: 'desc',
        },
        take: 1,
        select: {
          id: true,
          tokenId: true,
        },
      });

      nft = await tx.nft.findFirst({
        where: {
          tokenId: 0,
          nftCollectionId: weaponCollection.id,
        },
        include: {
          metadata: {
            include: {
              baseNftMetadata: true,
            },
          },
        },
      });

      nft = await tx.nft.upsert({
        where: {
          tokenId_nftCollectionId: {
            tokenId: isNil(latestNftId?.tokenId) ? 0 : latestNftId.tokenId + 1,
            nftCollectionId: weaponCollection.id,
          },
        },
        update: {},
        create: {
          tokenId: isNil(latestNftId?.tokenId) ? 0 : latestNftId.tokenId + 1,
          nftCollectionId: weaponCollection.id,
          metadataId: randomMetadataId[0].id,
          ownerId: owner.id,
        },
        include: {
          metadata: {
            include: {
              baseNftMetadata: true,
            },
          },
        },
      });

      console.log('randomMetadataId', randomMetadataId);

      await tx.nftMetadata.update({
        where: {
          id: randomMetadataId[0].id,
        },
        data: {
          unlocked: true,
        },
      });

      await tx.myriaMysteryBox.update({
        where: {
          id: myriaMysteryBox.id,
        },
        data: {
          mintedNftId: nft.id,
        },
      });
    });

    try {
      await this.myriaMintService.mintWeapon(
        nft.tokenId.toString(),
        nft.metadata.baseNftMetadata.description,
      );

      // await this.transactionService.transferERC721Token(
      //   nft.tokenId.toString(),
      //   weaponCollection.contractAddress,
      //   mintWeaponFromMysteryBoxDto.starkKey,
      // );
    } catch (error) {
      console.log('Mint weapon from mystery box error: ', error);
    }

    return {
      tokenId: nft.tokenId.toString(),
      name: `${nft.metadata.name} #${nft.tokenId}`,
      ...pick(
        {
          ...nft.metadata.baseNftMetadata,
          ...nft.metadata,
        },
        ['image', 'animationUrl', 'description', 'attributes', 'externalUrl'],
      ),
    };
  }
}
