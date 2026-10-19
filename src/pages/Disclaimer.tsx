import { siteConfig } from '../config/siteConfig.ts'
import { LegalLayout } from './LegalLayout.tsx'

export function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      description="Important limits on the education, auction information, and stories published by ZachFlipsWhips."
    >
      <section>
        <h2>Educational purpose</h2>
        <p>
          {siteConfig.name} publishes education about buying and selling vehicles, dealer-only auctions, and running a
          car business. It is general information from {siteConfig.owner}, who operates {siteConfig.dealership} in{' '}
          {siteConfig.region}. It is not a recommendation to buy a particular car, and it is not legal, tax, or
          financial advice.
        </p>
      </section>
      <section>
        <h2>You can lose money</h2>
        <p>
          Car flipping involves financial risk. Purchase price, condition, repairs, auction fees, holding time, and
          resale demand can erase a margin or turn a deal into a loss. Past deals, including any deal {siteConfig.owner}{' '}
          describes, are not a prediction of your results.
        </p>
      </section>
      <section>
        <h2>Dealer-only auctions</h2>
        <p>
          Dealer-only auctions are not open to everyone. Access depends on licensing, eligibility, the auction’s rules,
          and applicable law. Mentorship and educational material do not grant dealer privileges or unrestricted
          auction access.
        </p>
      </section>
      <section>
        <h2>Stories on this site</h2>
        <p>
          If a story is labeled as a sample, it is fictional placeholder content used to design the page. It is not a
          statement from a customer and it is not a verified result. Only stories that remain after those samples are
          removed, and that {siteConfig.name} has permission to publish, should be read as customer experiences. Even
          then, they are individual experiences, not typical results and not a promise.
        </p>
      </section>
      <section>
        <h2>No special affiliation</h2>
        <p>
          Mention of auctions, marketplaces, or social platforms does not mean those companies endorse {siteConfig.name}.
          Instagram and TikTok are separate services with their own terms.
        </p>
      </section>
      <section>
        <h2>Do your own homework</h2>
        <p>
          Before you buy a vehicle, pay for education, or apply for a license, review the primary sources yourself:
          state licensing rules, auction requirements, and the condition of the specific car. Ask a qualified
          professional when you need legal, tax, or accounting advice.
        </p>
      </section>
    </LegalLayout>
  )
}
