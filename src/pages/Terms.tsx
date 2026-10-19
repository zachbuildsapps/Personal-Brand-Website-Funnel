import { siteConfig } from '../config/siteConfig.ts'
import { LegalLayout } from './LegalLayout.tsx'

export function TermsPage() {
  const email = siteConfig.contactEmail.trim()
  return (
    <LegalLayout
      title="Terms of Service"
      description="The terms for using the ZachFlipsWhips website and its educational content."
    >
      <section>
        <h2>Using this site</h2>
        <p>
          By using {siteConfig.name}, you agree to these draft terms. If you do not agree, don’t use the site. You must
          be able to enter a contract in your location.
        </p>
      </section>
      <section>
        <h2>Education, not a promise</h2>
        <p>
          The site, social content, and any mentorship are educational. They are not legal advice, tax advice, financial
          advice, or investment advice. Car flipping can lose money. Nothing on this site guarantees income, profit, a
          job, or business success.
        </p>
      </section>
      <section>
        <h2>Licenses and auctions</h2>
        <p>
          Dealer licensing is your responsibility and depends on the rules where you live. {siteConfig.owner} operates{' '}
          {siteConfig.dealership} as a licensed dealership in {siteConfig.region}. Using this site, submitting an
          application, or paying for mentorship does not give you a dealer license, dealer privileges, or the right to
          enter a dealer-only auction.
        </p>
        <p>
          Auction access depends on that auction’s rules, your eligibility, and applicable law. Some auctions are
          limited to licensed dealers or other approved participants.
        </p>
      </section>
      <section>
        <h2>Applications and calls</h2>
        <p>
          Submitting an application does not create a mentorship, a partnership, or a spot in a program. A call is a
          conversation about fit. {siteConfig.owner} can decline to work with someone. You are responsible for the
          accuracy of what you submit.
        </p>
      </section>
      <section>
        <h2>Your own deals</h2>
        <p>
          You decide which vehicles to buy and sell. You are responsible for inspections, title, taxes, fees, insurance,
          advertising, and following the law. Examples and stories are illustrations, not instructions that a specific
          car will make money.
        </p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>
          The site design, writing, and videos published by {siteConfig.name} belong to their owner. Don’t copy them
          for your own course or product without permission. Trademarks of other companies remain theirs.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>
          Don’t misuse the site, attempt to break it, or submit someone else’s personal information without their
          permission.
        </p>
      </section>
      <section>
        <h2>Liability</h2>
        <p>
          To the extent the law allows, {siteConfig.name} and {siteConfig.owner} are not liable for lost profits,
          vehicle purchases, or other damages arising from your use of the site or from educational material. Some
          places do not allow certain limits, so part of this may not apply to you. This paragraph is draft language
          for a lawyer to rewrite.
        </p>
      </section>
      <section>
        <h2>Law</h2>
        <p>
          These terms are drafted with {siteConfig.region} in mind. A lawyer should confirm the governing law and venue
          before you rely on them.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          {email.includes('@') ? (
            <>
              Questions about these terms: <a href={`mailto:${email}`}>{email}</a>.
            </>
          ) : (
            <>Questions about these terms can be sent through the application or the social accounts on this site.</>
          )}
        </p>
      </section>
    </LegalLayout>
  )
}
