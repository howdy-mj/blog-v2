const metaData = {
  title: 'Title',
  name: 'Your name',
  description: 'Write your description',
  language: 'en',
  siteUrl: 'https://your-blog.vercel.app', // Deployed site url
  socialBanner: '', // Open Graph image
  logoImage: '/images/logo.png',
  email: '',
  sns: {
    // Only ID
    github: 'howdy-mj',
    linkedin: '',
    twitter: '',
    facebook: '',
    youtube: '',
  },
  gaId: '', // Google Analytics ID, e.g. G-XXXX
  comment: {
    utterances: {
      // https://utteranc.es/
      repo: 'howdy-mj/howdy-nextjs-starter', // e.g. {github ID}/{repo name}
    },
  },
  isActive: {
    // Activate or deactivate your page
    personalInformation: true,
    snippets: true,
    about: true,
  },
  postsPerPage: 5, // Posts pagination count
};

export default metaData;
