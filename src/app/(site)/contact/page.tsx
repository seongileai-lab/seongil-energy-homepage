import { getSiteContent } from '@/lib/content';
import ContactForm from './contact-form';

export default async function ContactPage() {
  const { contact } = await getSiteContent();

  return (
    <div className="content-hub-page contact-hub-override">
      <div className="contact-wrapper">
        <div className="contact-intro-box">
          <div className="contact-sub-label">{contact.subLabel}</div>
          <h1 className="contact-main-heading">{contact.heading}</h1>
          <p className="contact-lead-desc">{contact.leadDesc}</p>
        </div>
        <div className="contact-form-box">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
