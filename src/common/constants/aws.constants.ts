export const BUCKET = process.env['AWS_BUCKET_NAME']
export const BUCKET_PREFIX = process.env['AWS_BUCKET_PREFIX_URL']
export const BUCKET_IMAGE = `${BUCKET_PREFIX}/images`
export const BUCKET_IMAGE_CHAT = `${BUCKET_IMAGE}/chat-images`
export const BUCKET_IMAGE_POST = `${BUCKET_IMAGE}/posts-images`
export const BUCKET_IMAGE_POST_UPLOAD = `images/posts-images`
export const BUCKET_IMAGE_BANNER = `${BUCKET_IMAGE}/banners`
export const BUCKET_IMAGE_AVATAR = `${BUCKET_IMAGE}/avatar`
export const BUCKET_IMAGE_THEME = `${BUCKET_IMAGE}/themes`
export const BUCKET_IMAGE_APPLICATION = `${BUCKET_IMAGE}/applications`
export const BUCKET_IMAGE_COMPANY_ICON = `${BUCKET_IMAGE}/icons/company`
export const BUCKET_IMAGE_WELCOME = `${BUCKET_IMAGE}/welcome-images`
export const BUCKET_IMAGE_COMANIES_LOGO = `${BUCKET_IMAGE}/companies-logo`
export const BUCKET_IMAGE_DEFAULT = `${BUCKET_IMAGE}/default`
export const BUCKET_CV = `${BUCKET_PREFIX}/cv-bucket`