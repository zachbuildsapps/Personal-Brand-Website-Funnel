import { Link } from 'react-router-dom'
import { siteConfig } from '../config/siteConfig.ts'
import { LegalLayout, NeedsConfirmation } from './LegalLayout.tsx'

export function PrivacyPage() {
  const email = siteConfig.contactEmail.trim()
  const hasEmail = email.includes('@')

  return (
    <LegalLayout
      title="Privacy Policy"
      description="How ZachFlipsWhips handles information collected through this website."
    >
      <section>
        <h2>Who this policy covers</h2>
        <p>
          This policy describes the {siteConfig.name} website. {siteConfig.owner} publishes it as educational content
          and also operates {siteConfig.dealership}, a licensed used-car dealership in {siteConfig.region}. This draft
          covers the website. It does not describe every record the dealership may keep in the ordinary course of
          selling vehicles.
        </p>
        <NeedsConfirmation>
          The legal relationship between {siteConfig.name} and {siteConfig.dealership} — for example, whether they are
          the same person, a DBA, or separate entities — is not documented here. Confirm the legal name that should
          appear on this policy, and whether a dealership license number should be published, before launch.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>Information the site may collect</h2>
        <p>
          If you use the qualification application, you may be asked for information you choose to provide, including:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>City and state, or another location you enter</li>
          <li>Available starting capital</li>
          <li>Car-flipping experience</li>
          <li>Timeline for starting</li>
          <li>Program interests</li>
          <li>Other application answers</li>
          <li>Any other information you voluntarily submit</li>
        </ul>
        <p>
          You can leave the site without applying. The capital question is part of qualification. It is not a published
          price and it is not a request for payment on this website.
        </p>
        <p>
          Right now the application is a preview in your browser. The answers stay in that window and are not
          transmitted to {siteConfig.name} or saved on a server by this website.
        </p>
      </section>

      <section>
        <h2>How information may be used</h2>
        <p>If an application is later received, the information in it may be used to:</p>
        <ul>
          <li>Review the application</li>
          <li>Determine whether a program appears suitable</li>
          <li>Respond to the inquiry</li>
          <li>Schedule a consultation</li>
          <li>Provide information that was requested</li>
          <li>Communicate about mentorship and auction-related services</li>
          <li>Improve how the website functions</li>
          <li>Maintain the security of the website</li>
        </ul>
        <p>
          Submitting an application does not create a mentorship, an auction-access arrangement, or any other
          agreement. Those subjects are covered in the <Link to="/terms">Terms and Conditions</Link>.
        </p>
      </section>

      <section>
        <h2>Optional marketing texts</h2>
        <p>
          The preview application includes a separate, unchecked choice for optional marketing text messages. That
          choice is not required to continue. This website does not send text messages, and checking the box in the
          preview does not opt you into a live messaging program.
        </p>
        <p>
          If a messaging service is connected later, the site is prepared to store whether the box was checked and the
          time of that choice, separately from the privacy acknowledgment. The final consent language, the business
          identity, the contact details, and the linked policies need review before any application-to-person
          registration.
        </p>
        <NeedsConfirmation>
          Do not treat the checkbox as an active SMS program. Confirm the sender name, the phone number, the help
          contact, and the consent language with counsel before registering for text messaging.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>Third-party services</h2>
        <p>This website does not currently send application data to a form, CRM, or scheduling service.</p>
        <ul>
          <li>GoHighLevel is not connected and is not collecting information through this site.</li>
          <li>Typeform is not connected. The preview form does not load a Typeform embed.</li>
          <li>Calendly is not connected. No appointment is created from this site.</li>
          <li>No payment processor is connected. The site does not take payment.</li>
        </ul>
        <p>
          A later version may send applications to a service such as GoHighLevel, and may use a form or scheduling
          tool. If that happens, this policy has to be updated before those tools collect information, including the
          name of the service and what it receives.
        </p>
        <p>
          Links to Instagram and TikTok leave this website. Those companies operate their own services under their own
          policies. Following or viewing those profiles is separate from submitting an application here.
        </p>
        <NeedsConfirmation>
          Before any vendor is connected, list the actual service, what it receives, and where it processes data.
          Do not publish this page as final while those tools are undescribed.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>Cookies and tracking</h2>
        <p>
          This website does not currently load Google Analytics, a Meta Pixel, a TikTok Pixel, or another advertising
          or analytics tag. Those identifiers in the site configuration are empty, so the tracking-consent notice is
          not shown and those scripts are not added to the page.
        </p>
        <p>
          The site does not set its own analytics cookie. Fonts are delivered with the website rather than requested
          from a third-party font host. The preview application keeps what you type in memory for that visit. Closing
          the application window clears it.
        </p>
        <p>
          If analytics or advertising tools are added later, they should stay off until a visitor can allow or decline
          them, and this policy must be updated to name the tools and the information they receive. A consent choice
          may then be stored in the browser so the site can remember it.
        </p>
        <p>
          Once the site is hosted, the host may keep ordinary connection logs, such as a browser request for a page.
          This project does not control or document that logging.
        </p>
      </section>

      <section>
        <h2>Data protection</h2>
        <p>
          Because applications are not yet received by a backend, {siteConfig.name} is not storing application answers
          from this website. When storage is added, access should be limited to the people who review applications and
          operate the relevant accounts. Vendors that process the information should be limited to the services
          actually used.
        </p>
        <p>
          No retention period is stated here. One should be chosen and written into this policy before applications
          are saved. A stated period should cover application records, scheduling records, and any consent records,
          and it should say what happens when the period ends.
        </p>
        <p>
          You may request access, correction, or deletion of personal information {siteConfig.owner} holds about you
          from this website. A request does not require you to buy anything. Identity verification for a request is
          not defined yet and should be confirmed before requests are accepted at scale.
        </p>
        <p>
          Reasonable administrative and technical precautions should be used once data is stored. Those precautions
          reduce risk. They do not make storage perfectly secure, and this policy does not promise that unauthorized
          access cannot occur.
        </p>
        <NeedsConfirmation>
          Retention periods, deletion workflow, who can access stored applications, and the security measures of any
          future vendor are not set. Confirm them before accepting live applications.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>California privacy</h2>
        <p>
          {siteConfig.owner} operates in California. California privacy law can give residents rights to know, correct,
          and delete personal information, and to opt out of certain selling or sharing. Which duties apply depends on
          facts that are not verified in this draft, including the business’s status under those laws.
        </p>
        <p>
          This draft does not claim that the California Consumer Privacy Act or the California Privacy Rights Act
          applies, and it does not claim an exemption. It also does not claim that a particular request method,
          verification standard, or response time is legally sufficient.
        </p>
        <p>
          The site is not built to sell personal information for money, and it does not currently share application
          information with advertising platforms. Those statements describe the current build only. They should be
          reviewed again if a CRM, pixel, or other sharing tool is added, because “sale” and “share” have specific
          legal meanings.
        </p>
        <NeedsConfirmation>
          Have a California attorney confirm which privacy rights to offer, whether a “Do Not Sell or Share” link is
          required, and how requests should be verified. Do not rely on this section as a completed California
          compliance program.
        </NeedsConfirmation>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          This website is not directed to children, and it is not intended to collect information from children. The
          exact age cutoff for the application should be confirmed before launch.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If this policy changes, the updated version will be posted on this page with a new date. Material changes to
          how applications are collected, including connecting a form backend or an advertising pixel, should be
          described here before those tools are turned on.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        {hasEmail ? (
          <p>
            Email <a href={`mailto:${email}`}>{email}</a> for privacy questions and for requests to access, correct, or
            delete personal information related to this website.
          </p>
        ) : (
          <>
            <p>
              A verified privacy contact email has not been added to this website. Until that address is published,
              this policy does not name an email for privacy requests.
            </p>
            <NeedsConfirmation>
              This is a launch blocker. Add a business email you control to the site configuration, confirm it is the
              address that should receive privacy requests, and republish this page. Do not substitute an invented
              address. Social profiles are not a designated privacy inbox.
            </NeedsConfirmation>
          </>
        )}
      </section>
    </LegalLayout>
  )
}
