export interface DiscordAccount {
  id: string
  username: string
  display_name: string | null
  avatar: string
  avatar_decoration: string | null
  discriminator: string
  public_flags: number
  flags: number
  banner: string | null
  banner_color: string | null
  accent_color: string | null
  locale: string
  mfa_enabled: boolean
  premium_type: number
  email: string
  verified: boolean
}

export interface DiscordConnection {
  type: string
  id: string
  name: string
  [key: string]: any
}

export type DiscordConnections = DiscordConnection[];
