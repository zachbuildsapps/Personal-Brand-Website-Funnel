import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { LegalLayout, NeedsConfirmation } from './LegalLayout.tsx'

export function TermsPage() {
  const email = siteConfig.contactEmail.trim()
  const hasEmail = email.includes('@')

  return (
    <LegalLayout
      title="Terms and Conditions"
      description="The terms for using the ZachFlipsWhips website, its educational content, and its application."
    >
      <section>
        <h2>1. Website use</h2>
        <p>
          These terms apply to your use of the {siteConfig.name} website. The site is an application funnel for
          educational inquiries. It is not a checkout, and visitors are not purchasing services through it. If you do
          not agree with these terms, do not use the site.
        </p>
        <p>
          This is a draft for review. It is not a completed client agreement, and using the site does not create a
          mentorship agreement, an auction-access agreement, or a payment obligation.
        </p>
      </section>

      <section>
        <h2>2. Eligibility</h2>
        <p>
          The site is intended for adults who are submitting information about themselves and who can make their own
          decisions about education and vehicle purchases. It is not directed to children.
        </p>
        <NeedsConfirmation>
          A specific minimum age, residency limit, or other eligibility rule is not confirmed here. Add one only after
          it is reviewed. Do not treat this paragraph as a final eligibility contract.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>3. Educational content</h2>
        <p>
          Articles, videos, social posts, and explanations on this site are educational. They describe general ideas
          about buying and selling vehicles, operating a dealership, and understanding auctions. They are not legal
          advice, tax advice, financial advice, or investment advice, and they are not a recommendation to buy or sell
          a particular vehicle.
        </p>
        <p>
          Educational content is not a guarantee of income. Read the <Link to="/disclaimer">Earnings Disclaimer</Link>{' '}
          before you rely on anything published here.
        </p>
      </section>

      <section>
        <h2>4. Mentorship inquiries</h2>
        <p>
          Mentorship, if it is offered to you, is teaching and guidance from {siteConfig.owner}, who operates{' '}
          {siteConfig.dealership} in {siteConfig.region}. An inquiry on this website does not enroll you in
          mentorship. It does not make you a partner in {siteConfig.dealership}, an employee, or a dealer.
        </p>
        <p>
          Details about available programs are discussed with qualified applicants. This site does not publish program
          prices and does not take payment. Any mentorship agreement, payment terms, and refund terms will be handled
          in a separate document if you and {siteConfig.owner} decide to work together. Nothing on this page creates
          those terms.
        </p>
      </section>

      <section>
        <h2>5. Auction-access inquiries</h2>
        <p>
          {siteConfig.name} discusses dealer-only auctions as education and as a subject people can ask about.{' '}
          {siteConfig.dealership} is a licensed California dealership operated by {siteConfig.owner}. The personal
          brand and the dealership are not described here as a product that sells dealer privileges.
        </p>
        <p>
          Dealer-only auctions may require a license and other eligibility. Whether someone can participate depends on
          applicable law and on the rules of the particular auction. Submitting an application does not grant auction
          access. Applicants may need additional eligibility and documentation. No service offered through this website
          bypasses licensing laws or auction rules.
        </p>
        <p>
          This draft does not claim that any particular access arrangement is lawful or currently available.
        </p>
        <NeedsConfirmation>
          The actual auction-access business model needs California legal review before you accept payment or promise
          access. Do not describe a specific arrangement as available until that review is done.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>6. Application submission</h2>
        <p>
          The application asks about your goals, experience, location, capital, timing, and interest in working
          together. The copy on this site is a preview. Answers are not transmitted or saved, and the site does not
          display a successful submission because no application backend is connected.
        </p>
        <p>Submitting an application, once a backend exists, still does not guarantee:</p>
        <ul>
          <li>Acceptance</li>
          <li>Mentorship enrollment</li>
          <li>Auction access</li>
          <li>Dealer licensing</li>
          <li>Financial results</li>
          <li>Business success</li>
        </ul>
        <p>
          {siteConfig.owner} may decline to move forward with an inquiry. A later call, if one is offered, is a
          conversation about fit. It is not acceptance into a program.
        </p>
      </section>

      <section>
        <h2>7. Accuracy of information</h2>
        <p>
          You are responsible for the accuracy of what you submit. Do not submit information about someone else unless
          you have their permission and a legitimate reason to do so. {siteConfig.name} may be unable to review an
          inquiry that is incomplete or misleading.
        </p>
      </section>

      <section>
        <h2>8. Intellectual property</h2>
        <p>
          The writing, design, photographs, and videos published by {siteConfig.name} are owned by their respective
          owners. You may view them for your own personal information. You may not copy them into your own course,
          advertisement, or product without permission.
        </p>
        <p>
          Names and marks of other companies, including auction companies, marketplaces, and social platforms, remain
          the property of those companies. Mentioning them does not mean they endorse {siteConfig.name}.
        </p>
        <NeedsConfirmation>
          Confirm who owns the site copy, photographs, and the {siteConfig.name} name before relying on this license
          language.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>9. Prohibited misuse</h2>
        <p>You may not:</p>
        <ul>
          <li>Interfere with the site or attempt to break, scrape, or overload it</li>
          <li>Use the site to submit unlawful, deceptive, or unauthorized information</li>
          <li>Misrepresent your identity, capital, licensing status, or eligibility</li>
          <li>Present {siteConfig.name} content as your own education product</li>
          <li>Use the site in a way that violates auction rules or vehicle-dealer laws</li>
        </ul>
      </section>

      <section>
        <h2>10. Third-party services</h2>
        <p>
          Instagram and TikTok are separate services. GoHighLevel, Typeform, Calendly, analytics tools, and text
          messaging are not connected to this website. If a third-party service is added, its own terms will apply to
          that service, and these terms should be updated to name it. The <Link to="/privacy">Privacy Policy</Link>{' '}
          describes what this site does and does not collect today.
        </p>
      </section>

      <section>
        <h2>11. Disclaimers</h2>
        <p>
          The site is provided for general education and for receiving inquiries. Car flipping can lose money.
          Vehicles, fees, and market conditions change. Past activity by {siteConfig.owner} or by{' '}
          {siteConfig.dealership} is not a prediction of your results.
        </p>
        <p>
          To the extent the law allows, educational material is provided without a warranty that it will meet your
          goals or produce a profit. Some jurisdictions do not allow certain warranty disclaimers, so part of this
          section may not apply to you.
        </p>
        <NeedsConfirmation>
          A lawyer should rewrite the warranty language before you rely on it. This draft does not state a refund
          policy, a payment schedule, or a service-level commitment, because those belong in a separate agreement.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>12. Limitations of liability</h2>
        <p>
          To the extent the law allows, {siteConfig.name} and {siteConfig.owner} are not liable for lost profits,
          vehicle purchases, repair costs, auction fees, or other damages arising from your use of the site, from
          educational material, or from a decision you make after an inquiry. This limit does not apply where the law
          does not allow it, including any liability that cannot legally be limited.
        </p>
        <NeedsConfirmation>
          This limitation is draft language. Have a lawyer rewrite it, including any damages cap, before publication
          as a final term. Do not add arbitration, a class-action waiver, or a payment obligation unless counsel
          prepares that language.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>13. Changes to the terms</h2>
        <p>
          These terms may be updated by posting a new version on this page with a new date. The version posted when
          you use the site applies to that use. A separate mentorship or auction-access agreement, if you later sign
          one, will control that relationship. Changes to these website terms do not silently rewrite a signed
          agreement.
        </p>
      </section>

      <section>
        <h2>14. Contact</h2>
        {hasEmail ? (
          <p>
            Questions about these terms: <a href={`mailto:${email}`}>{email}</a>.
          </p>
        ) : (
          <>
            <p>A contact email for these terms has not been published.</p>
            <NeedsConfirmation>
              This is a launch blocker. Add a verified business email before treating these terms as ready to rely on.
              These terms are drafted with {siteConfig.region} in mind. Counsel should confirm governing law and venue.
              This draft does not choose a court or an arbitration forum.
            </NeedsConfirmation>
          </>
        )}
      </section>
    </LegalLayout>
  )
}
