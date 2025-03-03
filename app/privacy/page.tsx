'use client';

import PolicyComponent from '#/ui/components/Policy';

const Privacy = () => {
  return (
    <PolicyComponent
      title="Privacy Policy"
      subHeader={
        <span>
          At <strong>Myaha</strong>, we are committed to safeguarding your
          privacy. This Privacy Policy outlines how we collect, use, and protect
          your personal information when you visit{' '}
          <strong>www.myahaliving.com</strong>.
        </span>
      }
      steps={[
        {
          header: 'Information We Collect',
          subHeader: (
            <span>
              We collect both{' '}
              <strong>personal and non-personal information</strong> to provide
              you with a seamless shopping experience.
            </span>
          ),
          pointer: [
            <span>
              <strong>Personal Information:</strong> Name, email, phone,
              billing/shipping address, and payment details.
            </span>,
            <span>
              <strong>Non-Personal Information:</strong> IP address, browser
              type, and browsing behavior.
            </span>,
            <span>
              <strong>Cookies & Tracking Technologies:</strong> Used to track
              user preferences.
            </span>,
          ],
        },
        {
          header: 'How We Use Your Information',
          subHeader: 'We use your information to:',
          pointer: [
            'Process and fulfill orders.',
            'Respond to queries and support requests.',
            'Send promotional offers and newsletters.',
            'Improve website functionality.',
          ],
        },
        {
          header: 'Data Protection & Security',
          subHeader:
            'We implement strict security measures to protect your personal data.',
          pointer: [],
        },
        {
          header: 'Sharing of Information',
          subHeader: 'We do not sell or rent your personal data.',
          pointer: [
            <span>
              <strong>Third-party logistics providers</strong> for shipping and
              order fulfillment.
            </span>,
            <span>
              <strong>Payment service providers</strong> to process transactions
              securely.
            </span>,
            <span>
              <strong>Legal authorities</strong> if required by law.
            </span>,
          ],
        },
        {
          header: 'Your Rights & Choices',
          subHeader: (
            <span>
              You can request access, correction, or deletion of your personal
              data by contacting us at <strong>hello@myahaliving.com</strong>.
              You may also opt out of marketing emails at any time.
            </span>
          ),
          pointer: [],
        },
        {
          header: 'Updates to This Policy',
          subHeader:
            'We reserve the right to modify this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review them periodically.',
          pointer: [],
        },
      ]}
    />
  );
};

export default Privacy;
