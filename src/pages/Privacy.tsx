import { siteConfig } from '../config/siteConfig.ts'
import { LegalLayout } from './LegalLayout.tsx'

export function PrivacyPage() {
  const email = siteConfig.contactEmail.trim()
  return (
    <LegalLayout
      title="Privacy Policy"
      description="How ZachFlipsWhips handles information collected through this website."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by {siteConfig.owner} under the name {siteConfig.name}. {siteConfig.owner} also
          operates {siteConfig.dealership}, a licensed used-car dealership in {siteConfig.region}. This policy
          describes this website. It does not describe every practice of the dealership.
        </p>
      </section>
      <section>
        <h2>Information you give us</h2>
        <p>
          If you apply, the questions ask for your name, email address, phone number, location, experience, available
          business capital, timing, and why you want to work together. When a Typeform form is connected, those answers
          are collected by Typeform, not stored in this website.
        </p>
        <p>
          If you book a call, Calendly collects the details needed to schedule it, such as your name, email, and the
          time you choose. This website does not keep a copy of your application on its own server.
        </p>
      </section>
      <section>
        <h2>Information collected automatically</h2>
        <p>
          The site can support Google Analytics, the Meta Pixel, and the TikTok Pixel. Those tools are off until a
          tracking ID is added and you choose Allow on the consent notice. If you allow them, they may collect device,
          browser, and page information, and events such as a page view, video play, application open, application
          start, application completion, qualified lead, or booked call.
        </p>
        <p>If you choose Decline, those scripts are not loaded.</p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>
          Application and scheduling details are used to respond to you, decide whether a call makes sense, and follow
          up about mentorship or education. Analytics, if you allow them, are used to understand which parts of the
          site people use.
        </p>
      </section>
      <section>
        <h2>Who else receives it</h2>
        <p>
          Typeform and Calendly process application and booking information when those tools are connected. If you
          allow analytics, Google, Meta, and TikTok process the events described above. Instagram and TikTok also
          operate the social profiles linked from this site, under their own policies.
        </p>
        <p>
          {siteConfig.name} does not sell personal information. This sentence is draft language and should be confirmed
          with a lawyer, including under the California Consumer Privacy Act.
        </p>
      </section>
      <section>
        <h2>How long it is kept</h2>
        <p>
          Application and booking records stay in Typeform and Calendly according to those services and {siteConfig.owner}
          ’s settings. Analytics providers keep data according to their own retention settings. The preview application
          on this site, shown before Typeform is connected, is kept only in your browser tab and is cleared when you
          close the window.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can leave the site without applying. You can decline analytics. You can ask to see, correct, or delete
          the personal information {siteConfig.owner} holds about you. Sending a request does not require you to buy
          anything.
        </p>
      </section>
      <section>
        <h2>Children</h2>
        <p>This site is not directed to children under 16, and it does not knowingly collect their information.</p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>If this policy changes, the updated version will be posted on this page with a new date.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          {email.includes('@') ? (
            <>
              Email <a href={`mailto:${email}`}>{email}</a> with privacy requests.
            </>
          ) : (
            <>
              Until a contact email is added, send privacy requests through the application or through the Instagram and
              TikTok accounts linked on this site.
            </>
          )}
        </p>
      </section>
    </LegalLayout>
  )
}
