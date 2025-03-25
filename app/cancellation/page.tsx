'use client';

import PolicyComponent from '#/ui/components/Policy';

const Privacy = () => {
  return (
    <PolicyComponent
      title="Cancellation & Refund Policy"
      subHeader={
        <span>
          At <strong>Myaha</strong>, your satisfaction is our top priority. If
          you're not completely satisfied with your purchase, we're here to help
          with refunds or exchanges.
        </span>
      }
      steps={[
        {
          header: 'Order Cancellations',
          subHeader: '',
          pointer: [
            <span>
              Orders can be canceled within{' '}
              <strong>24 hours of placement</strong>.
            </span>,
            <span>
              Once the order is dispatched, cancellations{' '}
              <strong>will not be possible</strong>.
            </span>,
            <span>
              To cancel your order, please email us at{' '}
              <strong>hello@myahaliving.com</strong>.
            </span>,
          ],
        },
        {
          header: 'Returns & Exchanges',
          subHeader: (
            <span>
              We understand that sometimes things don’t work out. If your
              purchase meets the following conditions, we’re happy to help you
              with a return or exchange:
            </span>
          ),
          pointer: [
            <span>
              <strong>Incorrect Product Delivered:</strong> If the product you
              received does not match the item description on our website or is
              not the product you ordered.
            </span>,
            <span>
              <strong>Damaged or Defective Product:</strong> If the product has
              a genuine manufacturing defect or has been damaged during
              delivery.
            </span>,
          ],
        },
        {
          header: 'How to Request a Return or Exchange',
          subHeader: (
            <span>
              Contact us at <strong>hello@myahaliving.com</strong> or on
              WhatsApp at
              <strong> +91 6350533372</strong> with the following details:
            </span>
          ),
          pointer: [
            <span>
              <strong>Order number</strong>
            </span>,
            <span>
              <strong>Reason for return or exchange</strong>
            </span>,
            <span>
              <strong>Photos or videos of the product</strong> (if damaged or
              incorrect)
            </span>,
            <span>
              Return/exchange requests must be made within{' '}
              <strong>48 hours</strong> of receiving the product.
            </span>,
          ],
        },
        {
          header: 'Exchange Policy',
          subHeader: (
            <span>
              If there is a defect or damage, we will be happy to exchange your
              product for a replacement or offer a different product of equal
              value.
            </span>
          ),
          pointer: [],
        },
        {
          header: 'Shipping Costs for Returns & Exchanges',
          subHeader: '',
          pointer: [
            <span>
              <strong>
                {' '}
                For returns and exchanges where you received a defective or
                incorrect product
              </strong>
              , Myaha will cover the return shipping costs.
            </span>,
            <span>
              <strong>For other returns or exchanges</strong> since we do not
              levy any separate shipping charges on your order, the cost of
              return shipping, along with a 5% restocking fee, will be borne by
              the customer
            </span>,
            <span>
              Please ensure that the product is returned in its{' '}
              <strong>original packaging</strong> and in the same condition as
              it was received.
            </span>,
          ],
        },
        {
          header: 'Important Notes',
          subHeader: '',
          pointer: [
            <span>
              <strong>Handmade Products:</strong> All our products are handmade
              by skilled artisans, and as such, slight variations in color,
              texture, or shape may occur. These are not considered defects and
              will not be eligible for returns or exchanges.
            </span>,
            <span>
              Refunds will be processed{' '}
              <strong>within 3-5 business days</strong>
              after we receive the returned item in our warehouse.
            </span>,
            <span>
              Refunds will be issued after the item has been inspected and
              returned to our warehouse. The refund will be processed to your
              original method of payment.
            </span>,
          ],
        },
      ]}
    />
  );
};

export default Privacy;
