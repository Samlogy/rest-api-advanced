import { Request, Response, NextFunction } from 'express'

// Supported API versions
const supportedVersions = ['v1', 'v2']

const defaultVersion = 'v1'

export const apiVersionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiVersion = defaultVersion

  const apiVersionSelected: string = req.params.version || (req.headers['api-version'] as string) || req.params?.version

  // If no version was specified in any of the supported methods, redirect to the default version
  if (!apiVersionSelected) return res.redirect(`/api/${defaultVersion}${req.path}`)

  if (!supportedVersions.includes(apiVersionSelected))
    return res.status(400).json({
      sucess: false,
      message: `API version '${apiVersionSelected}' is not supported.`
    })

  // Set the version in the request object for future middleware to use
  res.locals.apiVersion = apiVersion

  next()
}
