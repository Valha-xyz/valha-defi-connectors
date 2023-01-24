import { Pools } from "../../../../utils/Pools";

const POOLS = [
  {
    name: "compound",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    ],
    pool_address: "0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56",
    investing_address: "0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56",
    staking_address: "0x7ca5b0a2910b33e9759dc7ddb0413949071d7575",
    boosting_address: "0x7ca5b0a2910b33e9759dc7ddb0413949071d7575",
    distributor_address: "0xa2b47e3d5c44877cca798226b7b8118f9bfb7a56",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "usdt",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x52ea46506b9cc5ef470c5bf89f17dc28bb35d85c",
    investing_address: "0x52ea46506b9cc5ef470c5bf89f17dc28bb35d85c",
    staking_address: "0xbc89cd85491d81c6ad2954e6d0362ee29fca8f53",
    boosting_address: "0xbc89cd85491d81c6ad2954e6d0362ee29fca8f53",
    distributor_address: "0x52ea46506b9cc5ef470c5bf89f17dc28bb35d85c",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "y",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0x0000000000085d4780b73119b644ae5ecd22b376",
    ],
    pool_address: "0x45f783cce6b7ff23b2ab2d70e416cdb7d6055f51",
    investing_address: "0x45f783cce6b7ff23b2ab2d70e416cdb7d6055f51",
    staking_address: "0xfa712ee4788c042e2b7bb55e6cb8ec569c4530c1",
    boosting_address: "0xfa712ee4788c042e2b7bb55e6cb8ec569c4530c1",
    distributor_address: "0x45f783cce6b7ff23b2ab2d70e416cdb7d6055f51",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "busd",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0x4fabb145d64652a948d72533023f6e7a623c7c53",
    ],
    pool_address: "0x79a8c46dea5ada233abaffd40f3a0a2b1e5a4f27",
    investing_address: "0x79a8c46dea5ada233abaffd40f3a0a2b1e5a4f27",
    staking_address: "0x69fb7c45726cfe2badee8317005d3f94be838840",
    boosting_address: "0x69fb7c45726cfe2badee8317005d3f94be838840",
    distributor_address: "0x79a8c46dea5ada233abaffd40f3a0a2b1e5a4f27",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "susd",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
    ],
    pool_address: "0xa5407eae9ba41422680e2e00537571bcc53efbfd",
    investing_address: "0xa5407eae9ba41422680e2e00537571bcc53efbfd",
    staking_address: "0xa90996896660decc6e997655e065b23788857849",
    boosting_address: "0xa90996896660decc6e997655e065b23788857849",
    distributor_address: "0xa5407eae9ba41422680e2e00537571bcc53efbfd",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "pax",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
    ],
    pool_address: "0x06364f10b501e868329afbc005b3492902d6c763",
    investing_address: "0x06364f10b501e868329afbc005b3492902d6c763",
    staking_address: "0x64e3c23bfc40722d3b649844055f1d51c1ac041d",
    boosting_address: "0x64e3c23bfc40722d3b649844055f1d51c1ac041d",
    distributor_address: "0x06364f10b501e868329afbc005b3492902d6c763",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "ren",
    chain: "ethereum",
    underlying_tokens: [
      "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    ],
    pool_address: "0x93054188d876f558f4a66b2ef1d97d16edf0895b",
    investing_address: "0x93054188d876f558f4a66b2ef1d97d16edf0895b",
    staking_address: "0xb1f2cdec61db658f091671f5f199635aef202cac",
    boosting_address: "0xb1f2cdec61db658f091671f5f199635aef202cac",
    distributor_address: "0x93054188d876f558f4a66b2ef1d97d16edf0895b",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "sbtc",
    chain: "ethereum",
    underlying_tokens: [
      "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    ],
    pool_address: "0x7fc77b5c7614e1533320ea6ddc2eb61fa00a9714",
    investing_address: "0x7fc77b5c7614e1533320ea6ddc2eb61fa00a9714",
    staking_address: "0x705350c4bcd35c9441419ddd5d2f097d7a55410f",
    boosting_address: "0x705350c4bcd35c9441419ddd5d2f097d7a55410f",
    distributor_address: "0x7fc77b5c7614e1533320ea6ddc2eb61fa00a9714",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "hbtc",
    chain: "ethereum",
    underlying_tokens: [
      "0x0316eb71485b0ab14103307bf65a021042c6d380",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    ],
    pool_address: "0x4ca9b3063ec5866a4b82e437059d2c43d1be596f",
    investing_address: "0x4ca9b3063ec5866a4b82e437059d2c43d1be596f",
    staking_address: "0x4c18e409dc8619bfb6a1cb56d114c3f592e0ae79",
    boosting_address: "0x4c18e409dc8619bfb6a1cb56d114c3f592e0ae79",
    distributor_address: "0x4ca9b3063ec5866a4b82e437059d2c43d1be596f",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "3pool",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    investing_address: "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    staking_address: "0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a",
    boosting_address: "0xbfcf63294ad7105dea65aa58f8ae5be2d9d0952a",
    distributor_address: "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "gusd",
    chain: "ethereum",
    underlying_tokens: [
      "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956",
    investing_address: "0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956",
    staking_address: "0xc5cfada84e902ad92dd40194f0883ad49639b023",
    boosting_address: "0xc5cfada84e902ad92dd40194f0883ad49639b023",
    distributor_address: "0x4f062658eaaf2c1ccf8c8e36d6824cdf41167956",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "husd",
    chain: "ethereum",
    underlying_tokens: [
      "0xdf574c24545e5ffecb9a659c229253d4111d87e1",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x3ef6a01a0f81d6046290f3e2a8c5b843e738e604",
    investing_address: "0x3ef6a01a0f81d6046290f3e2a8c5b843e738e604",
    staking_address: "0x0000000000000000000000000000000000000000",
    boosting_address: "0x0000000000000000000000000000000000000000",
    distributor_address: "0x3ef6a01a0f81d6046290f3e2a8c5b843e738e604",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "usdk",
    chain: "ethereum",
    underlying_tokens: [
      "0x1c48f86ae57291f7686349f12601910bd8d470bb",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x3e01dd8a5e1fb3481f0f589056b428fc308af0fb",
    investing_address: "0x3e01dd8a5e1fb3481f0f589056b428fc308af0fb",
    staking_address: "0xc2b1df84112619d190193e48148000e3990bf627",
    boosting_address: "0xc2b1df84112619d190193e48148000e3990bf627",
    distributor_address: "0x3e01dd8a5e1fb3481f0f589056b428fc308af0fb",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "usdn",
    chain: "ethereum",
    underlying_tokens: [
      "0x674c6ad92fd080e4004b2312b45f796a192d27a0",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x0f9cb53ebe405d49a0bbdbd291a65ff571bc83e1",
    investing_address: "0x0f9cb53ebe405d49a0bbdbd291a65ff571bc83e1",
    staking_address: "0x0000000000000000000000000000000000000000",
    boosting_address: "0x0000000000000000000000000000000000000000",
    distributor_address: "0x0f9cb53ebe405d49a0bbdbd291a65ff571bc83e1",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "musd",
    chain: "ethereum",
    underlying_tokens: [
      "0xe2f2a5c287993345a840db3b0845fbc70f5935a5",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x8474ddbe98f5aa3179b3b3f5942d724afcdec9f6",
    investing_address: "0x8474ddbe98f5aa3179b3b3f5942d724afcdec9f6",
    staking_address: "0x5f626c30ec1215f4edcc9982265e8b1f411d1352",
    boosting_address: "0x5f626c30ec1215f4edcc9982265e8b1f411d1352",
    distributor_address: "0x8474ddbe98f5aa3179b3b3f5942d724afcdec9f6",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "rsv",
    chain: "ethereum",
    underlying_tokens: [
      "0x196f4727526ea7fb1e17b2071b3d8eaa38486988",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xc18cc39da8b11da8c3541c598ee022258f9744da",
    investing_address: "0xc18cc39da8b11da8c3541c598ee022258f9744da",
    staking_address: "0x4dc4a289a8e33600d8bd4cf5f6313e43a37adec7",
    boosting_address: "0x4dc4a289a8e33600d8bd4cf5f6313e43a37adec7",
    distributor_address: "0xc18cc39da8b11da8c3541c598ee022258f9744da",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "tbtc",
    chain: "ethereum",
    underlying_tokens: [
      "0x8daebade922df735c38c80c7ebd708af50815faa",
      "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    ],
    pool_address: "0xc25099792e9349c7dd09759744ea681c7de2cb66",
    investing_address: "0xc25099792e9349c7dd09759744ea681c7de2cb66",
    staking_address: "0x0000000000000000000000000000000000000000",
    boosting_address: "0x0000000000000000000000000000000000000000",
    distributor_address: "0xc25099792e9349c7dd09759744ea681c7de2cb66",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "dusd",
    chain: "ethereum",
    underlying_tokens: [
      "0x5bc25f649fc4e26069ddf4cf4010f9f706c23831",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x8038c01a0390a8c547446a0b2c18fc9aefecc10c",
    investing_address: "0x8038c01a0390a8c547446a0b2c18fc9aefecc10c",
    staking_address: "0xaea6c312f4b3e04d752946d329693f7293bc2e6d",
    boosting_address: "0xaea6c312f4b3e04d752946d329693f7293bc2e6d",
    distributor_address: "0x8038c01a0390a8c547446a0b2c18fc9aefecc10c",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "pbtc",
    chain: "ethereum",
    underlying_tokens: [
      "0x5228a22e72ccc52d415ecfd199f99d0665e7733b",
      "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    ],
    pool_address: "0x7f55dde206dbad629c080068923b36fe9d6bdbef",
    investing_address: "0x7f55dde206dbad629c080068923b36fe9d6bdbef",
    staking_address: "0xd7d147c6bb90a718c3de8c0568f9b560c79fa416",
    boosting_address: "0xd7d147c6bb90a718c3de8c0568f9b560c79fa416",
    distributor_address: "0x7f55dde206dbad629c080068923b36fe9d6bdbef",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "bbtc",
    chain: "ethereum",
    underlying_tokens: [
      "0x9be89d2a4cd102d8fecc6bf9da793be995c22541",
      "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    ],
    pool_address: "0x071c661b4deefb59e2a3ddb20db036821eee8f4b",
    investing_address: "0x071c661b4deefb59e2a3ddb20db036821eee8f4b",
    staking_address: "0xdfc7adfa664b08767b735de28f9e84cd30492aee",
    boosting_address: "0xdfc7adfa664b08767b735de28f9e84cd30492aee",
    distributor_address: "0x071c661b4deefb59e2a3ddb20db036821eee8f4b",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "obtc",
    chain: "ethereum",
    underlying_tokens: [
      "0x8064d9ae6cdf087b1bcd5bdf3531bd5d8c537a68",
      "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    ],
    pool_address: "0xd81da8d904b52208541bade1bd6595d8a251f8dd",
    investing_address: "0xd81da8d904b52208541bade1bd6595d8a251f8dd",
    staking_address: "0x11137b10c210b579405c21a07489e28f3c040ab1",
    boosting_address: "0x11137b10c210b579405c21a07489e28f3c040ab1",
    distributor_address: "0xd81da8d904b52208541bade1bd6595d8a251f8dd",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "seth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb",
    ],
    pool_address: "0xc5424b857f758e906013f3555dad202e4bdb4567",
    investing_address: "0xc5424b857f758e906013f3555dad202e4bdb4567",
    staking_address: "0x3c0ffff15ea30c35d7a85b85c0782d6c94e1d238",
    boosting_address: "0x3c0ffff15ea30c35d7a85b85c0782d6c94e1d238",
    distributor_address: "0xc5424b857f758e906013f3555dad202e4bdb4567",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "eurs",
    chain: "ethereum",
    underlying_tokens: [
      "0xdb25f211ab05b1c97d595516f45794528a807ad8",
      "0xd71ecff9342a5ced620049e616c5035f1db98620",
    ],
    pool_address: "0x0ce6a5ff5217e38315f87032cf90686c96627caa",
    investing_address: "0x0ce6a5ff5217e38315f87032cf90686c96627caa",
    staking_address: "0x90bb609649e0451e5ad952683d64bd2d1f245840",
    boosting_address: "0x90bb609649e0451e5ad952683d64bd2d1f245840",
    distributor_address: "0x0ce6a5ff5217e38315f87032cf90686c96627caa",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "ust",
    chain: "ethereum",
    underlying_tokens: [
      "0xa47c8bf37f92abed4a126bda807a7b7498661acd",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x890f4e345b1daed0367a877a1612f86a1f86985f",
    investing_address: "0x890f4e345b1daed0367a877a1612f86a1f86985f",
    staking_address: "0x0000000000000000000000000000000000000000",
    boosting_address: "0x0000000000000000000000000000000000000000",
    distributor_address: "0x890f4e345b1daed0367a877a1612f86a1f86985f",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "aave",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xdebf20617708857ebe4f679508e7b7863a8a8eee",
    investing_address: "0xdebf20617708857ebe4f679508e7b7863a8a8eee",
    staking_address: "0xd662908ada2ea1916b3318327a97eb18ad588b5d",
    boosting_address: "0xd662908ada2ea1916b3318327a97eb18ad588b5d",
    distributor_address: "0xdebf20617708857ebe4f679508e7b7863a8a8eee",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "steth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
    ],
    pool_address: "0xdc24316b9ae028f1497c275eb9192a3ea0f67022",
    investing_address: "0xdc24316b9ae028f1497c275eb9192a3ea0f67022",
    staking_address: "0x182b723a58739a9c974cfdb385ceadb237453c28",
    boosting_address: "0x182b723a58739a9c974cfdb385ceadb237453c28",
    distributor_address: "0xdc24316b9ae028f1497c275eb9192a3ea0f67022",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "saave",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
    ],
    pool_address: "0xeb16ae0052ed37f479f7fe63849198df1765a733",
    investing_address: "0xeb16ae0052ed37f479f7fe63849198df1765a733",
    staking_address: "0x462253b8f74b72304c145db0e4eebd326b22ca39",
    boosting_address: "0x462253b8f74b72304c145db0e4eebd326b22ca39",
    distributor_address: "0xeb16ae0052ed37f479f7fe63849198df1765a733",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "ankreth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0xe95a203b1a91a908f9b9ce46459d101078c2c3cb",
    ],
    pool_address: "0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2",
    investing_address: "0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2",
    staking_address: "0x6d10ed2cf043e6fcf51a0e7b4c2af3fa06695707",
    boosting_address: "0x6d10ed2cf043e6fcf51a0e7b4c2af3fa06695707",
    distributor_address: "0xa96a65c051bf88b4095ee1f2451c2a9d43f53ae2",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "usdp",
    chain: "ethereum",
    underlying_tokens: [
      "0x1456688345527be1f37e9e627da0837d6f08c925",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x42d7025938bec20b69cbae5a77421082407f053a",
    investing_address: "0x42d7025938bec20b69cbae5a77421082407f053a",
    staking_address: "0x055be5ddb7a925bfef3417fc157f53ca77ca7222",
    boosting_address: "0x055be5ddb7a925bfef3417fc157f53ca77ca7222",
    distributor_address: "0x42d7025938bec20b69cbae5a77421082407f053a",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "ironbank",
    chain: "ethereum",
    underlying_tokens: [
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x2dded6da1bf5dbdf597c45fcfaa3194e53ecfeaf",
    investing_address: "0x2dded6da1bf5dbdf597c45fcfaa3194e53ecfeaf",
    staking_address: "0xf5194c3325202f456c95c1cf0ca36f8475c1949f",
    boosting_address: "0xf5194c3325202f456c95c1cf0ca36f8475c1949f",
    distributor_address: "0x2dded6da1bf5dbdf597c45fcfaa3194e53ecfeaf",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "link",
    chain: "ethereum",
    underlying_tokens: [
      "0x514910771af9ca656af840dff83e8264ecf986ca",
      "0xbbc455cb4f1b9e4bfc4b73970d360c8f032efee6",
    ],
    pool_address: "0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0",
    investing_address: "0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0",
    staking_address: "0xfd4d8a17df4c27c1dd245d153ccf4499e806c87d",
    boosting_address: "0xfd4d8a17df4c27c1dd245d153ccf4499e806c87d",
    distributor_address: "0xf178c0b5bb7e7abf4e12a4838c7b7c5ba2c623c0",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "tusd",
    chain: "ethereum",
    underlying_tokens: [
      "0x0000000000085d4780b73119b644ae5ecd22b376",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xecd5e75afb02efa118af914515d6521aabd189f1",
    investing_address: "0xecd5e75afb02efa118af914515d6521aabd189f1",
    staking_address: "0x359fd5d6417ae3d8d6497d9b2e7a890798262ba4",
    boosting_address: "0x359fd5d6417ae3d8d6497d9b2e7a890798262ba4",
    distributor_address: "0xecd5e75afb02efa118af914515d6521aabd189f1",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "frax",
    chain: "ethereum",
    underlying_tokens: [
      "0x853d955acef822db058eb8505911ed77f175b99e",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xd632f22692fac7611d2aa1c0d552930d43caed3b",
    investing_address: "0xd632f22692fac7611d2aa1c0d552930d43caed3b",
    staking_address: "0x72e158d38dbd50a483501c24f792bdaaa3e7d55c",
    boosting_address: "0x72e158d38dbd50a483501c24f792bdaaa3e7d55c",
    distributor_address: "0xd632f22692fac7611d2aa1c0d552930d43caed3b",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "lusd",
    chain: "ethereum",
    underlying_tokens: [
      "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca",
    investing_address: "0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca",
    staking_address: "0x9b8519a9a00100720ccdc8a120fbed319ca47a14",
    boosting_address: "0x9b8519a9a00100720ccdc8a120fbed319ca47a14",
    distributor_address: "0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "busdv2",
    chain: "ethereum",
    underlying_tokens: [
      "0x4fabb145d64652a948d72533023f6e7a623c7c53",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x4807862aa8b2bf68830e4c8dc86d0e9a998e085a",
    investing_address: "0x4807862aa8b2bf68830e4c8dc86d0e9a998e085a",
    staking_address: "0xd4b22fedca85e684919955061fdf353b9d38389b",
    boosting_address: "0xd4b22fedca85e684919955061fdf353b9d38389b",
    distributor_address: "0x4807862aa8b2bf68830e4c8dc86d0e9a998e085a",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "reth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593",
    ],
    pool_address: "0xf9440930043eb3997fc70e1339dbb11f341de7a8",
    investing_address: "0xf9440930043eb3997fc70e1339dbb11f341de7a8",
    staking_address: "0x824f13f1a2f29cfeea81154b46c0fc820677a637",
    boosting_address: "0x824f13f1a2f29cfeea81154b46c0fc820677a637",
    distributor_address: "0xf9440930043eb3997fc70e1339dbb11f341de7a8",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "alusd",
    chain: "ethereum",
    underlying_tokens: [
      "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c",
    investing_address: "0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c",
    staking_address: "0x9582c4adacb3bce56fea3e590f05c3ca2fb9c477",
    boosting_address: "0x9582c4adacb3bce56fea3e590f05c3ca2fb9c477",
    distributor_address: "0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "mim",
    chain: "ethereum",
    underlying_tokens: [
      "0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x5a6a4d54456819380173272a5e8e9b9904bdf41b",
    investing_address: "0x5a6a4d54456819380173272a5e8e9b9904bdf41b",
    staking_address: "0xd8b712d29381748db89c36bca0138d7c75866ddf",
    boosting_address: "0xd8b712d29381748db89c36bca0138d7c75866ddf",
    distributor_address: "0x5a6a4d54456819380173272a5e8e9b9904bdf41b",
    rewards_tokens: [undefined],
    metadata: {},
  },
  {
    name: "tricrypto2",
    chain: "ethereum",
    underlying_tokens: [
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    ],
    pool_address: "0xd51a44d3fae010294c616388b506acda1bfaae46",
    investing_address: "0xd51a44d3fae010294c616388b506acda1bfaae46",
    staking_address: "0xdefd8fdd20e0f34115c7018ccfb655796f6b2168",
    boosting_address: "0xdefd8fdd20e0f34115c7018ccfb655796f6b2168",
    distributor_address: "0xd51a44d3fae010294c616388b506acda1bfaae46",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "eurt",
    chain: "ethereum",
    underlying_tokens: [
      "0xc581b735a1688071a1746c968e0798d642ede491",
      "0xd71ecff9342a5ced620049e616c5035f1db98620",
    ],
    pool_address: "0xfd5db7463a3ab53fd211b4af195c5bccc1a03890",
    investing_address: "0xfd5db7463a3ab53fd211b4af195c5bccc1a03890",
    staking_address: "0xe8060ad8971450e624d5289a10017dd30f5da85f",
    boosting_address: "0xe8060ad8971450e624d5289a10017dd30f5da85f",
    distributor_address: "0xfd5db7463a3ab53fd211b4af195c5bccc1a03890",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "eurtusd",
    chain: "ethereum",
    underlying_tokens: [
      "0xc581b735a1688071a1746c968e0798d642ede491",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x9838eccc42659fa8aa7daf2ad134b53984c9427b",
    investing_address: "0x9838eccc42659fa8aa7daf2ad134b53984c9427b",
    staking_address: "0x4fd86ce7ecea88f7e0aa78dc12625996fb3a04bc",
    boosting_address: "0x4fd86ce7ecea88f7e0aa78dc12625996fb3a04bc",
    distributor_address: "0x9838eccc42659fa8aa7daf2ad134b53984c9427b",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "eursusd",
    chain: "ethereum",
    underlying_tokens: [
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdb25f211ab05b1c97d595516f45794528a807ad8",
    ],
    pool_address: "0x98a7f18d4e56cfe84e3d081b40001b3d5bd3eb8b",
    investing_address: "0x98a7f18d4e56cfe84e3d081b40001b3d5bd3eb8b",
    staking_address: "0x65ca7dc5cb661fc58de57b1e1af404649a27ad35",
    boosting_address: "0x65ca7dc5cb661fc58de57b1e1af404649a27ad35",
    distributor_address: "0x98a7f18d4e56cfe84e3d081b40001b3d5bd3eb8b",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "crveth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0xd533a949740bb3306d119cc777fa900ba034cd52",
    ],
    pool_address: "0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511",
    investing_address: "0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511",
    staking_address: "0x1cebdb0856dd985fae9b8fea2262469360b8a3a6",
    boosting_address: "0x1cebdb0856dd985fae9b8fea2262469360b8a3a6",
    distributor_address: "0x8301ae4fc9c624d1d396cbdaa1ed877821d7c511",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "rai",
    chain: "ethereum",
    underlying_tokens: [
      "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x618788357d0ebd8a37e763adab3bc575d54c2c7d",
    investing_address: "0x618788357d0ebd8a37e763adab3bc575d54c2c7d",
    staking_address: "0x66ec719045bbd62db5ebb11184c18237d3cc2e62",
    boosting_address: "0x66ec719045bbd62db5ebb11184c18237d3cc2e62",
    distributor_address: "0x618788357d0ebd8a37e763adab3bc575d54c2c7d",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "cvxeth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
    ],
    pool_address: "0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4",
    investing_address: "0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4",
    staking_address: "0x7e1444ba99dcdffe8fbdb42c02f0005d14f13be1",
    boosting_address: "0x7e1444ba99dcdffe8fbdb42c02f0005d14f13be1",
    distributor_address: "0xb576491f1e6e5e62f1d8f26062ee822b40b0e0d4",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "xautusd",
    chain: "ethereum",
    underlying_tokens: [
      "0x68749665ff8d2d112fa859aa293f07a622782f38",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xadcfcf9894335dc340f6cd182afa45999f45fc44",
    investing_address: "0xadcfcf9894335dc340f6cd182afa45999f45fc44",
    staking_address: "0x1b3e14157ed33f60668f2103bcd5db39a1573e5b",
    boosting_address: "0x1b3e14157ed33f60668f2103bcd5db39a1573e5b",
    distributor_address: "0xadcfcf9894335dc340f6cd182afa45999f45fc44",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "spelleth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0x090185f2135308bad17527004364ebcc2d37e5f6",
    ],
    pool_address: "0x98638facf9a3865cd033f36548713183f6996122",
    investing_address: "0x98638facf9a3865cd033f36548713183f6996122",
    staking_address: "0x08380a4999be1a958e2abba07968d703c7a3027c",
    boosting_address: "0x08380a4999be1a958e2abba07968d703c7a3027c",
    distributor_address: "0x98638facf9a3865cd033f36548713183f6996122",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "teth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0xcdf7028ceab81fa0c6971208e83fa7872994bee5",
    ],
    pool_address: "0x752ebeb79963cf0732e9c0fec72a49fd1defaeac",
    investing_address: "0x752ebeb79963cf0732e9c0fec72a49fd1defaeac",
    staking_address: "0x6070fbd4e608ee5391189e7205d70cc4a274c017",
    boosting_address: "0x6070fbd4e608ee5391189e7205d70cc4a274c017",
    distributor_address: "0x752ebeb79963cf0732e9c0fec72a49fd1defaeac",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "2pool",
    chain: "ethereum",
    underlying_tokens: [
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0x1005f7406f32a61bd760cfa14accd2737913d546",
    investing_address: "0x1005f7406f32a61bd760cfa14accd2737913d546",
    staking_address: "0x9f330db38caaae5b61b410e2f0aad63fff2109d8",
    boosting_address: "0x9f330db38caaae5b61b410e2f0aad63fff2109d8",
    distributor_address: "0x1005f7406f32a61bd760cfa14accd2737913d546",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "4pool",
    chain: "ethereum",
    underlying_tokens: [
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0xa693b19d2931d498c5b318df961919bb4aee87a5",
      "0x853d955acef822db058eb8505911ed77f175b99e",
    ],
    pool_address: "0x4e0915c88bc70750d68c481540f081fefaf22273",
    investing_address: "0x4e0915c88bc70750d68c481540f081fefaf22273",
    staking_address: "0x0000000000000000000000000000000000000000",
    boosting_address: "0x0000000000000000000000000000000000000000",
    distributor_address: "0x4e0915c88bc70750d68c481540f081fefaf22273",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "fraxusdc",
    chain: "ethereum",
    underlying_tokens: [
      "0x853d955acef822db058eb8505911ed77f175b99e",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    ],
    pool_address: "0xdcef968d416a41cdac0ed8702fac8128a64241a2",
    investing_address: "0xdcef968d416a41cdac0ed8702fac8128a64241a2",
    staking_address: "0xcfc25170633581bf896cb6cdee170e3e3aa59503",
    boosting_address: "0xcfc25170633581bf896cb6cdee170e3e3aa59503",
    distributor_address: "0xdcef968d416a41cdac0ed8702fac8128a64241a2",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "euroc",
    chain: "ethereum",
    underlying_tokens: [
      "0x1abaea1f7c830bd89acc67ec4af516284b1bc33c",
      "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    ],
    pool_address: "0xe84f5b1582ba325fdf9ce6b0c1f087ccfc924e54",
    investing_address: "0xe84f5b1582ba325fdf9ce6b0c1f087ccfc924e54",
    staking_address: "0x4329c8f09725c0e3b6884c1dab1771bce17934f9",
    boosting_address: "0x4329c8f09725c0e3b6884c1dab1771bce17934f9",
    distributor_address: "0xe84f5b1582ba325fdf9ce6b0c1f087ccfc924e54",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "frxeth",
    chain: "ethereum",
    underlying_tokens: [
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "0x5e8422345238f34275888049021821e8e08caa1f",
    ],
    pool_address: "0xa1f8a6807c402e4a15ef4eba36528a3fed24e577",
    investing_address: "0xa1f8a6807c402e4a15ef4eba36528a3fed24e577",
    staking_address: "0x2932a86df44fe8d2a706d8e9c5d51c24883423f5",
    boosting_address: "0x2932a86df44fe8d2a706d8e9c5d51c24883423f5",
    distributor_address: "0xa1f8a6807c402e4a15ef4eba36528a3fed24e577",
    rewards_tokens: [],
    metadata: {},
  },
  {
    name: "sbtc2",
    chain: "ethereum",
    underlying_tokens: [
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
    ],
    pool_address: "0xf253f83aca21aabd2a20553ae0bf7f65c755a07f",
    investing_address: "0xf253f83aca21aabd2a20553ae0bf7f65c755a07f",
    staking_address: "0x6d787113f23bed1d5e1530402b3f364d0a6e5af3",
    boosting_address: "0x6d787113f23bed1d5e1530402b3f364d0a6e5af3",
    distributor_address: "0xf253f83aca21aabd2a20553ae0bf7f65c755a07f",
    rewards_tokens: [],
    metadata: {},
  },
] as Pools[];

export async function pools() {
  return POOLS;
}
