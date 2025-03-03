'use client';

import PolicyComponent from '#/ui/components/Policy';

const Shipping = () => {
  return (
    <PolicyComponent
      title="Shipping & Delivery Policy"
      subHeader={
        <span>
          At <strong>Myaha</strong>, we prioritize safe and timely delivery for
          all our orders.
        </span>
      }
      steps={[
        {
          header: 'Order Processing & Dispatch',
          subHeader: '',
          pointer: [
            <span>
              Orders are processed within <strong>2-3 business days</strong>{' '}
              after placement.
            </span>,
            'Once shipped, a tracking link will be shared via email.',
          ],
        },
        {
          header: 'Delivery Timeline',
          subHeader: '',
          pointer: [
            <span>
              Orders typically arrive within <strong>5-7 business days</strong>{' '}
              after dispatch, depending on your location.
            </span>,
            <span>
              We use <strong>Delhivery</strong> as our third-party courier
              partner for reliable shipping.
            </span>,
          ],
        },
        {
          header: 'Change of Delivery Address',
          subHeader: '',
          pointer: [
            <span>
              If you need to update your delivery address, please contact us{' '}
              <strong>before your order has been dispatched</strong>. Once the
              order is shipped, we will not be able to modify the address.
              Kindly reach out to us at the earliest for any anticipated
              changes.
            </span>,
          ],
        },
        {
          header: 'Delivery Time Exceeded',
          subHeader: '',
          pointer: [
            'If your order has not arrived within the expected timeframe, please contact us so we can investigate the delay and provide a resolution.',
          ],
        },
        {
          header: 'Tracking Notifications',
          subHeader: '',
          pointer: [
            <span>
              Upon dispatch, customers will receive a{' '}
              <strong>tracking link</strong> via email, allowing them to monitor
              their shipment in real time based on updates from the shipping
              provider.
            </span>,
          ],
        },
        {
          header: 'Shipping Charges',
          subHeader: '',
          pointer: [
            <span>
              <strong>We offer free shipping on all orders</strong>—there are no
              additional shipping fees at checkout.
            </span>,
          ],
        },
        {
          header: 'Urgent Shipping Requests',
          subHeader: '',
          pointer: [
            <span>
              If you need urgent delivery, please contact us at
              <strong>hello@myahaliving.com</strong> or reach out on WhatsApp at{' '}
              <strong>+91 6350533372</strong>.
            </span>,
            <span>
              We might use <strong>express shipping services</strong> for urgent
              deliveries, and any additional cost will be communicated to you
              beforehand.
            </span>,
          ],
        },
        {
          header: 'Parcels Damaged in Transit or Wrong Product Received',
          subHeader: '',
          pointer: [
            <span>
              If you receive a{' '}
              <strong>damaged parcel or the wrong product</strong>, we request
              you to <strong>record a video while unpacking</strong> and share
              it with our customer service team. This will help us assess the
              issue and process a return or exchange swiftly.
            </span>,
          ],
        },
        {
          header: 'International Shipping',
          subHeader: (
            <span>
              Currently, we <strong>only ship within India</strong>. For
              international shipping inquiries, please reach out to us.
            </span>
          ),
          pointer: [],
        },
      ]}
    />
  );
};

export default Shipping;
