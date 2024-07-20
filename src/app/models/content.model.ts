import { ContentType } from '../enum/content-type.enum';

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


