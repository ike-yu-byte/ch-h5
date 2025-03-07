// 获取生成邀请链接
/* 
{
    "token": "4305f2a9-6c7c-4866-9f08-d448e581e2b1",
    "lang": "hk"
}
*/
const getInviteInfoData = {
  code: 2,
  msg: 'success',
  time: '1736057272',
  data: {
    share_url: 'https://web3-usdt-defi.com/#/pages/index?code=R1LABJ',
  },
}
export const getInviteInfo = {
  url: '/user/getInviteInfo', // 接口
  method: 'post', // 请求类型
  timeout: 500, // 超时时间
  statusCode: 200,
  response: getInviteInfoData,
}

// 获取新闻列表
/* 
{
    "page": 0,
    "size": 5,
    "type": 2,
    "lang": "hk"
}
*/
const getNewsListData = {
  code: 1,
  msg: 'success',
  time: '1736064070',
  data: [
    {
      id: 2,
      icon: '/uploads/20230407/cb3859bf922becb0ab6dd769c91208c1.png',
      title: '谷歌選擇 Coinbase 使用加密貨幣進行雲支付，並將使用其託管工具',
      content:
        '<p><span style="color: #171717;">Google will start allowing a subset of customers to pay for cloud services with digital currencies early next year.</span></p>\r\n<p>&nbsp;</p>\r\n<p><span style="color: #171717;">In addition, Google said it would explore using Coinbase Prime, a service for storing and trading cryptocurrencies.</span></p>\r\n<p>&nbsp;</p>\r\n<p><span style="color: #171717;">Coinbase will move some of its applications to Google&rsquo;s cloud from Amazon Web Services.</span></p>\r\n<p>&nbsp;</p>\r\n<p>Google said Tuesday that it will rely on Coinbase to start letting some customers pay for cloud services with cryptocurrencies early in 2023, while Coinbase said it would draw on Google&rsquo;s cloud infrastructure.</p>\r\n<p>&nbsp;</p>\r\n<p>Coinbase shares rose as much as 8.4% in Tuesday&rsquo;s trading session</p>\r\n<p>&nbsp;</p>\r\n<p>The deal, announced at Google&rsquo;s Cloud Next conference, might succeed in luring cutting-edge companies to Google in a fierce, fast-growing market, where Google&rsquo;s top competitors do not currently permit clients to pay with digital currencies. The cloud business helps diversify Google parent Alphabet away from advertising, and it now accounts for 9% of revenue, up from less than 6% three years ago, as it is expanding more quickly than Alphabet as a whole.</p>\r\n<p>&nbsp;</p>\r\n<p>Coinbase, which generates a majority of its revenue from retail transactions, will move data-related applications to Google from the market-leading Amazon</p>\r\n<p>&nbsp;Web Services cloud, which Coinbase has relied on for years, said Jim Migdal, Coinbase&rsquo;s vice president of business development.</p>\r\n<p>&nbsp;</p>\r\n<p>The Google Cloud Platform infrastructure service will initially accept cryptocurrency payments from a handful of customers in the Web3 world who want to pay with cryptocurrency, thanks to an integration with the Coinbase Commerce service, said Amit Zavery, vice president and general manager and head of platform at Google Cloud, in an interview with CNBC. Web3 is a buzzword that has come to stand for decentralized and distributed internet services that can&rsquo;t be controlled by big internet outfits such as Facebook</p>\r\n<p>&nbsp;or Google.</p>\r\n<p>&nbsp;</p>\r\n<p>Over time, Google will allow many more customers to make payments with cryptocurrency, Zavery said. Coinbase Commerce supports 10 currencies, including Bitcoin, Bitcoin Cash, Dogecoin, Ethereum and Litecoin. Bitcoin, Dogecoin and Ethereum prices have all declined over 60% in the past year.</p>\r\n<p>&nbsp;</p>\r\n<p>Terms of the deal weren&rsquo;t disclosed. But like other Coinbase Commerce arrangements, Coinbase will earn a percentage of transactions that go through it, Migdal said.</p>\r\n<p>&nbsp;</p>\r\n<p>It wasn&rsquo;t a guarantee that Google would go with Coinbase for the payments portion of the deal. PayPal</p>\r\n<p>, for one, offers businesses a way to take payments with digital currencies. &ldquo;We did look at other companies for the cryptocurrency side of it,&rdquo; Zavery said. Ultimately, he said, Coinbase had the greatest capability.</p>\r\n<p>&nbsp;</p>\r\n<p>Google is also exploring how it can use Coinbase Prime, a service that securely stores organizations&rsquo; cryptocurrencies and allows them to execute trades. Zavery said Google will experiment and &ldquo;see how we can participate&rdquo; with managing cryptocurrency assets. Block</p>\r\n<p>&nbsp;(the payments company formerly known as Square), Coinbase, MicroStrategy</p>\r\n<p>&nbsp;and Tesla</p>\r\n<p>&nbsp;are among the companies that have added digital currencies to their balance sheets. That can be a risky endeavor. Coinbase announced a $377 million impairment charge tied to a decline in the value of its cryptocurrency holdings in August.</p>\r\n<p>&nbsp;</p>\r\n<p>Google had previously indicated in May that it was exploring the possibility of adding support for payments with digital currencies. Migdal said Coinbase had been in discussion with Google for months, with conversations about supporting commerce transactions, cloud usage and the Prime service all happening in parallel. &ldquo;We decided to bring them together,&rdquo; he said.</p>\r\n<p>&nbsp;</p>\r\n<p>Blockchain technologies such as nonfungible tokens, or NFTs, have become a bigger focus for Google&rsquo;s cloud division. Previously, Google&rsquo;s cloud chief, Thomas Kurian, has pushed for growth in major industries such as media and retail. This year it announced the formation of teams to drum up blockchain business and build tools that third-party developers can draw on to run blockchain applications.</p>',
      status: 1,
      ctime: '2023-04-01 19:38:50',
    },
    {
      id: 3,
      icon: '/uploads/20230407/c8bab2982eb6252ffa88bc32ee3a8ad2.png',
      title: 'Coinbase 重新設計移動錢包以添加 Dapp 瀏覽器',
      content:
        "<p><strong style=\"color: #262626;\">The changes may help boost activity and revenue on the crypto exchange as its fees come under pressure from rivals</strong></p>\r\n<p>&nbsp;</p>\r\n<p>Crypto exchange Coinbase (COIN) has redesigned its mobile wallet to add a browser that makes it easier for users to search for decentralized finance (DeFi) protocols, non-fungible tokens (NFTs) and games and transact on the company's system.</p>\r\n<p>&nbsp;</p>\r\n<p>The top decentralized apps (dapp) are suggested in the browser's homepage, allowing users to perform token swaps in a couple of clicks, according to a demo shared on Coinbase Wallet's Twitter account Tuesday. Many of the new features are already present in Coinbase's web browser extensions.</p>\r\n<p>&nbsp;</p>\r\n<p>Coinbase also extended its support for the Solana network, adding the facility to send, receive and store SOL and Solana program library (SPL) tokens. Users will no longer need separate wallet apps for multichain activity across DeFi, NFTs and so on.</p>\r\n<p>&nbsp;</p>\r\n<p>The Coinbase wallet will begin roll out today with more users getting access in the coming weeks, the company said in a release.</p>\r\n<p>&nbsp;</p>",
      status: 1,
      ctime: '2023-04-01 19:38:50',
    },
  ],
}
export const getNewsList = {
  url: '/index/getNewsList', // 接口
  method: 'post', // 请求类型
  timeout: 500, // 超时时间
  statusCode: 200,
  response: getNewsListData,
}
