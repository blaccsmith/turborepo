import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';

const Author = defineNestedType(() => ({
  name: 'Author',
  fields: {
    name: {
      type: 'string',
      required: true,
      photo: {
        type: 'string',
        required: true,
      },
      twitter: {
        type: 'string',
        required: false,
      },
      github: {
        type: 'string',
        required: false,
      },
      linkedin: {
        type: 'string',
        required: false,
      },
    },
  },
}));

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    author: {
      type: 'nested',
      of: Author,
      required: true,
    },
    published: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: post => `/blogs/${post._raw.flattenedPath}`,
    },
  },
}));
