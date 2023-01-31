export const JUSTIFIED_GALLERY_VIEW_TYPE = 'justified'
export const SQUARE_GALLERY_VIEW_TYPE = 'square'
export const DETAILS_GALLERY_VIEW_TYPE = 'details'

export declare interface GalleryItem {
  url: string
  author: string
  author_tag: string
  author_avatar: string
}

export declare interface GalleryColumn extends Array<GalleryItem> {
  [index: number]: GalleryItem[]
}