export const safeImgImport = function (
  path: string,
  dir: string = 'images/',
  ext: string = '.png'
): string {
  if (!path) return ''
  try {
    return require(`@/assets/${dir}${path}${ext}?webp`)
  } catch (error) {
    return ''
  }
}
