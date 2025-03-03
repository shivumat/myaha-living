'use client';

import PolicyComponent from '#/ui/components/Policy';

const Terms = () => {
  return (
    <PolicyComponent
      title="Terms & Conditions"
      subHeader={
        <span>
          Welcome to <strong>myahaliving.com</strong> ! By accessing and using
          this website, you agree to the following terms and conditions:
        </span>
      }
      steps={[
        {
          header: 'General Terms',
          subHeader: '',
          pointer: [
            <span>
              By placing an order, you confirm that you are at least{' '}
              <strong>18 years old</strong> or have parental consent.
            </span>,
            'Product availability, pricing, and offers are subject to change without prior notice.',
            <span>
              All purchases made through this website are for{' '}
              <strong>personal use only</strong>. Reselling or distributing our
              products for commercial purposes is prohibited without prior
              authorization.
            </span>,
          ],
        },
        {
          header: 'Intellectual Property',
          subHeader: '',
          pointer: [
            <span>
              All <strong>images, designs, logos, and content</strong> on{' '}
              <strong>www.myahaliving.com </strong>are owned by Myaha.
              Unauthorized reproduction, distribution, or use of our content is
              strictly prohibited.
            </span>,
          ],
        },
        {
          header: 'Orders & Payments',
          subHeader: '',
          pointer: [
            'Orders are confirmed only after successful payment.',
            <span>
              We reserve the right to <strong>cancel any order</strong>{' '}
              suspected of fraudulent activity or incorrect pricing due to
              technical errors.
            </span>,
            'All payments are processed securely through trusted payment gateways.',
          ],
        },
        {
          header: 'Shipping & Delivery',
          subHeader:
            'Orders are typically delivered within 5-7 business days after dispatch.',
          pointer: [
            <span>
              Orders are typically delivered within{' '}
              <strong>5-7 business days</strong>after dispatch.
            </span>,
            'Urgent deliveries may be available at an extra cost, subject to availability.',
            <span>
              Myaha is not responsible for delays caused by{' '}
              <strong>
                unforeseen circumstances or courier-related issues.
              </strong>
            </span>,
          ],
        },
        {
          header: 'Returns & Refunds',
          subHeader: '',
          pointer: [
            'Returns and exchanges are only accepted for damaged or incorrect products.',
            <span>
              Since we provide <strong>free shipping on all orders</strong>,
              customers requesting returns or exchanges will need to cover the
              shipping costs for at least one side.
            </span>,
            <span>
              Myaha will <strong>bear the return costs</strong> in case of
              damaged or incorrect products.
            </span>,
          ],
        },
        {
          header: 'Limitation of Liability',
          subHeader: '',
          pointer: [
            'While we strive for accuracy, Myaha is not responsible for typographical errors, pricing mistakes, or inaccuracies in product descriptions.',
            <span>
              We shall not be held liable for{' '}
              <strong>indirect, incidental, or consequential</strong> damages
              arising from the use of our products or website.
            </span>,
          ],
        },
        {
          header: 'Governing Law & Dispute Resolution',
          subHeader: (
            <span>
              These terms and conditions are governed by the laws of{' '}
              <strong>India</strong>. Any disputes arising from the use of this
              website shall be subject to the jurisdiction of courts in{' '}
              <strong>Jaipur, Rajasthan</strong>.
            </span>
          ),
          pointer: [],
        },
      ]}
    />
  );
};

export default Terms;
