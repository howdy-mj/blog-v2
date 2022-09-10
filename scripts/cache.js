const fs = require('fs');
const path = require('path');
const { sync } = require('glob');
const matter = require('gray-matter');

const getDirectoryPath = (dirName) => {
  return path.join(process.cwd(), 'content', dirName);
};

const getFileNameWithExtension = (dirName) => {
  const directoryPath = getDirectoryPath(dirName);
  const allFilesPath = sync(`${directoryPath}/**/*.md*`);

  const fileNameWithExtension = allFilesPath.reduce((prev, curr) => {
    const localPath = curr.split(`${directoryPath}/`)[1];
    return [localPath, ...prev];
  }, []);

  return { fileNameWithExtension };
};

const getContentWithFrontMatter = (dirName, filename) => {
  const directoryPath = getDirectoryPath(dirName);
  return fs.readFileSync(path.join(directoryPath, filename), 'utf-8');
};

function cachePosts() {
  const { fileNameWithExtension } = getFileNameWithExtension('posts');

  const allPosts = fileNameWithExtension.map((filename) => {
    const contentWithFrontMatter = getContentWithFrontMatter('posts', filename);
    const { data } = matter(contentWithFrontMatter);

    return {
      frontMatter: {
        ...data,
        draft: !(data.frontMatter?.draft === undefined || data.frontMatter.draft === false),
      },
      slug: filename.split('.')[0],
    };
  });

  return `export const posts = ${JSON.stringify(allPosts)}`;
}

try {
  fs.readdirSync('cache');
} catch (e) {
  fs.mkdirSync('cache');
}

fs.writeFile('cache/posts-data.js', cachePosts(), function (err) {
  if (err) return console.log(err);
  console.log('Posts cached.');
});
