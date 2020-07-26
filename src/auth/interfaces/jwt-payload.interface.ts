export interface JwtPayload {
  sub: string
  iat?: number
  exp?: number
  jti?: string
  email: string
}
