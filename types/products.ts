export const JUSTIFIED_GALLERY_VIEW_TYPE = 'justified'
export const SQUARE_GALLERY_VIEW_TYPE = 'square'
export const DETAILS_GALLERY_VIEW_TYPE = 'details'
export const MOBILE_WIDTH = 768
export const TABLET_WIDTH = 992
export const LAPTOP_WIDTH = 1200
export const LARGE_WIDTH = 1600


export declare interface GalleryItem {
  url: string
  name: string
  author: string
  author_tag: string
  author_avatar: string
}

export declare interface GalleryColumn extends Array<GalleryItem> {
  [index: number]: GalleryItem[]
}