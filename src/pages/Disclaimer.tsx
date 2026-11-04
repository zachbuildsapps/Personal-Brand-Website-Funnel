import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { LegalLayout, NeedsConfirmation } from './LegalLayout.tsx'

export function DisclaimerPage() {
  return (
    <LegalLayout
      title="Earnings Disclaimer"
      description="Financial risk, earnings limits, and dealer-auction limits for ZachFlipsWhips."
    >
      <section>
        <h2>Educational content only</h2>
        <p>
          {siteConfig.name} publishes education about buying and selling vehicles and about how dealer auctions work.
          It is general information from {siteConfig.owner}, who operates {siteConfig.dealership} in{' '}
          {siteConfig.region}. It is not legal, tax, financial, or investment advice, and it is not a recommendation to
          buy a particular car.
        </p>
        <p>
          The website asks people to apply. It does not sell a program on the page, and it does not state program
          prices. Details about available programs are discussed with qualified applicants.
        </p>
      </section>

      <section>
        <h2>Car flipping involves financial risk</h2>
        <p>Buying and reselling vehicles can lose money. The risks include all of the following:</p>
        <ul>
          <li>A vehicle can need unexpected repairs, reconditioning, or parts.</li>
          <li>Auction fees, transportation, registration, taxes, and other expenses can reduce or erase a margin.</li>
          <li>A vehicle may sell for less than expected, or it may take longer to sell than expected.</li>
          <li>Holding a vehicle costs money even when the asking price does not change.</li>
          <li>Market demand, season, mileage, title, and condition can all move the result.</li>
        </ul>
        <p>
          Business results depend on experience, market conditions, available capital, the decisions you make, and
          other factors outside anyone’s control. You are responsible for inspections, title, taxes, insurance, and
          compliance with the law that applies to you.
        </p>
      </section>

      <section>
        <h2>No earnings are guaranteed</h2>
        <p>
          Past results do not guarantee future results. A car {siteConfig.owner} bought or sold, a process used at{' '}
          {siteConfig.dealership}, or an example discussed in a video is not a prediction of what you will earn.
        </p>
        <p>
          Educational content is not a guarantee of income. Mentorship, if it is later offered, is teaching. It is not
          a promise of profit, a job, or a successful business.
        </p>
        <p>
          This website does not publish earnings statistics. Any figure you see elsewhere, including on social media,
          should be read as an individual example unless a source expressly says otherwise. This page does not adopt
          those figures.
        </p>
      </section>

      <section>
        <h2>Testimonials</h2>
        <p>
          This website does not currently publish customer testimonials, reviews, or student success stories. If
          testimonials are added later, they are individual experiences from people who gave permission to share them.
          They do not necessarily represent typical results, and they are not a promise that you will have a similar
          outcome.
        </p>
        <NeedsConfirmation>
          Do not add a testimonial, a dollar result, or a sales figure until you have permission and a basis for the
          claim. No earnings number should be invented to fill this page.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>Dealer auction access</h2>
        <p>
          {siteConfig.owner} operates {siteConfig.dealership}, a licensed California dealership. {siteConfig.name} is
          the personal brand used for educational content and for discussion of possible auction-related opportunities.
          Those are different subjects. Education about auctions is not the same thing as holding a dealer license.
        </p>
        <p>
          Dealer-only auctions may have licensing and eligibility requirements. Auction participation depends on
          applicable laws and on the policies of the individual auction. Some auctions admit licensed dealers only.
          Others may have additional approval steps.
        </p>
        <p>Please read these limits carefully:</p>
        <ul>
          <li>Submitting an application does not guarantee auction access.</li>
          <li>Applicants may need to meet additional eligibility and documentation requirements.</li>
          <li>Paying for education, or asking about access, does not grant the legal privileges of a licensed dealer.</li>
          <li>No service bypasses licensing laws or auction rules.</li>
          <li>This website does not claim that a particular access arrangement is lawful or available.</li>
        </ul>
        <p>
          More detail is in the <Link to="/terms">Terms and Conditions</Link>. Questions about how your own state
          treats dealer licensing should go to the licensing agency or to your own lawyer, not to a page on this
          website.
        </p>
        <NeedsConfirmation>
          The actual auction-access business model needs California legal review before you accept payment or promise
          any form of auction access. This disclaimer does not approve a model, name an auction, or describe an
          arrangement as lawful.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>Do your own homework</h2>
        <p>
          Before you buy a vehicle, spend money on education, or apply for a license, review the primary sources
          yourself: the condition of the specific car, the fees that apply, and the licensing rules where you operate.
          Ask a qualified professional when you need legal, tax, or accounting advice.
        </p>
      </section>
    </LegalLayout>
  )
}