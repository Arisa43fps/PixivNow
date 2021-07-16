import { VercelRequest, VercelResponse } from '@vercel/node'
import cheerio from 'cheerio'
import { handleError, request } from '../utils'

export default async (req: VercelRequest, res: VercelResponse) => {
  const token = req.cookies.PHPSESSID || req.query.token
  if (!token) {
    return res.status(403).send({ message: '未配置用户密钥' })
  }

  request({ params: req.query, headers: req.headers })
    .then(async ({ data }) => {
      const $ = cheerio.load(data)
      const $meta = $('meta[name="global-data"]')
      if ($meta.length < 0 || !$meta.attr('content')) {
        return res.status(403).send({ message: '无效的用户密钥' })
      }

      let meta
      try {
        meta = JSON.parse($meta.attr('content') as string)
      } catch (error) {
        throw {
          message: '意料外的元数据',
          cheerio: {
            length: $meta.length,
            html: $meta.prop('outerHTML'),
          },
          error,
        }
      }

      const { token, userData } = meta
      if (!userData) {
        throw { error: true, message: 'userData 已遗失', meta }
      }

      res.setHeader('set-cookie', `CSRFTOKEN=${token}; path=/; secure`)
      res.send(userData)
    })
    .catch((err) => {
      return handleError(err, res)
    })
}
