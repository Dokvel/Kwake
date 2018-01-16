import { EmailTemplate } from 'email-templates';
import nodemailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';
import wellknown from 'nodemailer-wellknown';
import async from 'async';
import path from 'path';
import { PRODUCTION_DOMAIN } from './index';

var transport = nodemailer.createTransport({ // TODO: Need make config related to NODE_ENV
  service: 'Gmail',
  auth: {
    user: 'enqounter@gmail.com',
    pass: 'Kwake123456',
  },
});

transport.use('compile', htmlToText({ ignoreImage: true }));

export function emailsSender(templatePath, data = [], senderEmail) {
  let template = new EmailTemplate(templatePath);
  let vendorDir = path.resolve(__dirname, '..', 'vendor');

  async.mapLimit(data, 10, (item, next) => {
    template.render({ ...item, host: PRODUCTION_DOMAIN }, (err, results) => {
      if (err) {
        return next(err);
      } else {

        let meta = {
          from: `KWAKE App <${senderEmail}>`,
          to: item.email,
          subject: item.subject,
          html: results.html,
          attachments: [{
            'filename': 'landingPageBackgroundImage.png',
            path: path.join(vendorDir, 'landingPageBackgroundImage.png'),
            'cid': 'landingPageBackgroundImage.png',
          },
            {
              'filename': 'logo.png',
              path: path.join(vendorDir, 'KWAKE.png'),
              'cid': 'logo',
            }],
        };

        transport.sendMail(meta, (err, responseStatus) => {
          if (err) {
            return next(err);
          }
          next(null, responseStatus);
        });
      }
    });
  }, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Successfully sent %d messages', results.length);
    }
  });
}
