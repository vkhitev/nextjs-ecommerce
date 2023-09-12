import { authMiddleware } from '@clerk/nextjs'

// Protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({})

export const config = {
  /**
   * (?!.*\\..*|_next) - This negative lookahead assertion is checking that what follows at the current position is not either of the following:
   * - .*\\..* - Any sequence of characters containing a period (dot).
   * - _next - The literal string "_next."
   *
   * So, the regular expression as a whole is looking for a sequence of characters that does not contain a period (dot) and is not equal to "_next." The .* after the lookahead is used to match and capture any characters that meet this condition.
   *
   * In summary, this regular expression captures any sequence of characters that does not contain a dot (.) and is not equal to "_next."
   */
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
