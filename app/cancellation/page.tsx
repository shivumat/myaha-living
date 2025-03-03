'use client';

import PolicyComponent from '#/ui/components/Policy';

const Privacy = () => {
  return (
    <PolicyComponent
      title="Cancellation & Refund Policy"
      subHeader={
        <span>
          At <strong>Myaha</strong>, your satisfaction is our top priority. If
          you're truly unhappy with your purchase and seeking a refund or
          exchange, we’re here to help.
        </span>
      }
      steps={[
        {
          header: 'Order Cancellations',
          subHeader: '',
          pointer: [
            <span>
              Orders can be canceled within{' '}
              <strong>24 hours of placement</strong> .
            </span>,
            <span>
              Once dispatched, cancellations{' '}
              <strong>will not be possible</strong>.
            </span>,
            <span>
              To cancel an order, please email us at{' '}
              <strong>hello@myahaliving.com</strong>.
            </span>,
          ],
        },
        {
          header: 'Returns & Exchanges',
          subHeader: (
            <span>
              Your satisfaction is our top priority. If you're truly unhappy
              with your purchase and seeking a refund or exchange, we’re here to
              help. Let’s work together to find a solution that best meets your
              needs. Please reach out to us at{' '}
              <strong>hello@myahaliving.com</strong> contact us on WhatsApp at{' '}
              <strong>+91 6350533372</strong>. <br /> To ensure fairness, as we{' '}
              <strong>do not charge for shipping</strong>, any return or
              exchange request will require the customer to bear the{' '}
              <strong>shipping costs for at least one side</strong>. The exact
              amount will be communicated based on courier charges.
            </span>
          ),
          pointer: [],
        },
        {
          header: 'Important Notes',
          subHeader: (
            <span>
              To request a return or exchange, contact us at{' '}
              <strong>hello@myahaliving.com</strong> with your order details.
            </span>
          ),
          pointer: [
            <span>
              If you receive a{' '}
              <strong>damaged product or the wrong item</strong>, Myaha will{' '}
              <strong>cover all return/exchange costs.</strong>
            </span>,
            <span>
              <strong>
                Return/exchange requests must be raised within 48 hours
              </strong>{' '}
              of receiving the order.
            </span>,
            <span>
              Refunds will be processed{' '}
              <strong>within 3-5 business days</strong> after we receive the
              item in our warehouse.
            </span>,
            <span>
              To request a return or exchange, contact us at{' '}
              <strong>hello@myahaliving.com</strong> with your order details.
            </span>,
          ],
        },
      ]}
    />
  );
};

export default Privacy;
