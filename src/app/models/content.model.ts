export type ContentModel = ImageContent | TextContent | BlockContent | EmbedContent

export interface ImageContent {
  type: ContentType.Image;
  src: string;
}

export interface TextContent {
  type: ContentType.Title | ContentType.Paragraph;
  content: string;
}

export interface BlockContent {
  type: ContentType.Adv | ContentType.Video,
  id: string;
}

export interface EmbedContent {
  type: ContentType.Embed,
  url: string;
}

export enum ContentType {
  Image = 'image',
  Title = 'title',
  Paragraph = 'paragraph',
  Adv = 'adv',
  Video = 'video',
  Embed = 'embed'
}
