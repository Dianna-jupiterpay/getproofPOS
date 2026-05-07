import { useState } from "react";
import './contact.css';
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwO7P1hqKxGFy-dRbnGtjtlRpnZ4p4qcr4Jb1ud0s26nnWXeMcn3_AG44Dy7SjBXQrbAA/exec";

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="9" fill="#1b2d5b" />
    <path d="M5 9l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    storeName: "",
    email: "",
    preferredContact: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.storeName ||
      !form.email ||
      !form.preferredContact
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setError(false);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact-form" className="contact-section">
      <div className="contact-inner">

        {/* ── LEFT PANEL ── */}
        <div className="contact-left">
          <h2 className="contact-left__headline">
            What's Included
          </h2>

          <p className="contact-left__sub">
            We conserve and use your historical data while helping you adapt to new
            changes in your POS system — on your timeline, without disruption.
          </p>

          <ul className="contact-checklist">
            <li className="contact-checklist__item">
              <CheckIcon />
              <span>Continue to receive live support for both LiquorPOS<sup className="reg">®</sup>   and Proof</span>
            </li>
            <li className="contact-checklist__item">
              <CheckIcon />
              <span>
                Deep dive data analysis, custom reporting and system checks
              </span>
            </li>
            <li className="contact-checklist__item">
              <CheckIcon />
              <span>
                Beta testing available to try our newest features
              </span>
            </li>
          </ul>

          <blockquote className="contact-quote">
            <p className="contact-quote__text">
              "Switching was easier than we expected. Our data was safe, our
              staff barely noticed, and we were up and running the same day."
            </p>
            <footer className="contact-quote__footer">
              <span className="contact-quote__role">Store Owner</span>
              <span className="contact-quote__store">Downtown Liquor &amp; Wine</span>
            </footer>
          </blockquote>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="contact-right">
          <div className="contact-card">
            <h3 className="contact-card__title">Talk to a POS Specialist</h3>

            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">✅</div>
                <h4>You're All Set!</h4>
                <p>
                  A specialist will reach out within one business day via your
                  preferred method.
                </p>
              </div>
            ) : (
              <div className="contact-form">
                {/* Name row */}
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">First Name</label>
                    <div className="cf-input-wrap">
                      <span className="cf-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        className="cf-input"
                        type="text"
                        placeholder="Jane"
                        value={form.firstName}
                        onChange={update("firstName")}
                      />
                    </div>
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Last Name</label>
                    <div className="cf-input-wrap">
                      <span className="cf-input-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      <input
                        className="cf-input"
                        type="text"
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={update("lastName")}
                      />
                    </div>
                  </div>
                </div>

                {/* Store name */}
                <div className="cf-field">
                  <label className="cf-label">Store Name</label>
                  <div className="cf-input-wrap">
                    <span className="cf-input-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                    </span>
                    <input
                      className="cf-input"
                      type="text"
                      placeholder="Main Street Liquors"
                      value={form.storeName}
                      onChange={update("storeName")}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="cf-field">
                  <label className="cf-label">Work Email</label>
                  <div className="cf-input-wrap">
                    <span className="cf-input-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    <input
                      className="cf-input"
                      type="email"
                      placeholder="you@yourstore.com"
                      value={form.email}
                      onChange={update("email")}
                    />
                  </div>
                </div>

                {/* Preferred contact + notes row */}
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">Preferred Contact</label>
                    <div className="cf-input-wrap cf-input-wrap--select">
                      <select
                        className="cf-input cf-select"
                        value={form.preferredContact}
                        onChange={update("preferredContact")}
                      >
                        <option value="" disabled>Select…</option>
                        <option value="Phone Call">Phone Call</option>
                        <option value="Text Message">Text Message</option>
                        <option value="Email">Email</option>
                        <option value="Any">Any</option>
                      </select>
                      <span className="cf-select-arrow">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="cf-field">
                  <label className="cf-label">
                    Notes <span className="cf-label-optional">(Optional)</span>
                  </label>
                  <textarea
                    className="cf-input cf-textarea"
                    placeholder="Tell us about your current setup…"
                    rows={3}
                    value={form.notes}
                    onChange={update("notes")}
                  />
                </div>

                {error && (
                  <p className="cf-error">Something went wrong. Please try again.</p>
                )}

                <button
                  className={`cf-submit${sending ? " cf-submit--sending" : ""}`}
                  onClick={handleSubmit}
                  disabled={sending}
                >
                  {sending ? "Sending…" : "GET MY FREE TRANSITION PLAN"}
                </button>

                <div className="cf-footer-badges">
                  <span className="cf-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    We respond within 1 business day
                  </span>
                  <span className="cf-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    No commitment required
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}