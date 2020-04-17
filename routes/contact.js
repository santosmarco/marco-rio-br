var nodemailer = require("nodemailer");
var moment = require("moment-timezone");

var MailTransporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: "eu@marco.rio.br",
    pass: process.env.MAIL_PASSWORD
  }
});

module.exports = app => {
  app.route("/contact").post((req, res) => {
    MailTransporter.verify(err => {
      if (err) {
        res.json({ status: "error" });
      } else {
        let query = req.query;
        query.message = query.message.split("\r\n").join("<br>");
        if (!query.lang) {
          query.lang = "en";
        }
        let now = moment().tz("America/Sao_Paulo");
        let email = {
          from: "Marco.rio.br <eu@marco.rio.br>",
          to: "eu@marco.rio.br"
        };
        switch (query.lang) {
          case "en":
            email.subject = `${
              query.subject === "Work-related" ? "[WORK] " : ""
            }New message from marco.rio.br`;
            email.html = `
                <p>Hello, Marco,</p>
                <p>You've got a new message on <i>marco.rio.br</i>.</p>
                <b>Date:</b> ${now.format("dddd, MMMM Do YYYY, h:mm:ss a")}<br>
                <b>From:</b> ${query.name}<br>
                <b>Work-related?</b> ${
                  query.subject === "Work-related" ? "Yes" : "No"
                }<br>
                <b>Message:</b><br>
                <p style="text-indent: 0; margin: 1em;">${query.message}</p><br>
                <a href="mailto:${query.email}">Reply</a>
            `;
            break;
        }

        MailTransporter.sendMail(email).then(() => {
          res.json({ status: "success" });
        });
      }
    });
  });
};
