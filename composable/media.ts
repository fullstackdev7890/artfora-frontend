import { Media } from '~/types'
import { useRuntimeConfig } from '#app'

export default function () {
  const config = useRuntimeConfig()

  const getImageUrl = (media: Media, template?: string): string => {
    if (!!template) {
      return config.public.API_BASE_URL + '/cache/' + template + '/' + media.link
    }

    return config.public.API_BASE_URL + '/storage/' + media.link
  }
  const isImage = (media: Media): boolean => ['jpg', 'jpeg', 'png', 'webp', 'bmp'].some((format) => media.link.includes(format))
  const isVideo = (media: Media): boolean => ['mp4', 'mov', 'ogg'].some((format) => media.link.includes(format))

  return { getImageUrl, isImage, isVideo }
}
