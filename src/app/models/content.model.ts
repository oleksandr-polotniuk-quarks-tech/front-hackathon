export type ContentModel = ImageContent | TextContent | BlockContent | EmbedContent

export interface ImageContent {
  type: 'image';
  src: string;
}

export interface TextContent {
  type: 'title' | 'paragraph';
  content: string;
}

export interface BlockContent {
  type: 'adv' | 'video',
  id: string;
}

export interface EmbedContent {
  type: 'embed',
  url: string;
}
