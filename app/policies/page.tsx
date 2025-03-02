'use client';
import { useScrollToSearchId } from '#/hooks/useScrollToSearchId';
import FooterCarousel from '#/ui/components/FooterCarousel';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const Container = styled.div`
  padding: 45px 0px;
  @media (max-width: 800px) {
    padding: 15px 0px;
  }
  > img {
    width: 100%;
  }
`;

// Styled Components
const TabContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  flex: 1;
  text-align: center;
  cursor: pointer;
  font-weight: 600;
  background: ${(props) => (props.active ? '#888' : '#ffffff')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: none;
  outline: none;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.active ? '#666' : '#ddd')};
  }
  @media (max-width: 800px) {
    padding: 5px 150px;
  }
`;

const ContentContainer = styled.div`
  padding: 20px;
  background: #fff;
  line-height: 1.6;
  color: #333;

  @media (max-width: 800px) {
    padding: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  margin-top: 20px;
`;

const SectionDescription = styled.div`
  font-weight: lighter;
`;

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  useScrollToSearchId();

  return (
    <>
      <Container>
        <img src="/images/policy/policy1.png" />
        <TabContainer>
          {/* Tab Header */}
          <TabHeader>
            <TabButton
              id="privacy"
              active={activeTab === 'privacy'}
              onClick={() => setActiveTab('privacy')}
            >
              Privacy Policy
            </TabButton>
            <TabButton
              id="terms"
              active={activeTab === 'terms'}
              onClick={() => setActiveTab('terms')}
            >
              Terms and Conditions
            </TabButton>
          </TabHeader>

          {/* Tab Content */}
          <ContentContainer>
            {activeTab === 'privacy' ? (
              <div>
                <SectionTitle>Introduction</SectionTitle>
                <SectionDescription>
                  Thank you for choosing Myaha, your destination for
                  thoughtfully designed home decor. This Privacy Policy outlines
                  how we collect, use, disclose, and protect your personal
                  information when you visit our website. By accessing or using
                  our website, you agree to the practices described in this
                  policy.
                </SectionDescription>

                <SectionTitle>Information We Collect</SectionTitle>
                <SectionDescription>
                  We may collect personal information, such as your name, email
                  address, shipping address, and payment details when you make a
                  purchase or sign up for our newsletter. We also gather
                  non-personal information, such as browser type, IP address,
                  and device information for analytical purposes.
                </SectionDescription>

                <SectionTitle>How We Use Your Information</SectionTitle>
                <SectionDescription>
                  We use your personal information to process orders,
                  communicate with you, and improve our services. Non-personal
                  information is utilized for website analytics, enhancing user
                  experience, and understanding user preferences.
                </SectionDescription>

                <SectionTitle>Sharing of Information</SectionTitle>
                <SectionDescription>
                  We do not sell, trade, or transfer your personal information
                  to third parties. However, we may share your data with trusted
                  partners who assist us in operating our website, conducting
                  our business, or servicing you, as long as those parties agree
                  to keep this information confidential.
                </SectionDescription>

                <SectionTitle>Security</SectionTitle>
                <SectionDescription>
                  We prioritize the security of your information and employ
                  industry-standard measures to protect against unauthorized
                  access, disclosure, alteration, or destruction. However, no
                  method of transmission over the internet or electronic storage
                  is 100% secure, and we cannot guarantee absolute security.
                </SectionDescription>

                <SectionTitle>Cookies</SectionTitle>
                <SectionDescription>
                  We use cookies to enhance your browsing experience. You can
                  choose to disable cookies through your browser settings, but
                  this may affect your ability to access certain features of the
                  site.
                </SectionDescription>

                <SectionTitle>Third-Party Links</SectionTitle>
                <SectionDescription>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  sites. We encourage you to review the privacy policies of any
                  third-party sites you visit.
                </SectionDescription>

                <SectionTitle>Changes to Privacy Policy</SectionTitle>
                <SectionDescription>
                  We reserve the right to update our Privacy Policy
                  periodically. Changes will be posted on this page, and the
                  effective date will be modified accordingly. Your continued
                  use of the website after any changes signify your acceptance
                  of those changes.
                </SectionDescription>

                <SectionTitle>Contact Us</SectionTitle>
                <SectionDescription>
                  If you have any questions or concerns regarding our Privacy
                  Policy, please contact us at hello@myahaliving.com .
                </SectionDescription>
              </div>
            ) : (
              <div>
                <SectionTitle>Use of Website</SectionTitle>
                <SectionDescription>
                  You must be at least 18 years old or have parental consent to
                  use our website. You agree to use our website for lawful
                  purposes and not to engage in fraudulent, harmful, or
                  malicious activities. This includes refraining from hacking,
                  introducing malware, or using our website for illegal
                  transactions. We reserve the right to restrict, suspend, or
                  terminate access to our website at our sole discretion if we
                  believe you have violated these terms or engaged in any
                  unauthorized activities. You are responsible for maintaining
                  the confidentiality of your account credentials and ensuring
                  that your account is not misused by unauthorized parties.
                </SectionDescription>

                <SectionTitle>Orders and Payments</SectionTitle>
                <SectionDescription>
                  All orders placed through our website are subject to
                  availability and acceptance. We strive to ensure accurate
                  inventory updates, but in rare cases, items may be out of
                  stock. We reserve the right to refuse, limit, or cancel any
                  order at our discretion. In such cases, we will notify you via
                  the contact information provided. Prices for products are
                  listed in the respective currency and are subject to change
                  without prior notice. Discounts, promotions, or pricing errors
                  may be corrected without liability. Payments must be made
                  through the approved payment methods available on our website.
                  Transactions are securely processed using encrypted payment
                  gateways.
                </SectionDescription>

                <SectionTitle>Shipping and Delivery</SectionTitle>
                <SectionDescription>
                  We strive to process and ship orders promptly. Estimated
                  delivery times are provided at checkout but may vary based on
                  your location and unforeseen circumstances. Customers are
                  responsible for providing accurate shipping information. We
                  are not liable for delays or lost shipments due to incorrect
                  addresses provided at checkout. International orders may be
                  subject to customs duties and taxes imposed by the destination
                  country. These charges are the responsibility of the customer.
                  If an order is undeliverable due to customer unavailability,
                  incorrect address, or refusal to accept the package,
                  additional shipping fees may apply for reattempted delivery.
                </SectionDescription>

                <SectionTitle>Returns and Refunds</SectionTitle>
                <SectionDescription>
                  We accept returns within a specified period if the product is
                  unused, undamaged, and in its original packaging. Customers
                  must initiate a return request within the return window stated
                  on our website. Refunds are processed after the returned
                  product is inspected. Refunds may take up to 10 business days
                  to reflect in your account, depending on your payment
                  provider. Certain items may not be eligible for return, such
                  as custom-made, clearance, or perishable products. The return
                  eligibility of an item will be clearly stated on its product
                  page. Shipping fees for returns are generally borne by the
                  customer unless the return is due to a defect or an error on
                  our part. Intellectual Property All content on our website,
                  including text, images, graphics, logos, and product designs,
                  is the property of Myaha and is protected by copyright and
                  intellectual property laws. You may not reproduce, distribute,
                  modify, or commercially exploit any content from our website
                  without our prior written consent. Unauthorized use of our
                  intellectual property may result in legal action. Limitation
                  of Liability Myaha is not liable for any indirect, incidental,
                  or consequential damages arising from the use of our website,
                  services, or products, including but not limited to loss of
                  data, revenue, or business opportunities. While we strive to
                  ensure the accuracy of product descriptions and website
                  content, we do not warrant that the information is error-free,
                  complete, or up to date. We shall not be held responsible for
                  any failure or delay in performance due to circumstances
                  beyond our control, including but not limited to natural
                  disasters, labor strikes, or internet outages. Privacy and
                  Data Protection We value your privacy and handle personal data
                  in accordance with our Privacy Policy. Your information is
                  securely stored and used solely for fulfilling orders and
                  improving user experience. We do not sell, trade, or share
                  your personal information with third parties without your
                  consent, except as required for payment processing, order
                  fulfillment, or legal compliance. By using our website, you
                  consent to the collection and processing of your personal data
                  as outlined in our Privacy Policy. Third-Party Links and
                  Services Our website may contain links to third-party websites
                  or services. These external sites are not operated or
                  controlled by Myaha, and we are not responsible for their
                  content, policies, or practices. We encourage users to review
                  the terms and privacy policies of any third-party sites before
                  engaging with them. Changes to Terms and Conditions We reserve
                  the right to modify or update these terms at any time. Changes
                  will be posted on this page with the effective date stated at
                  the top. Continued use of our website after modifications
                  constitute acceptance of the revised terms. Users are
                  encouraged to review these terms periodically. Governing Law
                  and Dispute Resolution These Terms and Conditions are governed
                  by the laws of India, without regard to conflict of law
                  principles. Any disputes arising from these terms shall be
                  resolved through arbitration or mediation before pursuing
                  formal legal action. If a provision in these terms is found to
                  be invalid or unenforceable, the remaining provisions shall
                  remain in full effect. Contact Information If you have any
                  questions or concerns about these Terms and Conditions, please
                  contact us at hello@myahaliving.com.
                </SectionDescription>
              </div>
            )}
          </ContentContainer>
        </TabContainer>
      </Container>
      <FooterCarousel rounded={false} />
    </>
  );
};

export default TabComponent;
