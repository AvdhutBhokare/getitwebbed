
'use server';

import { Resend } from 'resend';

/**
 * Sends a notification email when a new enquiry is submitted.
 * 
 * Note: For production, ensure RESEND_API_KEY is configured in your environment variables.
 * In the free tier, you can only send to your own verified email.
 */
export async function sendEnquiryEmail(data: any) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn('RESEND_API_KEY is missing. Email notification skipped.');
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { fullName, email, phone, company, services, budget, timeline, description } = data;

    await resend.emails.send({
      from: 'GetItWebbed Notifications <onboarding@resend.dev>',
      to: 'getitwebbed22@gmail.com',
      subject: `New Project Enquiry from ${fullName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #00FFB2; border-bottom: 2px solid #00FFB2; padding-bottom: 10px;">New Enquiry Details</h2>
          
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Services:</strong> ${services.join(', ')}</p>
            <p><strong>Budget:</strong> ₹${budget.toLocaleString()}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
          </div>

          <p><strong>Project Description:</strong></p>
          <blockquote style="background: #fff; border-left: 4px solid #00FFB2; padding: 10px 20px; font-style: italic; margin: 0;">
            ${description}
          </blockquote>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999;">This is an automated notification from GetItWebbed Agency Starter.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending enquiry email:', error);
  }
}
