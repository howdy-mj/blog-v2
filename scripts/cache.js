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

const dateSortDesc = (a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

const parseStringToDate = (date) => {
  if (date === undefined) {
    return new Date();
  }
  return new Date(date);
};

const sortByDate = (files) => {
  return files.sort((prev, next) => {
    return dateSortDesc(
      parseStringToDate(prev.frontMatter.date),
      parseStringToDate(next.frontMatter.date)
    );
  });
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

  const sortedPosts = sortByDate(allPosts);

  return `export const posts = ${JSON.stringify(sortedPosts)}`;
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
