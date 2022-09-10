import fs from 'fs';
import path from 'path';
import { sync } from 'glob';
import matter from 'gray-matter';
import { isProd } from '@constants/isProd';
import { sortByDate } from '@utils/sortByDate';
import { serialize } from 'next-mdx-remote/serialize';
// remark
import remarkGfm from 'remark-gfm';
import remarkCodeTitles from './remark/remark-code-title';
import remarkImgToJsx from './remark/remark-img-to-jsx';
import remarkMath from 'remark-math';
// rehype
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypeKatex from 'rehype-katex';

export type FrontMatter = {
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  thumbnailUrl?: string;
  draft?: boolean;
  lastMod?: string;
};

export type Content = {
  frontMatter: FrontMatter;
  slug: string;
};

const ROOT_PATH = process.cwd();
const CONTENT_PATH = path.join(ROOT_PATH, 'content');
type Directory = 'posts' | 'snippets' | 'about';

export const getDirectoryPath = (directory: Directory) => {
  return path.join(CONTENT_PATH, directory);
};

export const getFileNameWithExtension = (directory: Directory) => {
  const directoryPath = getDirectoryPath(directory);
  const allFilesPath = sync(`${directoryPath}/**/*.md*`);

  const fileNameWithExtension = allFilesPath.reduce((prev: string[], curr: string) => {
    const localPath = curr.split(`${directoryPath}/`)[1];
    return [localPath, ...prev];
  }, []);

  return fileNameWithExtension;
};

export const getContentWithFrontMatter = (directory: Directory, filename: string) => {
  const directoryPath = getDirectoryPath(directory);
  return fs.readFileSync(path.join(directoryPath, filename), 'utf-8');
};

export const filterDraftInProduction = (files: Content[]) => {
  return files.filter((file) => {
    if (isProd) {
      return !file.frontMatter.draft;
    }
    return true;
  });
};

export const getAllFiles = (directory: Directory) => {
  const fileNameWithExtension = getFileNameWithExtension(directory);

  const allFiles = fileNameWithExtension.map((filename) => {
    const contentWithFrontMatter = getContentWithFrontMatter(directory, filename);
    const { data: frontMatter } = matter(contentWithFrontMatter);
    return {
      frontMatter,
      slug: filename.split('.')[0],
    };
  }) as Content[];

  return sortByDate(allFiles);
};

const replaceFileFormat = (slug: string) => {
  return slug.replace(/\.(mdx|md)/, '');
};

export const getSlugPaths = (directory: Directory) => {
  const fileNameWithExtension = getFileNameWithExtension(directory);

  return fileNameWithExtension.map((filename) => ({
    params: {
      slug: replaceFileFormat(filename).split('/'),
    },
  }));
};

export const getFilePath = (slug: string[]) => {
  return slug.length === 1 ? slug[0] : slug.join('/');
};

export const getSlugContents = async (directory: Directory, slug: string) => {
  const directoryPath = getDirectoryPath(directory);
  const isMdxFile = fs.existsSync(path.join(directoryPath, slug + '.mdx'));
  const contentWithFrontMatter = getContentWithFrontMatter(
    directory,
    `${slug}${isMdxFile ? '.mdx' : '.md'}`
  );

  const { data: frontMatter, content } = matter(contentWithFrontMatter);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkCodeTitles, remarkImgToJsx, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeHighlight,
        rehypeCodeTitles,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ],
      format: isMdxFile ? 'mdx' : 'md',
    },
  });

  return {
    frontMatter,
    mdxSource,
    content,
  };
};
